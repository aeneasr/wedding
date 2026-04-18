# Self-Service Guest Registration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `/register` page (gated by a shared code) that lets guests self-register a household, submits an attending RSVP with dietary in one shot, and emails the existing magic-link invitation for later edits.

**Architecture:** One new schema column (`invitations.contact_phone`), one new server action (`registerGuestAction`), one shared server helper (`createInvitationFromRegistration`), one new React client component (`RegistrationForm`), two new app routes (`/register`, `/register/thanks`). Existing admin/CSV/invitation/RSVP paths are untouched except for a small optional phone field added to the invitation-page RSVP form.

**Tech Stack:** Next.js 15 App Router, React 19, Drizzle ORM + Postgres, Zod, Vitest (unit), Playwright (CT + E2E), Tailwind 4.

**Spec:** `docs/superpowers/specs/2026-04-18-self-service-registration-design.md`

---

## File Structure

**Create:**
- `app/register/page.tsx` — server component, renders `<RegistrationForm />`.
- `app/register/thanks/page.tsx` — static confirmation page.
- `src/components/registration-form.tsx` — client component with gate step + form step.
- `drizzle/000N_*.sql` — generated migration (adds `contact_phone` column).
- `tests/ct/registration-form.spec.tsx` — Playwright component tests.
- `tests/e2e/register.spec.ts` — Playwright E2E tests.

**Modify:**
- `src/db/schema.ts` — add `contactPhone` column to `invitations`.
- `src/lib/env.ts` — add `REGISTRATION_CODE` env + getter.
- `src/lib/validation.ts` — add `registrationSchema` + `validateRegistrationPayload`.
- `src/lib/validation.test.ts` — tests for `registrationSchema`.
- `src/lib/i18n.ts` — extend `Dictionary` type and the `de` entry with a `register` namespace; add `contactPhone` labels for the invitation RSVP form.
- `src/server/invitations.ts` — export `normalizeEmail`, add `createInvitationFromRegistration`, handle optional `contactPhone` in `saveGuestRsvp`.
- `src/server/invitations.test.ts` — colocated test file (new if not present) for the new helper.
- `src/app-actions/guest.ts` — add `registerGuestAction`; extend `saveGuestRsvpAction` / `GuestActionState` flow if needed to carry `contactPhone`.
- `src/components/guest-rsvp-fields.tsx` — add optional phone input; include `contactPhone` in the JSON payload.
- `scripts/seed.ts` — add fixture with `contactPhone` populated.
- `.env.example` — add `REGISTRATION_CODE`.
- `README.md` — document `/register`.

---

## Chunk 1: Schema, env, and validation foundation

### Task 1.1: Add `contact_phone` column to the invitations table

**Files:**
- Modify: `src/db/schema.ts` (invitations table definition)
- Create (auto-generated): `drizzle/000N_*.sql`

- [ ] **Step 1: Update the Drizzle schema**

Open `src/db/schema.ts` and add `contactPhone` inside the `invitations` pgTable column block (right after `primaryEmail`):

```ts
export const invitations = pgTable(
  "invitations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    primaryEmail: text("primary_email").notNull(),
    contactPhone: text("contact_phone"),
    invitationMode: invitationModeEnum("invitation_mode").notNull(),
    // ...rest unchanged
  },
  // ...
);
```

- [ ] **Step 2: Generate the migration**

Run: `npm run db:generate`

Expected: a new file `drizzle/000N_<adjective>_<noun>.sql` is created with a single `ALTER TABLE "invitations" ADD COLUMN "contact_phone" text;` statement.

If the command fails because of an existing uncommitted schema drift, abort and flag — do not force.

- [ ] **Step 3: Apply the migration to the local dev/test DB**

If you have a dev DB running, run: `npm run db:migrate`

If you do not, the e2e test harness applies migrations automatically on startup; you can defer.

- [ ] **Step 4: Build check**

Run: `npm run build`

Expected: PASS. If Drizzle type inference or `$inferSelect` callers complain, fix them here (should be unaffected since the column is nullable).

- [ ] **Step 5: Commit**

```bash
git add src/db/schema.ts drizzle/
git commit -m "feat(db): add contact_phone column to invitations"
```

---

### Task 1.2: Export `normalizeEmail` from `src/server/invitations.ts`

**Files:**
- Modify: `src/server/invitations.ts` (line ~69)

- [ ] **Step 1: Flip `normalizeEmail` from private to exported**

Change:

```ts
function normalizeEmail(email: string) {
```

to:

```ts
export function normalizeEmail(email: string) {
```

- [ ] **Step 2: Verify no other call sites exist outside this file**

Run: `npx tsc --noEmit`

Expected: PASS. All current callers are inside the same file, so no changes propagate.

- [ ] **Step 3: Commit**

```bash
git add src/server/invitations.ts
git commit -m "refactor: export normalizeEmail from invitations server module"
```

---

### Task 1.3: Add `REGISTRATION_CODE` env var

**Files:**
- Modify: `src/lib/env.ts`
- Modify: `.env.example`

- [ ] **Step 1: Add `REGISTRATION_CODE` to the Zod schema and the parsed object**

In `src/lib/env.ts`, update the schema and parser:

```ts
const envSchema = z.object({
  // ...existing entries...
  REGISTRATION_CODE: z.string().min(1).optional(),
});

const parsedEnv = envSchema.parse({
  // ...existing entries...
  REGISTRATION_CODE: process.env.REGISTRATION_CODE,
});
```

Then add a helper at the bottom of the file:

```ts
const DEFAULT_REGISTRATION_CODE = "anna+aeneas";

export function getRegistrationCode() {
  return env.REGISTRATION_CODE ?? DEFAULT_REGISTRATION_CODE;
}
```

- [ ] **Step 2: Add entry to `.env.example`**

