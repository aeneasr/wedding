# Self-Service Guest Registration — Design

**Date:** 2026-04-18
**Status:** Draft for review

## Context

Today, guests are added to the wedding RSVP site exclusively by the admin — either via the invitation form or CSV import (`src/app-actions/admin.ts`, `src/lib/csv.ts`). After admin creation, the guest receives a magic-link invitation email and uses it to RSVP.

The README even calls this out explicitly: *"Admin-managed invitation list with no guest self-registration."*

This spec adds an additional entry point: a public `/register` page where guests add themselves (roster, dietary, optional phone) behind a shared secret code. The admin CSV/form flow remains available for bulk-adding known guests.

## Goals

- Let guests self-register on `/register` without admin intervention.
- In the same submit, record an "attending" RSVP with dietary requirements so the admin does not need to nudge them a second time.
- Send the existing invitation email so guests can edit/decline later via the magic link.
- Keep the existing admin-driven paths working unchanged.
- Avoid introducing per-attendee phone numbers again (removed deliberately on 2026-04-13).

## Non-goals

- Admin approval queue for registrations.
- Auto-login after submit (email link remains the only way to edit).
- English locale support on `/register` (site is German-only today).
- CAPTCHA / bot protection.
- Flagging self-registered invitations in the admin dashboard.
- Rate limiting on `/register` (recovery flow retains its own rate limits).

## Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| Q1 | Register = create invitation **and** submit an attending RSVP with dietary in one shot | User prefers a single-step submit; invitation link is for later edits/decline |
| Q2 | Duplicate email → **silent recovery** (send recovery email to that address) | Prevents enumeration; matches existing `sendRecoveryLinks` behavior |
| Q3 | Auto-send invitation email on successful registration; **admin CSV upload stays** | Small trusted audience; admin still needs bulk path |
| Q4 | Optional phone number lives on the **invitation**, not per-attendee | Respects 2026-04-13 cleanup that removed per-person phone |
| Q5 | `invitation_mode` is **auto-inferred** (1 person = individual, 2+ = household) | Guests don't need to see internal concepts |
| Q6 | **Shared secret code** `anna+aeneas`, **no rate limiting on the `/register` gate itself**. The silent-recovery branch still goes through `sendRecoveryLinks`, which inherits the existing per-email and per-IP recovery rate limits (`recoveryMaxPerEmailPerHour=3`, `recoveryMaxPerIpPerHour=10`). | Simpler than rate limits on the front door; older guests shouldn't hit them. Recovery limiter still protects the silent-recovery branch from being used as a mass-email oracle. |
| Q7 | On submit: **redirect to `/register/thanks`**, invitation email sent, no session | Email is the canonical entry for editing later |

## Data model

**Single schema change:** add a nullable `contact_phone` column to `invitations`.

```ts
// src/db/schema.ts
export const invitations = pgTable("invitations", {
  // ...existing columns...
  contactPhone: text("contact_phone"), // NEW, nullable, no default
  // ...
});
```

**Drizzle migration:** `npm run db:generate` produces a new migration `drizzle/000N_<name>.sql` with:
```sql
ALTER TABLE "invitations" ADD COLUMN "contact_phone" text;
```

No backfill. Existing rows get `NULL`.

**Tables unchanged:** `invitees`, `rsvps`, `attendee_responses`, `invitation_activity`, `recovery_requests`.

`attendee_responses.phone_number` remains nullable and unused (emptied out in the 2026-04-13 cleanup). Left in place intentionally for this spec — its removal is a separate concern and not in scope here.

`invitees.email` is **always written as `null`** for self-registered invitations, matching how the admin path writes `invitees.email = null` (see `replaceInvitationStructure` in `src/server/invitations.ts`). The only stored email is `invitations.primary_email`.

## Routes

### `GET /register`
Public registration page (no auth, no session required). Two visual steps in a single route:

1. **Gate step** — shows a single input for the secret code. Correct code reveals step 2 client-side; wrong code shows inline error.
2. **Form step** — registration form (see UX below).

### `POST` (via server action `registerGuestAction`)
Submitted from the form step. See Server flow below.

### `GET /register/thanks`
Static confirmation page, German copy:
> *"Danke! Wir haben dir einen Einladungslink per E-Mail geschickt. Öffne deinen Posteingang, um deine Einladung anzusehen oder Änderungen vorzunehmen."*

Identical message whether the submit was a new registration or a silent recovery — no enumeration leak.

### `GET /invite/[invitationId]` (existing)
Add one editable field: optional phone number bound to `invitations.contact_phone`. Save path reuses the existing RSVP server action (extended to accept `contactPhone`). All other behavior unchanged.

## UX — `/register` form

**Gate step:**
- One input field: "Einladungscode"
- Continue button
- Error text below input on mismatch

