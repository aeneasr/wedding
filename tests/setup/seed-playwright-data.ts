import { writeFile } from "node:fs/promises";

import { closeDb } from "@/src/db";
import { buildInvitationUrl } from "@/src/lib/urls";
import {
  getInvitationByExternalId,
  saveInvitation,
} from "@/src/server/invitations";
import {
  e2eAdminPassword,
  e2eBaseUrl,
  e2eManifestPath,
} from "./e2e-env";

type ManifestInvitation = {
  externalId: string;
  invitationId: string;
  primaryEmail: string;
  url: string;
};

export type E2eManifest = {
  adminPassword: string;
  baseUrl: string;
  unknownRecoveryEmail: string;
  invitations: {
    eventOneOnly: ManifestInvitation;
    eventTwoOnly: ManifestInvitation;
    bothEvents: ManifestInvitation;
    familyEventTwo: ManifestInvitation;
    adminOpenedOnly: ManifestInvitation;
    adminRespondedFamily: ManifestInvitation;
  };
};

const invitationInputs = [
  {
    key: "eventOneOnly",
    input: {
      externalId: "event-one-only",
      primaryEmail: "sky@example.com",
      invitationMode: "individual" as const,
      locale: "en" as const,
      namedGuests: [
        {
          fullName: "Sky Event",
          email: "sky@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
      event1Invited: true,
      event2Invited: false,
      event2PlusOneAllowed: false,
      event2ChildrenAllowed: false,
      event2MaxChildren: 0,
    },
  },
  {
    key: "eventTwoOnly",
    input: {
      externalId: "event-two-only",
      primaryEmail: "jordan@example.com",
      invitationMode: "individual" as const,
      locale: "en" as const,
      namedGuests: [
        {
          fullName: "Jordan Event",
          email: "jordan@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
      event1Invited: false,
      event2Invited: true,
      event2PlusOneAllowed: false,
      event2ChildrenAllowed: false,
      event2MaxChildren: 0,
    },
  },
  {
    key: "bothEvents",
    input: {
      externalId: "both-events",
      primaryEmail: "alex@example.com",
      invitationMode: "individual" as const,
      locale: "en" as const,
      namedGuests: [
        {
          fullName: "Alex Both",
          email: "alex@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
      event1Invited: true,
      event2Invited: true,
      event2PlusOneAllowed: false,
      event2ChildrenAllowed: false,
      event2MaxChildren: 0,
    },
  },
  {
    key: "familyEventTwo",
    input: {
      externalId: "family-event-two",
      primaryEmail: "taylor@example.com",
      invitationMode: "household" as const,
      locale: "en" as const,
      namedGuests: [
        {
          fullName: "Taylor Family",
          email: "taylor@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
      event1Invited: false,
      event2Invited: true,
      event2PlusOneAllowed: true,
      event2ChildrenAllowed: true,
      event2MaxChildren: 2,
    },
  },
  {
    key: "adminOpenedOnly",
    input: {
      externalId: "admin-opened-only",
      primaryEmail: "opened@example.com",
      invitationMode: "individual" as const,
      locale: "en" as const,
      namedGuests: [
        {
          fullName: "Morgan Opened",
          email: "opened@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
      event1Invited: false,
      event2Invited: true,
      event2PlusOneAllowed: false,
      event2ChildrenAllowed: false,
      event2MaxChildren: 0,
    },
  },
  {
    key: "adminRespondedFamily",
    input: {
      externalId: "admin-responded-family",
      primaryEmail: "admin-family@example.com",
      invitationMode: "household" as const,
      locale: "en" as const,
      namedGuests: [
        {
          fullName: "Riley Response",
          email: "admin-family@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
      event1Invited: false,
      event2Invited: true,
      event2PlusOneAllowed: true,
      event2ChildrenAllowed: true,
      event2MaxChildren: 2,
    },
  },
] as const;

async function getManifestInvitation(externalId: string): Promise<ManifestInvitation> {
  const bundle = await getInvitationByExternalId(externalId);

  if (!bundle) {
    throw new Error(`Seeded invitation ${externalId} was not found.`);
  }

  return {
    externalId,
    invitationId: bundle.invitation.id,
    primaryEmail: bundle.invitation.primaryEmail,
    url: buildInvitationUrl(
      bundle.invitation.id,
      bundle.invitation.tokenVersion,
    ),
  };
}

export async function seedPlaywrightData() {
  for (const { input } of invitationInputs) {
    await saveInvitation({
      ...input,
      namedGuests: input.namedGuests.map((guest) => ({ ...guest })),
    });
  }

  const manifest: E2eManifest = {
    adminPassword: e2eAdminPassword,
    baseUrl: e2eBaseUrl,
    unknownRecoveryEmail: "missing@example.com",
    invitations: {
      eventOneOnly: await getManifestInvitation("event-one-only"),
      eventTwoOnly: await getManifestInvitation("event-two-only"),
      bothEvents: await getManifestInvitation("both-events"),
      familyEventTwo: await getManifestInvitation("family-event-two"),
      adminOpenedOnly: await getManifestInvitation("admin-opened-only"),
      adminRespondedFamily: await getManifestInvitation("admin-responded-family"),
    },
  };

  await writeFile(e2eManifestPath, JSON.stringify(manifest, null, 2), "utf8");
  await closeDb();

  return manifest;
}