Append:

```
REGISTRATION_CODE="anna+aeneas"
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/env.ts .env.example
git commit -m "feat(env): add REGISTRATION_CODE for self-service registration"
```

---

### Task 1.4: Add `registrationSchema` to validation + tests

**Files:**
- Modify: `src/lib/validation.ts`
- Modify: `src/lib/validation.test.ts`

- [ ] **Step 1: Write the failing test first**

Append to `src/lib/validation.test.ts`:

```ts
import { validateRegistrationPayload } from "@/src/lib/validation";

describe("validateRegistrationPayload", () => {
  it("accepts a solo registration with no phone", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Alex Rivera", kind: "adult", dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("accepts a household registration with phone and dietary choices", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: " +49 30 1234567 ",
      roster: [
        { fullName: "Alex Rivera", kind: "adult", dietaryRequirements: "vegetarian" },
        { fullName: "Sam Rivera", kind: "adult", dietaryRequirements: "meat" },
        { fullName: "Mia Rivera", kind: "child", dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contactPhone).toBe("+49 30 1234567");
    }
  });

  it("rejects an invalid primary email", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "not-an-email",
      contactPhone: "",
      roster: [{ fullName: "Alex", kind: "adult", dietaryRequirements: "" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty roster", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects a roster over maxHouseholdMembers", () => {
    const roster = Array.from({ length: 11 }, (_, i) => ({
      fullName: `Person ${i}`,
      kind: "adult" as const,
      dietaryRequirements: "" as const,
    }));
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster,
    });
    expect(result.success).toBe(false);
  });

  it("rejects when the first roster row is not an adult", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Mia Rivera", kind: "child", dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only names", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "",
      roster: [
        { fullName: "   ", kind: "adult", dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects phone numbers longer than 40 chars", () => {
    const result = validateRegistrationPayload({
      primaryEmail: "alex@example.com",
      contactPhone: "x".repeat(41),
      roster: [
        { fullName: "Alex", kind: "adult", dietaryRequirements: "" },
      ],
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests and confirm RED**

Run: `npm run test:unit -- --run src/lib/validation.test.ts`

Expected: FAIL. `validateRegistrationPayload is not a function`.

- [ ] **Step 3: Implement `registrationSchema` + `validateRegistrationPayload`**

Append to `src/lib/validation.ts`:

```ts
const rosterEntrySchema = z.object({
  fullName: z.string().trim().min(1, "Name is required.").max(120),
  kind: z.enum(["adult", "child"] satisfies [InviteeKind, ...InviteeKind[]]),
  dietaryRequirements: z.enum(["", "meat", "vegetarian"]).default(""),
});

export const registrationSchema = z
  .object({
    primaryEmail: z.email("A valid email is required."),
    contactPhone: z
      .string()
      .max(40, "Phone number is too long.")
      .transform((value) => value.trim())
      .default(""),
    roster: z
      .array(rosterEntrySchema)
      .min(1, "Add at least one person.")
      .max(maxHouseholdMembers, `A household can include up to ${maxHouseholdMembers} people.`),
  })
  .superRefine((value, ctx) => {
    const first = value.roster[0];
    if (first && first.kind !== "adult") {
      ctx.addIssue({
        code: "custom",
        path: ["roster", 0, "kind"],
        message: "The first person must be an adult.",
      });
    }
  });

export type RegistrationPayload = z.infer<typeof registrationSchema>;

export function validateRegistrationPayload(payload: unknown) {
  return registrationSchema.safeParse(payload);
}
```

Notes:
- `z.email()` matches the existing `adminInvitationSchema` usage (line 19 of the same file).
- We don't need a separate `isPrimary` field — the first entry is always primary by convention, matching the admin form.
- The `.default("")` on `contactPhone` lets callers omit it entirely.

- [ ] **Step 4: Run tests and confirm GREEN**

Run: `npm run test:unit -- --run src/lib/validation.test.ts`

Expected: PASS for all 8 cases.

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation.ts src/lib/validation.test.ts
git commit -m "feat(validation): add registrationSchema for self-service registration"
```

---

## Chunk 2: Server logic — helper + action

### Task 2.1: Add `createInvitationFromRegistration` helper

**Files:**
- Modify: `src/server/invitations.ts`
- Modify (create if not present): `src/server/invitations.test.ts`

- [ ] **Step 1: Check whether `src/server/invitations.test.ts` already exists**

Run: `ls src/server/invitations.test.ts`

If missing, create it with this skeleton:

```ts
import { describe, expect, it } from "vitest";
```

(Vitest picks it up by default.)

If the project has no existing server-side DB test infra and tests would require a live Postgres, flag to the human **before** writing this test — you may need to use the e2e fixture DB or mock `getDb()`.

**Note on infra:** If mocking `getDb()` is non-trivial, an acceptable alternative is to skip the unit test for `createInvitationFromRegistration` and rely on the e2e test in Chunk 5. In that case, skip Steps 2–4 of this task and add a `// TODO: cover via e2e until server DB test infra lands` note in the file header. Flag this decision to the reviewer.

- [ ] **Step 2: Write the failing test**

Add to `src/server/invitations.test.ts` (if server DB test infra is available):