The gate is a UX affordance only — the server is authoritative. `registerGuestAction` re-verifies the code on every submit regardless of any client-side state, so revealing the form client-side without the code never leaks invitation creation.

**Form step (revealed after correct code):**

Primary person (you), required, always adult:
- Full name
- Email
- Phone (optional, free-form, max 40 chars)
- Dietary: radio — *keine Angabe* / *Fleisch* / *Vegetarisch*

Additional people (optional, up to `maxHouseholdMembers - 1`):
- "+ Weitere Person hinzufügen" button
- Each added row: full name, kind toggle (adult/child), dietary radio, remove button

Submit button at bottom.

**Validation display:** inline, per-field, using the same `fieldErrors` pattern as `saveGuestRsvpAction` (`Record<string, string[]>`).

**Components:**
- New `RegistrationForm` client component at `src/components/registration-form.tsx`. Roster row UX mirrors `src/components/admin-invitation-form.tsx` (same add/remove affordances, same kind toggle).
- Reuses dietary selector and kind toggle styles from existing RSVP/admin forms (see `src/components/guest-rsvp-fields.tsx`).

## Server flow

New server action in `src/app-actions/guest.ts`:

```ts
export async function registerGuestAction(
  state: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState>
```

```
1. Validate secret code:
   - Constant-time compare against env REGISTRATION_CODE (default "anna+aeneas").
   - Wrong → return { error: "Invalid code.", step: "gate" }.

2. Parse + validate with new Zod schema `registrationSchema`:
   - primaryEmail: required, valid email.
   - contactPhone: optional string, trimmed, max 40 chars.
   - roster: array of
       { fullName (trimmed, 1..120), kind ("adult"|"child"), dietary ("" | "meat" | "vegetarian") }
     min 1, max maxHouseholdMembers.
   - First row forced to adult.
   - Returns { fieldErrors } on fail, same shape as saveGuestRsvpAction.

3. Look up existing invitation by normalizeEmail(primaryEmail):
   - Match on invitations.primary_email only (NOT invitees.email).
     Self-registered rows always set invitees.email = null, so this keeps the
     duplicate check scoped to the invitation-level contact.
   a. EXISTS → call sendRecoveryLinks(email, clientIp). sendRecoveryLinks' broader
              match (primary_email OR invitees.email) is intentional there — it
              covers admin-imported rosters where a non-primary invitee's email
              may be the one the recoverer remembers. Redirect to /register/thanks.
              Do NOT touch the existing invitation.
   b. NEW    → proceed to step 4.

4. createInvitationFromRegistration (new helper in src/server/invitations.ts).
   Uses sequential, non-transactional getDb() writes — matches existing
   saveInvitation and saveGuestRsvp patterns; introducing transactions is
   out of scope here.
   a. Insert invitations { primaryEmail, contactPhone, invitationMode, locale: "de" }
      where invitationMode = roster.length === 1 ? "individual" : "household".
   b. Insert invitees rows — always with email: null (matches existing admin path);
      first row = isPrimary=true, kind="adult"; subsequent rows use the kind from the form.
   c. Insert rsvps row { status: "attending", submittedAt: now }.
   d. Insert attendee_responses rows { isAttending: true, dietaryRequirements: value || null,
      phoneNumber: null, sortOrder: index } — one per invitee.
   e. Insert invitation_activity { type: "rsvp_updated", metadata: { status, attendeeCount } }.

5. sendInvitationEmailForInvitation(id, "invite_sent") — existing helper. Sets sent_at,
   records invite_sent activity. Email skipped if provider not configured (existing behavior).

6. Redirect to /register/thanks. No guest session.
```

### Reused primitives (no duplication)
- `normalizeInviteeInputs` from `src/lib/household.ts`.
- `normalizeEmail` from `src/server/invitations.ts`. It is currently a private helper there — export it as part of this change so both `saveInvitation` and `createInvitationFromRegistration` can share it. No other callsites.
- `sendRecoveryLinks`, `sendInvitationEmailForInvitation` from `src/server/invitations.ts`.
- Activity recording patterns from `src/server/invitations.ts`.
- `fieldErrors` flattening pattern from `saveGuestRsvp`.

### New env var
- `REGISTRATION_CODE` (default `"anna+aeneas"`) in `src/lib/env.ts` and `.env.example`.

### Invitation page server action
`saveGuestRsvpAction` (existing) is extended to accept an optional `contactPhone` field. The existing action receives its payload as a JSON blob via `formData.get("payload")` (see `src/app-actions/guest.ts`); `contactPhone` is added as an additional top-level key on that JSON object — no separate form field, no new form contract. When the field is present on the payload, `saveGuestRsvp` issues an additional `getDb().update(invitations).set({ contactPhone: ... })` call alongside its existing sequential writes (no new transaction; `saveGuestRsvp` today is not transactional and changing that is out of scope).

