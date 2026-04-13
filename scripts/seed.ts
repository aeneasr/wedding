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
      externalId: "demo-individual",
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