```ts
import { describe, expect, it } from "vitest";

import { createInvitationFromRegistration } from "@/src/server/invitations";

describe("createInvitationFromRegistration", () => {
  it("creates invitation, invitees, rsvp, attendee_responses, and activity", async () => {
    const result = await createInvitationFromRegistration({
      primaryEmail: "NewGuest@example.com",
      contactPhone: "+49 30 1234567",
      roster: [
        { fullName: "New Guest", kind: "adult", dietaryRequirements: "vegetarian" },
        { fullName: "Partner Guest", kind: "adult", dietaryRequirements: "meat" },
        { fullName: "Kid Guest", kind: "child", dietaryRequirements: "" },
      ],
    });

    expect(result.invitationId).toMatch(/^[0-9a-f-]{36}$/);
    // Fetch and assert row shape
    // Expect primary_email normalized to lowercase
    // Expect contact_phone stored exactly as passed
    // Expect 3 invitees, first isPrimary=true, all email=null
    // Expect 1 rsvp row with status=attending
    // Expect 3 attendee_responses rows, isAttending=true, dietary matches
    // Expect 1 invitation_activity row of type rsvp_updated
  });

  it("infers invitationMode from roster size", async () => {
    const solo = await createInvitationFromRegistration({
      primaryEmail: "solo@example.com",
      contactPhone: "",
      roster: [
        { fullName: "Solo", kind: "adult", dietaryRequirements: "" },
      ],
    });

    // Expect the invitation row to have invitationMode = "individual"
    // (fetch and assert)
    void solo;
  });
});
```

Fill in the actual DB-fetch assertions using `getDb()` patterns from existing code (e.g., how `listInvitationBundles` queries). If `getDb()` isn't practical in unit tests, collapse into a single happy-path test using the e2e DB fixture.

- [ ] **Step 3: Run tests and confirm RED**

Run: `npm run test:unit -- --run src/server/invitations.test.ts`

Expected: FAIL. `createInvitationFromRegistration is not defined`.

- [ ] **Step 4: Implement the helper**

Append to `src/server/invitations.ts`:

```ts
export type RegistrationInput = {
  primaryEmail: string;
  contactPhone: string;
  roster: Array<{
    fullName: string;
    kind: "adult" | "child";
    dietaryRequirements: "" | "meat" | "vegetarian";
  }>;
};

export async function createInvitationFromRegistration(
  input: RegistrationInput,
): Promise<{ invitationId: string }> {
  const db = getDb();
  const now = new Date();
  const invitationMode: InvitationMode =
    input.roster.length === 1 ? "individual" : "household";

  const [invitation] = await db
    .insert(invitations)
    .values({
      primaryEmail: normalizeEmail(input.primaryEmail),
      contactPhone: input.contactPhone.trim() || null,
      invitationMode,
      locale: "de",
    })
    .returning({ id: invitations.id });

  const inviteeRows = input.roster.map((entry, index) => ({
    invitationId: invitation.id,
    fullName: entry.fullName.trim(),
    email: null,
    kind: index === 0 ? ("adult" as const) : entry.kind,
    isPrimary: index === 0,
    createdAt: new Date(now.getTime() + index),
  }));

  const insertedInvitees = await db
    .insert(invitees)
    .values(inviteeRows)
    .returning({ id: invitees.id, isPrimary: invitees.isPrimary });

  const [rsvpRow] = await db
    .insert(rsvps)
    .values({
      invitationId: invitation.id,
      status: "attending",
      submittedAt: now,
      updatedAt: now,
    })
    .returning({ id: rsvps.id });

  const attendeeRows = input.roster.map((entry, index) => ({
    rsvpId: rsvpRow.id,
    inviteeId: insertedInvitees[index].id,
    attendeeType: (entry.kind === "child" ? "child" : "named_guest") as
      | "named_guest"
      | "child",
    fullName: entry.fullName.trim(),
    isAttending: true,
    dietaryRequirements: entry.dietaryRequirements || null,
    phoneNumber: null,
    sortOrder: index,
  }));

  await db.insert(attendeeResponses).values(attendeeRows);

  await recordActivity(invitation.id, "rsvp_updated", {
    status: "attending",
    attendeeCount: attendeeRows.length,
  });

  return { invitationId: invitation.id };
}
```

- [ ] **Step 5: Run tests and confirm GREEN**

Run: `npm run test:unit -- --run src/server/invitations.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/server/invitations.ts src/server/invitations.test.ts
git commit -m "feat(server): add createInvitationFromRegistration helper"
```

---

### Task 2.2: Extend `saveGuestRsvp` to accept optional `contactPhone`

**Files:**
- Modify: `src/server/invitations.ts` (inside `saveGuestRsvp`)
- Modify: `src/lib/validation.ts` (extend `guestRsvpSchema`)

- [ ] **Step 1: Extend `guestRsvpSchema` to allow optional `contactPhone`**

In `src/lib/validation.ts`, update:

```ts
export const guestRsvpSchema = z.object({
  invitees: z.array(guestResponseSchema).min(1),
  contactPhone: z.string().max(40).optional(),
});
```

- [ ] **Step 2: Wire `contactPhone` into `saveGuestRsvp`**

In `src/server/invitations.ts`, inside `saveGuestRsvp`, after the `validation.data` is available and before the final `return { ok: true as const, status }`, add a block:

```ts
if (Object.prototype.hasOwnProperty.call(parsed, "contactPhone")) {
  const raw = parsed.contactPhone;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  await getDb()
    .update(invitations)
    .set({
      contactPhone: trimmed.length > 0 ? trimmed : null,
      updatedAt: now,
    })
    .where(eq(invitations.id, bundle.invitation.id));
}
```

**Rationale:** The payload-field-present check uses `hasOwnProperty` to distinguish "omitted" (no change) from "present-and-empty" (explicit clear). `parsed` comes from Zod's `safeParse`, which preserves the distinction.

**Watch-out:** If Zod's `.optional()` strips the key entirely when undefined, switch to using the pre-validation `payload` object (already parsed as JSON in `saveGuestRsvpAction`) for the presence check; `parsed.contactPhone` is only used for the value. If that refactor is needed, do it in a follow-up step.

- [ ] **Step 3: Add a unit test covering the round-trip**

Append to `src/server/invitations.test.ts` (only if server DB test infra is in place; otherwise rely on the e2e in Chunk 5):

