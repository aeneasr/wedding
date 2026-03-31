# Wedding RSVP

Private wedding RSVP platform built with `Next.js` for Vercel deployment.

## Stack

- `Next.js` App Router
- `React 19`
- `Tailwind CSS 4`
- `Drizzle ORM` + generated SQL migrations
- Postgres via the current `Neon` serverless driver, intended for Vercel's native Neon integration
- `Resend` for invitation, recovery, and confirmation emails
- `Vitest` for unit tests

## Features

- Admin-managed invitation list with no guest self-registration
- Secure long-lived magic links for invitation access
- Two isolated event flows with per-invitation entitlements
- Separate RSVP behavior for Event One and Event Two
- Per-attendee dietary requirements
- Adult phone number and WhatsApp capture
- Guest recovery flow based on existing invitation email only
- Private event details area scoped to invited events
- Admin dashboard for send/open/responded status
- CSV import preview and commit flow
- CSV export for attendee and invitation status data
- ICS calendar generation with a one-month reminder alarm

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
DATABASE_URL="postgres://..."
APP_URL="http://localhost:3000"
APP_SIGNING_SECRET="replace-with-a-32-character-secret"
ADMIN_SHARED_PASSWORD_HASH="sha256:..."
RESEND_API_KEY="re_..."
EMAIL_FROM="Wedding RSVP <hello@example.com>"
```

Generate the admin password hash with the same logic used by the app. A quick option is:

```bash
node -e "const { createHash } = require('node:crypto'); console.log('sha256:' + createHash('sha256').update('change-me').digest('hex'))"
```

## Quick start (no external services needed)

The test harness spins up a local Postgres, applies migrations, seeds sample data, and starts Next.js — all in one command:

```bash
npm install
npx tsx tests/setup/start-e2e-stack.ts
```

Once the server is ready, open the manifest to get your test URLs and credentials:

```bash
cat .playwright/e2e-manifest.json
```

The manifest contains:

- **Invitation URLs** for several test personas (event-1-only, event-2-only, both events, household with plus-one and children)
- **Admin dashboard** at `http://localhost:3100/admin` with password `playwright-admin-password`

Emails are silently skipped since no email provider is configured. Press `Ctrl+C` to tear everything down.

Requires PostgreSQL CLI tools (`brew install postgresql@14` on macOS). No running Postgres server needed — the harness starts its own.

## Production setup

Install dependencies:

```bash
npm install
```

Generate the initial migration if you change the schema:

```bash
npm run db:generate
```

Apply migrations against the configured database:

```bash
npm run db:migrate
```

Optional sample data:

```bash
npm run seed
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm test
npm run db:generate
npm run db:migrate
npm run db:studio
npm run seed
```

## CSV Import Shape

The importer expects one row per named guest. Group rows into one invitation with the same `invitation_external_id`.

```csv
invitation_external_id,primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary,event_1_invited,event_2_invited,event_2_plus_one_allowed,event_2_children_allowed,event_2_max_children
family-one,alex@example.com,household,en,Alex Rivera,alex@example.com,adult,true,true,true,false,true,2
family-one,alex@example.com,household,en,Sam Rivera,sam@example.com,adult,false,true,true,false,true,2
```

## Notes

- Guest-facing content is bilingual: English and German.
- Event details are seeded in code in [`src/lib/events.ts`](/Users/aeneas/workspace/js/wedding/src/lib/events.ts).
- Magic-link signing, guest sessions, and admin session signing all depend on `APP_SIGNING_SECRET`.
- Email delivery is skipped automatically when `RESEND_API_KEY` or `EMAIL_FROM` are missing.
- The database driver uses Neon because Vercel's previous `@vercel/postgres` package is deprecated for new setups.

## Testing

```bash
npm run test:unit          # Vitest unit tests
npm run test:ct            # Playwright component tests
npm run test:e2e           # Playwright E2E tests (starts its own Postgres + Next.js)
npm run test:playwright    # Both component and E2E tests
npm run lint
npm run build
```

The E2E tests use the same self-contained stack as the quick start — no external services needed.
