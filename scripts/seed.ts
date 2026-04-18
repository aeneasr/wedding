import { eq } from "drizzle-orm";
import { hashAdminPassword } from "../src/lib/crypto";
import { getDb } from "../src/db";
import { invitations } from "../src/db/schema";
import { upsertInvitationsFromImport } from "../src/server/invitations";

async function main() {
  await upsertInvitationsFromImport([
    {
      primaryEmail: "alex@example.com",
      invitationMode: "household",
      locale: "de",
      invitees: [
        {
          fullName: "Alex Rivera",
          kind: "adult",
          isPrimary: true,
        },
        {
          fullName: "Sam Rivera",
          kind: "adult",
          isPrimary: false,
        },
        {
          fullName: "",
          kind: "child",
          isPrimary: false,
        },
        {
          fullName: "",
          kind: "child",
          isPrimary: false,
        },
      ],
    },
    {
      primaryEmail: "maria@example.com",
      invitationMode: "individual",
      locale: "de",
      invitees: [
        {
          fullName: "Maria Keller",
          kind: "adult",
          isPrimary: true,
        },
      ],
    },
  ]);

  await upsertInvitationsFromImport([
    {
      primaryEmail: "phone-fixture@example.com",
      invitationMode: "individual",
      locale: "de",
      invitees: [{ fullName: "Phone Fixture Guest", kind: "adult", isPrimary: true }],
    },
  ]);

  await getDb()
    .update(invitations)
    .set({ contactPhone: "+49 30 1234567" })
    .where(eq(invitations.primaryEmail, "phone-fixture@example.com"));

  console.log("Seed data inserted or updated.");
  console.log(
    "Example ADMIN_SHARED_PASSWORD_HASH value:",
    hashAdminPassword("change-me"),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