```ts
describe("saveGuestRsvp contactPhone handling", () => {
  it("persists contactPhone when included in payload", async () => {
    // Seed an invitation, call saveGuestRsvp with contactPhone: "+49 30 1234567"
    // Expect the invitations row to have contact_phone = "+49 30 1234567"
  });

  it("clears contactPhone when empty string is passed", async () => {
    // Seed with an existing phone, call saveGuestRsvp with contactPhone: ""
    // Expect the invitations row to have contact_phone = null
  });

  it("leaves contactPhone untouched when field is omitted", async () => {
    // Seed with an existing phone, call saveGuestRsvp WITHOUT contactPhone key
    // Expect the invitations row to retain the original phone
  });
});
```

- [ ] **Step 4: Run tests**

Run: `npm run test:unit`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/server/invitations.ts src/lib/validation.ts src/server/invitations.test.ts
git commit -m "feat(rsvp): allow saveGuestRsvp to update contactPhone"
```

---

### Task 2.3: Add `registerGuestAction` server action

**Files:**
- Modify: `src/app-actions/guest.ts`

- [ ] **Step 1: Add the action**

At the top of `src/app-actions/guest.ts`, extend imports:

```ts
import { timingSafeEqual } from "node:crypto";

import {
  createInvitationFromRegistration,
  getInvitationBundle,
  normalizeEmail,
  sendInvitationEmailForInvitation,
  sendRecoveryLinks,
} from "@/src/server/invitations";
import { getRegistrationCode } from "@/src/lib/env";
import { validateRegistrationPayload } from "@/src/lib/validation";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db";
import { invitations } from "@/src/db/schema";
```

Add after `clearGuestSessionAction`:

```ts
export type RegisterActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function codesMatch(input: string, expected: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function registerGuestAction(
  _state: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const code = String(formData.get("code") ?? "");
  if (!codesMatch(code, getRegistrationCode())) {
    return { error: "Invalid code." };
  }

  const payloadText = String(formData.get("payload") ?? "{}");
  let payloadJson: unknown;
  try {
    payloadJson = JSON.parse(payloadText);
  } catch {
    return { error: "Invalid form payload." };
  }

  const validation = validateRegistrationPayload(payloadJson);

  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of validation.error.issues) {
      if (issue.path.length > 0) {
        const key = issue.path.join(".");
        (fieldErrors[key] ??= []).push(issue.message);
      }
    }
    return { error: "Please review the highlighted fields.", fieldErrors };
  }

  const parsed = validation.data;
  const normalizedEmail = normalizeEmail(parsed.primaryEmail);

  const existing = await getDb().query.invitations.findFirst({
    where: eq(invitations.primaryEmail, normalizedEmail),
  });

  const headersList = await headers();
  const clientIp = getClientIp(headersList);

  if (existing) {
    await sendRecoveryLinks(normalizedEmail, clientIp);
    redirect("/register/thanks");
  }

  const { invitationId } = await createInvitationFromRegistration({
    primaryEmail: normalizedEmail,
    contactPhone: parsed.contactPhone,
    roster: parsed.roster,
  });

  await sendInvitationEmailForInvitation(invitationId, "invite_sent");

  redirect("/register/thanks");
}
```

**Watch-outs:**
- `redirect()` from Next.js throws `NEXT_REDIRECT`, which is how App Router server actions signal redirects. Never wrap the action body in a `try/catch` that swallows this error.
- `headers()` is async in Next.js 15.
- We intentionally do NOT call `sendRecoveryLinks` + proceed to create — one or the other. Silent recovery is the full behavior for the "exists" branch.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app-actions/guest.ts
git commit -m "feat(actions): add registerGuestAction for self-service registration"
```

---

## Chunk 3: UI — registration form, pages, i18n

### Task 3.1: Extend the i18n dictionary with a `register` namespace

**Files:**
- Modify: `src/lib/i18n.ts`

- [ ] **Step 1: Extend the `Dictionary` type**

Inside the `Dictionary` type definition, add after `recover`:

```ts
register: {
  eyebrow: string;
  title: string;
  description: string;
  codeLabel: string;
  codeSubmit: string;
  codeError: string;
  primarySectionTitle: string;
  yourNameLabel: string;
  yourEmailLabel: string;
  phoneLabel: string;
  phoneHint: string;
  dietaryLabel: string;
  dietaryNone: string;
  dietaryMeat: string;
  dietaryVegetarian: string;
  additionalSectionTitle: string;
  addPerson: string;
  removePerson: string;
  adult: string;
  child: string;
  submit: string;
  formError: string;
  thanksTitle: string;
  thanksBody: string;
};
```

- [ ] **Step 2: Add the German copy**

In the `de` dictionary object, add (after `recover`):

```ts
register: {
  eyebrow: "Anmeldung",
  title: "Sag uns Bescheid",
  description:
    "Trag dich und deine Begleitung ein. Wir schicken dir anschließend einen Einladungslink an die angegebene E-Mail-Adresse.",
  codeLabel: "Einladungscode",
  codeSubmit: "Weiter",
  codeError: "Der Code stimmt leider nicht.",
  primarySectionTitle: "Deine Angaben",
  yourNameLabel: "Dein vollständiger Name",
  yourEmailLabel: "Deine E-Mail",
  phoneLabel: "Telefonnummer (optional)",
  phoneHint: "Nur für kurzfristige Rücksprachen am Hochzeitstag.",
  dietaryLabel: "Essenswunsch",
  dietaryNone: "Keine Angabe",
  dietaryMeat: "Fleisch",
  dietaryVegetarian: "Vegetarisch",
  additionalSectionTitle: "Weitere Personen",
  addPerson: "Weitere Person hinzufügen",
  removePerson: "Entfernen",
  adult: "Erwachsen",
  child: "Kind",
  submit: "Anmeldung absenden",
  formError: "Bitte überprüfe die markierten Felder.",
  thanksTitle: "Danke!",
  thanksBody:
    "Wir haben dir einen Einladungslink per E-Mail geschickt. Öffne deinen Posteingang, um deine Angaben anzusehen oder zu ändern.",
},
```

