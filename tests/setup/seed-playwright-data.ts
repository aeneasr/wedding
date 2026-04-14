import { writeFile } from "node:fs/promises";

import { closeDb } from "@/src/db";
import { buildInvitationUrl } from "@/src/lib/urls";
import {
  getInvitationBundle,
  saveInvitation,
} from "@/src/server/invitations";
import {
  e2eAdminPassword,
  e2eBaseUrl,
  e2eManifestPath,
} from "./e2e-env";

type ManifestInvitation = {
  invitationId: string;
  primaryEmail: string;
  url: string;
};

export type E2eManifest = {
  adminPassword: string;
  baseUrl: string;
  unknownRecoveryEmail: string;
  invitations: {
    individual: ManifestInvitation;
    family: ManifestInvitation;
    adminOpenedOnly: ManifestInvitation;
    adminRespondedFamily: ManifestInvitation;
  };
};

const invitationInputs = [
  {
    key: "individual",
    input: {
      primaryEmail: "alex@example.com",
      invitationMode: "individual" as const,
      locale: "de" as const,
      invitees: [
        {
          fullName: "Alex Both",
          email: "alex@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
    },
  },
  {
    key: "family",
    input: {
      primaryEmail: "taylor@example.com",
      invitationMode: "household" as const,
      locale: "de" as const,
      invitees: [
        {
          fullName: "Taylor Family",
          email: "taylor@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
        {
          fullName: "",
          email: null,
          kind: "adult" as const,
          isPrimary: false,
        },
        {
          fullName: "",
          email: null,
          kind: "child" as const,
          isPrimary: false,
        },
        {
          fullName: "",
          email: null,
          kind: "child" as const,
          isPrimary: false,
        },
      ],
    },
  },
  {
    key: "adminOpenedOnly",
    input: {
      primaryEmail: "opened@example.com",
      invitationMode: "individual" as const,
      locale: "de" as const,
      invitees: [
        {
          fullName: "Morgan Opened",
          email: "opened@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
      ],
    },
  },
  {
    key: "adminRespondedFamily",
    input: {
      primaryEmail: "admin-family@example.com",
      invitationMode: "household" as const,
      locale: "de" as const,
      invitees: [
        {
          fullName: "Riley Response",
          email: "admin-family@example.com",
          kind: "adult" as const,
          isPrimary: true,
        },
        {
          fullName: "",
          email: null,
          kind: "adult" as const,
          isPrimary: false,
        },
        {
          fullName: "",
          email: null,
          kind: "child" as const,
          isPrimary: false,
        },
        {
          fullName: "",
          email: null,
          kind: "child" as const,
          isPrimary: false,
        },
      ],
    },
  },
] as const;

async function getManifestInvitation(invitationId: string): Promise<ManifestInvitation> {
  const bundle = await getInvitationBundle(invitationId);

  if (!bundle) {
    throw new Error(`Seeded invitation ${invitationId} was not found.`);
  }

  return {
    invitationId: bundle.invitation.id,
    primaryEmail: bundle.invitation.primaryEmail,
    url: buildInvitationUrl(
      bundle.invitation.id,
      bundle.invitation.tokenVersion,
    ),
  };
}

export async function seedPlaywrightData() {
  const ids: Record<string, string> = {};

  for (const { key, input } of invitationInputs) {
    ids[key] = await saveInvitation({
      ...input,
      invitees: input.invitees.map((invitee) => ({ ...invitee })),
    });
  }

  const manifest: E2eManifest = {
    adminPassword: e2eAdminPassword,
    baseUrl: e2eBaseUrl,
    unknownRecoveryEmail: "missing@example.com",
    invitations: {
      individual: await getManifestInvitation(ids.individual),
      family: await getManifestInvitation(ids.family),
      adminOpenedOnly: await getManifestInvitation(ids.adminOpenedOnly),
      adminRespondedFamily: await getManifestInvitation(ids.adminRespondedFamily),
    },
  };

  await writeFile(e2eManifestPath, JSON.stringify(manifest, null, 2), "utf8");
  await closeDb();

  return manifest;
}