**Clearing semantics:**
- Payload field **omitted** → column unchanged.
- Payload field present and **non-empty** → column set to the trimmed value.
- Payload field present and **empty string** → column set to `NULL` (explicit clear).

This matches the Open Questions default and removes the prior TBD.

## Coexistence with existing flows

- **Admin dashboard (`/admin`)**: no change. Shows both admin-created and self-registered invitations identically.
- **Admin CSV import (`/admin/import`)**: no change. Continues to write to the same tables.
- **Admin invitation form (`/admin/invitations/...`)**: no change except the admin form may optionally display/edit `contact_phone` if we choose. This is left **out of scope for this spec** unless requested (admin can see phone via invitation detail page if we add a read-only row).
- **Recovery flow (`/recover`)**: no change. Silent recovery during `/register` reuses it.
- **Invitation page (`/invite/[id]`)**: adds a phone input to the existing RSVP form.

## Edge cases

1. Empty roster after validation → Zod `min(1)` rejects.
2. Whitespace-only names → trim → rejected as empty (matches existing `guestResponseSchema`).
3. Email normalization → lowercase + trim before all lookups and inserts.
4. Silent recovery for an expired invitation → `sendRecoveryLinks` skips sending (existing behavior). Guest sees thanks page; no email arrives. Acceptable.
5. Missing `RESEND_API_KEY`/`EMAIL_FROM` → email silently skipped (existing behavior). Invitation still created; admin can resend.
6. Phone field → free-form text, no regex. Max 40 chars.
7. Wrong secret code → inline error, roster state preserved, no lockout.
8. Double-submit → second call hits the "existing email" branch and silently sends a recovery email. No duplicate invitation. After more than `recoveryMaxPerEmailPerHour` submits on the same email within an hour, the recovery limiter kicks in and the thanks page still renders with no further email sent. Acceptable.
9. Dietary for children → remains optional (matches existing schema).
10. First-row kind tampering (client-side forces adult, server also enforces) → server rejects if first row kind != "adult".

## Testing

### Vitest unit tests
- `src/lib/validation.test.ts` — add cases for `registrationSchema`:
  - valid minimum (1 person), valid household (up to cap), rejects missing email,
    rejects empty names, rejects >max household size, trims names, normalizes email,
    rejects non-adult first row.
- `src/server/invitations.test.ts` (new if not present, else colocated) for `createInvitationFromRegistration`:
  - creates invitation + invitees + rsvp + attendee_responses in one call;
  - sets `attending=true`;
  - stores `contact_phone`;
  - records `rsvp_updated` activity.

### Playwright E2E (`tests/e2e/register.spec.ts`)
1. **Happy path**: open `/register`, enter code, fill form (1 primary + 1 partner + 1 child with dietary), submit → land on `/register/thanks` → admin dashboard shows the new invitation → resolve the invitation id by admin-dashboard DOM scrape (the same technique existing e2e tests use) → open the invitation URL and verify the RSVP is pre-filled with dietary values, phone number is set, and `status=attending`.
2. **Silent recovery**: register with an email that already exists in the seed → still land on thanks page → no duplicate invitation row in DB; one new `recovery_sent` activity recorded for the existing invitation.
3. **Wrong secret code**: form step not revealed; inline error shown.
4. **Phone round-trip**: phone filled on `/register` → open invitation page → phone is visible and editable → save → value persists (verifiable via admin detail or direct DB read in test).

### Playwright Component Tests (`tests/ct/registration-form.spec.tsx`)
- Renders gate step by default.
- Correct code reveals form step.
- Add/remove roster rows up to `maxHouseholdMembers`.
- Validation errors render per-field on invalid submit.

### Seed updates (`scripts/seed.ts`)
- Add one fixture invitation with `contact_phone` populated to exercise phone display paths in dev. (No source flag distinguishes self-registered vs admin-created — see Q3.)

## Implementation notes

- **File organization**: `app/register/page.tsx` for GET, `app/register/thanks/page.tsx` for the confirmation, `src/components/registration-form.tsx` for the client component (flat under `src/components/`, matching existing convention — no `register/` subdir), `src/app-actions/guest.ts` for the server action, `src/server/invitations.ts` for the shared helper.
- **Do not** branch the admin CSV / admin invitation form to accept `contact_phone` as part of this spec. That's a follow-up decision.
- **Do not** add a `source` column to distinguish admin vs self registrations. If we want it, it comes later.

## Open questions

- Should the admin invitation detail page display `contact_phone` as a read-only row? **Default in this spec: no, out of scope.** Flag if you want it.