Also add a phone label to `guest`:

```ts
guest: {
  // ...existing entries...
  contactPhoneLabel: "Telefonnummer (optional)",
  contactPhoneHint: "Nur für kurzfristige Rücksprachen.",
},
```

And extend the `Dictionary["guest"]` type with both keys.

- [ ] **Step 3: Build check**

Run: `npm run build`

Expected: PASS. TypeScript will flag any missed dictionary keys in consumers.

- [ ] **Step 4: Commit**

```bash
git add src/lib/i18n.ts
git commit -m "feat(i18n): add register namespace and contactPhone labels"
```

---

### Task 3.2: Create the `RegistrationForm` client component

**Files:**
- Create: `src/components/registration-form.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/registration-form.tsx` with the following (study `src/components/admin-invitation-form.tsx` and `src/components/guest-rsvp-fields.tsx` for styling conventions):

```tsx
"use client";

import { useActionState, useMemo, useState } from "react";

import {
  registerGuestAction,
  type RegisterActionState,
} from "@/src/app-actions/guest";
import {
  buttonClassName,
  Field,
  inputClassName,
  PaperPanel,
  Eyebrow,
} from "@/src/components/ui";
import { StyledSelect, StyledSelectItem } from "@/src/components/styled-select";
import { getDictionary } from "@/src/lib/i18n";
import { defaultLocale, maxHouseholdMembers } from "@/src/lib/constants";

const initialState: RegisterActionState = {};

type RosterEntry = {
  fullName: string;
  kind: "adult" | "child";
  dietaryRequirements: "" | "meat" | "vegetarian";
};

function createPrimary(): RosterEntry {
  return { fullName: "", kind: "adult", dietaryRequirements: "" };
}

function createAdditional(): RosterEntry {
  return { fullName: "", kind: "adult", dietaryRequirements: "" };
}

export function RegistrationForm() {
  const dictionary = getDictionary(defaultLocale);
  const [state, formAction, pending] = useActionState(
    registerGuestAction,
    initialState,
  );
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [localCodeError, setLocalCodeError] = useState<string | null>(null);

  const [primaryEmail, setPrimaryEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [roster, setRoster] = useState<RosterEntry[]>([createPrimary()]);

  const payload = useMemo(
    () =>
      JSON.stringify({
        primaryEmail,
        contactPhone,
        roster,
      }),
    [primaryEmail, contactPhone, roster],
  );

  const fieldError = (key: string) => state.fieldErrors?.[key]?.[0];

  function updateRoster(index: number, patch: Partial<RosterEntry>) {
    setRoster((current) =>
      current.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
    );
  }

  function addPerson() {
    if (roster.length >= maxHouseholdMembers) return;
    setRoster((current) => [...current, createAdditional()]);
  }

  function removePerson(index: number) {
    if (index === 0) return;
    setRoster((current) => current.filter((_, i) => i !== index));
  }

  if (!codeRevealed) {
    return (
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setCodeRevealed(true);
          setLocalCodeError(null);
        }}
      >
        <PaperPanel className="space-y-4">
          <Eyebrow>{dictionary.register.eyebrow}</Eyebrow>
          <h1 className="text-2xl font-serif">{dictionary.register.title}</h1>
          <p className="text-base leading-relaxed">
            {dictionary.register.description}
          </p>
          <Field label={dictionary.register.codeLabel} htmlFor="registration-code">
            <input
              id="registration-code"
              type="text"
              autoComplete="off"
              className={inputClassName}
              value={codeValue}
              onChange={(event) => setCodeValue(event.target.value)}
            />
          </Field>
          {localCodeError ? (
            <p className="text-sm text-red-600">{localCodeError}</p>
          ) : null}
          <button type="submit" className={buttonClassName}>
            {dictionary.register.codeSubmit}
          </button>
        </PaperPanel>
      </form>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="code" value={codeValue} />
      <input type="hidden" name="payload" value={payload} />

      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.primarySectionTitle}</Eyebrow>
        <Field
          label={dictionary.register.yourNameLabel}
          htmlFor="reg-primary-name"
          error={fieldError("roster.0.fullName")}
        >
          <input
            id="reg-primary-name"
            type="text"
            className={inputClassName}
            value={roster[0].fullName}
            onChange={(event) =>
              updateRoster(0, { fullName: event.target.value })
            }
          />
        </Field>
        <Field
          label={dictionary.register.yourEmailLabel}
          htmlFor="reg-primary-email"
          error={fieldError("primaryEmail")}
        >
          <input
            id="reg-primary-email"
            type="email"
            autoComplete="email"
            className={inputClassName}
            value={primaryEmail}
            onChange={(event) => setPrimaryEmail(event.target.value)}
          />
        </Field>
        <Field
          label={dictionary.register.phoneLabel}
          htmlFor="reg-primary-phone"
          hint={dictionary.register.phoneHint}
          error={fieldError("contactPhone")}
        >
          <input
            id="reg-primary-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClassName}
            value={contactPhone}
            onChange={(event) => setContactPhone(event.target.value)}
          />
        </Field>
        <Field
          label={dictionary.register.dietaryLabel}
          htmlFor="reg-primary-diet"
          error={fieldError("roster.0.dietaryRequirements")}
        >
          <StyledSelect
            value={roster[0].dietaryRequirements}
            onValueChange={(value) =>
              updateRoster(0, {
                dietaryRequirements: value as RosterEntry["dietaryRequirements"],
              })
            }
            placeholder={dictionary.register.dietaryNone}
          >
            <StyledSelectItem value="">
              {dictionary.register.dietaryNone}
            </StyledSelectItem>
            <StyledSelectItem value="meat">
              {dictionary.register.dietaryMeat}
            </StyledSelectItem>
            <StyledSelectItem value="vegetarian">
              {dictionary.register.dietaryVegetarian}
            </StyledSelectItem>
          </StyledSelect>
        </Field>
      </PaperPanel>

      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.additionalSectionTitle}</Eyebrow>
        {roster.slice(1).map((entry, i) => {
          const index = i + 1;
          return (
            <div key={index} className="space-y-3 border-t pt-3">
              <Field
                label={dictionary.register.yourNameLabel}
                htmlFor={`reg-name-${index}`}
                error={fieldError(`roster.${index}.fullName`)}
              >
                <input
                  id={`reg-name-${index}`}
                  type="text"
                  className={inputClassName}
                  value={entry.fullName}
                  onChange={(event) =>
                    updateRoster(index, { fullName: event.target.value })
                  }
                />
              </Field>
              <Field
                label={dictionary.register.dietaryLabel}
                htmlFor={`reg-kind-${index}`}
              >
                <StyledSelect
                  value={entry.kind}
                  onValueChange={(value) =>
                    updateRoster(index, { kind: value as "adult" | "child" })
                  }
                >
                  <StyledSelectItem value="adult">
                    {dictionary.register.adult}
                  </StyledSelectItem>
                  <StyledSelectItem value="child">
                    {dictionary.register.child}
                  </StyledSelectItem>
                </StyledSelect>
              </Field>
              <Field
                label={dictionary.register.dietaryLabel}
                htmlFor={`reg-diet-${index}`}
              >
                <StyledSelect
                  value={entry.dietaryRequirements}
                  onValueChange={(value) =>
                    updateRoster(index, {
                      dietaryRequirements: value as RosterEntry["dietaryRequirements"],
                    })
                  }
                >
                  <StyledSelectItem value="">
                    {dictionary.register.dietaryNone}
                  </StyledSelectItem>
                  <StyledSelectItem value="meat">
                    {dictionary.register.dietaryMeat}
                  </StyledSelectItem>
                  <StyledSelectItem value="vegetarian">
                    {dictionary.register.dietaryVegetarian}
                  </StyledSelectItem>
                </StyledSelect>
              </Field>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => removePerson(index)}
              >
                {dictionary.register.removePerson}
              </button>
            </div>
          );
        })}
        {roster.length < maxHouseholdMembers ? (
          <button
            type="button"
            className={buttonClassName}
            onClick={addPerson}
          >
            {dictionary.register.addPerson}
          </button>
        ) : null}
      </PaperPanel>

      {state.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}

      <button type="submit" className={buttonClassName} disabled={pending}>
        {dictionary.register.submit}
      </button>
    </form>
  );
}
```

