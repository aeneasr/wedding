import { hashAdminPassword } from "../src/lib/crypto";
import { upsertInvitationsFromImport } from "../src/server/invitations";

async function main() {
  await upsertInvitationsFromImport([
    {
      externalId: "demo-household",
      primaryEmail: "alex@example.com",
      invitationMode: "household",
      locale: "en",
      namedGuests: [
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
      ],
      event1Invited: true,
      event2Invited: true,
      event2PlusOneAllowed: false,
      event2ChildrenAllowed: true,
      event2MaxChildren: 2,
    },
    {
      externalId: "demo-individual",
      primaryEmail: "maria@example.com",
      invitationMode: "individual",
      locale: "de",
      namedGuests: [
        {
          fullName: "Maria Keller",
          email: "maria@example.com",
          kind: "adult",
          isPrimary: true,
        },
      ],
      event1Invited: false,
      event2Invited: true,
      event2PlusOneAllowed: true,
      event2ChildrenAllowed: false,
      event2MaxChildren: 0,
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
