import { hashAdminPassword } from "../src/lib/crypto";
import { upsertInvitationsFromImport } from "../src/server/invitations";

async function main() {
  await upsertInvitationsFromImport([
    {
      externalId: "demo-household",
      primaryEmail: "alex@example.com",
      invitationMode: "household",
      locale: "de",
      invitees: [
        {
          fullName: "Alex Rivera",
          email: "alex@example.com",
          kind: "adult",
          isPrimary: true,
        },
        {
          fullName: "Sam Rivera",
          email: "sam@example.com",
          kind: "adult",
          isPrimary: false,
        },
        {
          fullName: "",
          email: null,
          kind: "child",
          isPrimary: false,
        },
        {
          fullName: "",
          email: null,
          kind: "child",
          isPrimary: false,
        },
      ],
    },
    {
      externalId: "demo-individual",
      primaryEmail: "maria@example.com",
      invitationMode: "individual",
      locale: "de",
      invitees: [
        {
          fullName: "Maria Keller",
          email: "maria@example.com",
          kind: "adult",
          isPrimary: true,
        },
      ],
    },
  ]);

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