**Notes on the gate step:**
- Client-side reveal only — no check against the real code here. The server re-verifies via `registerGuestAction`. If the code is wrong, the form POST will return `{ error: "Invalid code." }` and we surface that as `state.error` in the revealed form state.
- `localCodeError` is unused for now because we never reject client-side. It's scaffolding we may repurpose if we add "click Continue without typing anything" handling.
- If `Field`'s `hint` or `error` props don't already exist, inspect `src/components/ui.tsx` and extend as needed (it already supports both, per existing usage elsewhere).

- [ ] **Step 2: Verify the component compiles**

Run: `npx tsc --noEmit`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/registration-form.tsx
git commit -m "feat(ui): add RegistrationForm client component"
```

---

### Task 3.3: Create `/register` and `/register/thanks` pages

**Files:**
- Create: `app/register/page.tsx`
- Create: `app/register/thanks/page.tsx`

- [ ] **Step 1: Create `app/register/page.tsx`**

```tsx
import { RegistrationForm } from "@/src/components/registration-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <RegistrationForm />
    </main>
  );
}
```

- [ ] **Step 2: Create `app/register/thanks/page.tsx`**

```tsx
import { getDictionary } from "@/src/lib/i18n";
import { defaultLocale } from "@/src/lib/constants";
import { PaperPanel, Eyebrow } from "@/src/components/ui";

export default function RegisterThanksPage() {
  const dictionary = getDictionary(defaultLocale);
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.eyebrow}</Eyebrow>
        <h1 className="text-2xl font-serif">{dictionary.register.thanksTitle}</h1>
        <p className="text-base leading-relaxed">
          {dictionary.register.thanksBody}
        </p>
      </PaperPanel>
    </main>
  );
}
```

- [ ] **Step 3: Smoke test locally (optional for CI)**

Run: `npm run dev` and manually visit `http://localhost:3000/register` and `/register/thanks` to confirm both render.

- [ ] **Step 4: Build check**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/register
git commit -m "feat(app): add /register and /register/thanks routes"
```

---

### Task 3.4: Playwright component tests for `RegistrationForm`

**Files:**
- Create: `tests/ct/registration-form.spec.tsx`

- [ ] **Step 1: Write the tests**

Create `tests/ct/registration-form.spec.tsx`:

```tsx
import { expect, test } from "@playwright/experimental-ct-react";

import { RegistrationForm } from "@/src/components/registration-form";

test.describe("RegistrationForm", () => {
  test("shows the gate step by default", async ({ mount }) => {
    const component = await mount(<RegistrationForm />);
    await expect(component.getByLabel("Einladungscode")).toBeVisible();
    await expect(component.getByText("Dein vollständiger Name")).toBeHidden();
  });

  test("reveals the form after continue", async ({ mount }) => {
    const component = await mount(<RegistrationForm />);
    await component.getByLabel("Einladungscode").fill("irrelevant-client-side");
    await component.getByRole("button", { name: "Weiter" }).click();
    await expect(component.getByLabel("Dein vollständiger Name")).toBeVisible();
  });

  test("can add and remove additional people up to the cap", async ({ mount }) => {
    const component = await mount(<RegistrationForm />);
    await component.getByLabel("Einladungscode").fill("x");
    await component.getByRole("button", { name: "Weiter" }).click();

    const addBtn = component.getByRole("button", {
      name: "Weitere Person hinzufügen",
    });
    await addBtn.click();
    await expect(
      component.getByRole("button", { name: "Entfernen" }).first(),
    ).toBeVisible();

    // Repeatedly add until cap (maxHouseholdMembers = 10; primary + 9 additional)
    for (let i = 0; i < 8; i += 1) {
      if (await addBtn.isVisible()) await addBtn.click();
    }
    await expect(addBtn).toBeHidden();
  });
});
```

- [ ] **Step 2: Run CT tests**

Run: `npm run test:ct -- tests/ct/registration-form.spec.tsx`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/ct/registration-form.spec.tsx
git commit -m "test(ct): cover RegistrationForm gate/reveal and roster interactions"
```

---

## Chunk 4: Invitation page phone field

### Task 4.1: Add phone input to `guest-rsvp-fields.tsx` and plumb into payload

**Files:**
- Modify: `src/components/guest-rsvp-fields.tsx`
- Modify: `src/server/invitations.ts` (pass existing phone to the form)
- Modify: `app/guest/page.tsx` (or wherever the form is rendered; check with a grep)

- [ ] **Step 1: Locate where `GuestRsvpFields` is rendered and its props originate**

Inspect `src/components/guest-rsvp-form.tsx` and whichever page renders it (likely `app/guest/page.tsx`). Identify where `invitees` / `invitationMode` props are constructed from the bundle.

- [ ] **Step 2: Extend `RsvpFormProps` to carry `contactPhone`**

In `src/components/guest-rsvp-fields.tsx`:

```ts
type RsvpFormProps = {
  locale?: Locale;
  invitationMode: InvitationMode;
  invitees: InviteeState[];
  contactPhone: string | null;
};
```

Propagate through `GuestRsvpFieldsProps` and `GuestRsvpFormProps`.

- [ ] **Step 3: Add the phone input to the fields component**

Introduce a `useState` for `contactPhone`, initialized from the prop (treat `null` as empty string). Add a `<Field>` with an `<input type="tel">` somewhere near the top of the form (above the attendance checklist). Wire it into the JSON payload:

```ts
const payload = JSON.stringify({ invitees, contactPhone });
```

Use `dictionary.guest.contactPhoneLabel` and `dictionary.guest.contactPhoneHint` labels added in Task 3.1.

- [ ] **Step 4: Pass the prop through from the page**

In `app/guest/page.tsx` (or wherever `<GuestRsvpForm>` is rendered), pass `contactPhone={bundle.invitation.contactPhone}`.

- [ ] **Step 5: Verify `saveGuestRsvp` picks it up**

Cross-check Task 2.2's wiring — the payload key `contactPhone` is what the server expects. Empty string submitted → saved action clears it to `null`; omitted entirely (e.g., older form state) → column unchanged.

- [ ] **Step 6: Build + unit tests**

Run: `npm run build` and `npm run test:unit`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/guest-rsvp-fields.tsx src/components/guest-rsvp-form.tsx app/guest/page.tsx
git commit -m "feat(ui): expose contactPhone in invitation RSVP form"
```

---

## Chunk 5: E2E tests, seed updates, docs

### Task 5.1: Extend the seed script with a fixture invitation that has a phone

**Files:**
- Modify: `scripts/seed.ts`

- [ ] **Step 1: Add a new fixture**

After the existing `upsertInvitationsFromImport([ ... ])` call, add a second `upsertInvitationsFromImport` (or append to the array) with `primaryEmail: "phone-fixture@example.com"` and one adult. Then update the invitation to set `contact_phone`:

```ts
await getDb()
  .update(invitations)
  .set({ contactPhone: "+49 30 1234567" })
  .where(eq(invitations.primaryEmail, "phone-fixture@example.com"));
```

(Imports needed: `getDb`, `invitations` from `@/src/db/schema`, `eq` from drizzle-orm.)

- [ ] **Step 2: Re-seed**

Run: `npm run seed` (only if a dev DB is present). Verify the invitation appears in `/admin`.

- [ ] **Step 3: Commit**

```bash
git add scripts/seed.ts
git commit -m "chore(seed): add fixture invitation with contact_phone"
```

---

### Task 5.2: E2E tests for `/register`

**Files:**
- Create: `tests/e2e/register.spec.ts`
- Potentially modify: `tests/setup/seed-playwright-data.ts` (add a fixture with a known `primaryEmail` to exercise the silent-recovery branch if none suits)

- [ ] **Step 1: Write the E2E tests**

Create `tests/e2e/register.spec.ts`:

```ts
import { expect, test } from "./fixtures";

const REGISTRATION_CODE = "anna+aeneas";

test.describe("/register", () => {
  test("happy path creates an invitation and redirects to thanks", async ({
    page,
  }) => {
    await page.goto("/register");

    await page.getByLabel("Einladungscode").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();

    await page
      .getByLabel("Dein vollständiger Name")
      .fill("E2E Registrant");
    await page.getByLabel("Deine E-Mail").fill("e2e-register@example.com");
    await page.getByLabel("Telefonnummer (optional)").fill("+49 170 1111111");

    // Add a partner
    await page.getByRole("button", { name: "Weitere Person hinzufügen" }).click();
    const nameInputs = page.getByLabel("Dein vollständiger Name");
    await nameInputs.nth(1).fill("E2E Partner");

    await page.getByRole("button", { name: "Anmeldung absenden" }).click();
    await expect(page).toHaveURL(/\/register\/thanks$/);

    await expect(page.getByRole("heading", { name: "Danke!" })).toBeVisible();
  });

  test("shows the form-level error from the server when the code is wrong", async ({
    page,
  }) => {
    await page.goto("/register");
    await page.getByLabel("Einladungscode").fill("obviously-wrong");
    await page.getByRole("button", { name: "Weiter" }).click();

    // Client reveals the form regardless; server rejects on submit
    await page
      .getByLabel("Dein vollständiger Name")
      .fill("Should Not Save");
    await page.getByLabel("Deine E-Mail").fill("bad-code@example.com");
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();

    // Expect inline error, stay on /register
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByText("Invalid code.")).toBeVisible();
  });

  test("duplicate email triggers silent recovery and lands on thanks", async ({
    page,
    manifest,
  }) => {
    // Use a seeded email. Pick any persona from the e2e manifest whose
    // primaryEmail is known — e.g., manifest.personas.both.primaryEmail.
    const existingEmail = manifest.personas.both.primaryEmail;

    await page.goto("/register");
    await page.getByLabel("Einladungscode").fill(REGISTRATION_CODE);
    await page.getByRole("button", { name: "Weiter" }).click();

    await page.getByLabel("Dein vollständiger Name").fill("Duplicate Person");
    await page.getByLabel("Deine E-Mail").fill(existingEmail);
    await page.getByRole("button", { name: "Anmeldung absenden" }).click();

    await expect(page).toHaveURL(/\/register\/thanks$/);
    // Cannot easily assert "no duplicate invitation" without admin; a DB
    // assertion via a direct query would go here if the stack exposes one.
  });
});
```

**Watch-outs:**
- The "happy path" test asserts the thanks URL but does not assert the admin dashboard shows the row. If the E2E stack has an admin fixture with a known password (see `playwright-admin-password` in README), you may extend the test to log in as admin and verify the new invitation appears. This is nice-to-have, not required for the happy path to pass.
- Phone round-trip: a separate case, easier once admin verification is added, because the admin detail page is the simplest place to read back the phone. If the admin detail page does not yet display `contact_phone` (it doesn't — this is out of scope per the spec), use a DB query helper (if the e2e fixture exposes one) or skip the assertion and rely on unit tests for Task 2.2.
- Check `manifest.personas` shape in `tests/setup/seed-playwright-data.ts` — if `personas.both.primaryEmail` doesn't exist, pick whichever seed fixture has a stable `primaryEmail`.

- [ ] **Step 2: Run the E2E tests**

Run: `npm run test:e2e -- tests/e2e/register.spec.ts`

Expected: PASS (assuming the local stack can start — see README for prerequisites).

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/register.spec.ts tests/setup/seed-playwright-data.ts
git commit -m "test(e2e): cover /register happy path, bad code, and silent recovery"
```

---

### Task 5.3: Full verification & README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document `/register` in the README**

Under the `## Features` section, add a bullet:

```md
- Self-service guest registration at `/register` (gated by the `REGISTRATION_CODE` env var)
```

Under the `## Environment` section, add:

```md
REGISTRATION_CODE="anna+aeneas"
```

In the first `## Features` bullet, update:
- Old: `Admin-managed invitation list with no guest self-registration`
- New: `Admin-managed invitation list plus a self-service /register page for guests`

- [ ] **Step 2: Run the full Playwright suite**

Run: `npm run test:playwright`

Expected: PASS.

- [ ] **Step 3: Run unit tests and build**

Run: `npm run test:unit && npm run build`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: document /register feature in README"
```

- [ ] **Step 5: Final validation checklist**

- [ ] Migration file present in `drizzle/`, one `ADD COLUMN` statement.
- [ ] `REGISTRATION_CODE` in `.env.example`.
- [ ] `/register` renders gate step; correct code reveals form.
- [ ] Submitting with new email redirects to `/register/thanks` and creates an invitation + attending RSVP.
- [ ] Submitting with an existing email redirects to `/register/thanks` and sends a recovery email (no duplicate row).
- [ ] Invitation email sends via Resend (or skips silently if env not configured).
- [ ] Phone field on `/register` round-trips to the invitation-page RSVP form.
- [ ] All `npm run test:*` scripts pass.

---

## Risk log

1. **Drizzle migration generation on a dirty schema** — `npm run db:generate` compares the schema file to the last snapshot. If any other schema edits are uncommitted, the generated migration will bundle them. Run `git status drizzle/` before generating and confirm the output matches expectations.

2. **Server-side DB unit tests may require fixture infra** — If `src/server/invitations.test.ts` can't run against a real DB, demote `createInvitationFromRegistration` and the `saveGuestRsvp` phone-handling unit tests to e2e coverage (flag to reviewer).

3. **Zod `.optional()` stripping** — The `saveGuestRsvp` change distinguishes "omitted" from "empty". Verify with a small manual test by printing `parsed` after `safeParse` for both inputs before trusting it.

4. **`Field` component props** — The plan assumes `Field` supports `hint`, `error`, and `htmlFor`. If it doesn't, extend it in `src/components/ui.tsx` before writing `RegistrationForm`. This is a ~10-line addition.

5. **CT test setup already configured** — If `tests/ct` doesn't yet have a config for mounting components that depend on server actions, add a stub or mock via `@playwright/experimental-ct-react`. If CT setup is too involved, demote the CT cases to an E2E-only check and note the gap.

6. **Rate limiter interaction on duplicate submits** — E2E test for silent recovery must run on a fresh fixture DB; rapid re-runs on the same email will hit `recoveryMaxPerEmailPerHour=3`. The Playwright stack resets the DB per run, so this should be fine, but flag to the reviewer if you see intermittent recovery failures.
