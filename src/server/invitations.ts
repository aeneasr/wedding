import {
  and,
  asc,
  desc,
  eq,
  gte,
  inArray,
  or,
  sql,
} from "drizzle-orm";

import { getDb } from "@/src/db";
import {
  attendeeResponses,
  invitationActivity,
  invitations,
  invitees,
  recoveryRequests,
  rsvps,
} from "@/src/db/schema";
import {
  normalizeInviteeInputs,
  type HouseholdInviteeInput,
} from "@/src/lib/household";
import {
  type ActivityType,
  type InvitationMode,
  type Locale,
  recoveryMaxPerEmailPerHour,
  recoveryMaxPerIpPerHour,
} from "@/src/lib/constants";
import { sendConfirmationEmail, sendInvitationEmail, sendRecoveryEmail } from "@/src/lib/email";
import { getInvitationExpiry } from "@/src/lib/events";
import { verifyInvitationSignature, buildInvitationUrl } from "@/src/lib/urls";
import {
  type GuestRsvpPayload,
  validateGuestRsvpPayload,
} from "@/src/lib/validation";
import { buildAttendeeRows } from "@/src/lib/csv-export";

type InvitationRecord = typeof invitations.$inferSelect;
type InviteeRecord = typeof invitees.$inferSelect;
type RsvpRecord = typeof rsvps.$inferSelect;
type AttendeeResponseRecord = typeof attendeeResponses.$inferSelect;

// Accepts either the top-level db instance or a transaction object passed
// from db.transaction(). The transaction callback parameter type is inferred
// from the db type so we don't have to repeat the schema generics manually.
type TransactionCallback = Parameters<ReturnType<typeof getDb>["transaction"]>[0];
type DbOrTx = TransactionCallback extends (tx: infer Tx) => Promise<unknown>
  ? ReturnType<typeof getDb> | Tx
  : ReturnType<typeof getDb>;

export type InvitationBundle = {
  invitation: InvitationRecord;
  invitees: InviteeRecord[];
  rsvps: Array<
    RsvpRecord & {
      attendees: AttendeeResponseRecord[];
    }
  >;
};

export type SaveInvitationInput = {
  id?: string;
  primaryEmail: string;
  invitationMode: InvitationMode;
  locale: Locale;
  invitees: HouseholdInviteeInput[];
};

export type DashboardFilters = {
  search?: string;
  status?: "all" | "pending" | "responded" | "opened";
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeInvitationInvitees(input: SaveInvitationInput) {
  return normalizeInviteeInputs(input.invitees).map((invitee, index) => ({
    ...invitee,
    isPrimary: index === 0,
    kind: index === 0 ? ("adult" as const) : invitee.kind,
  }));
}

function getPrimaryGuest(bundle: InvitationBundle) {
  return (
    bundle.invitees.find((invitee) => invitee.isPrimary) ??
    bundle.invitees.at(0) ??
    null
  );
}

function isInvitationExpired(bundle: InvitationBundle) {
  return Date.now() > getInvitationExpiry();
}

function hasFullyResponded(bundle: InvitationBundle) {
  return bundle.rsvps.length > 0 && bundle.rsvps[0]?.status !== "pending";
}

function buildInvitationSummary(bundle: InvitationBundle) {
  const primaryGuest = getPrimaryGuest(bundle);

  return {
    id: bundle.invitation.id,
    primaryEmail: bundle.invitation.primaryEmail,
    primaryGuestName: primaryGuest?.fullName ?? bundle.invitation.primaryEmail,
    invitationMode: bundle.invitation.invitationMode,
    locale: bundle.invitation.locale,
    guestCount: bundle.invitees.length,
    accessCount: bundle.invitation.accessCount,
    firstOpenedAt: bundle.invitation.firstOpenedAt,
    lastOpenedAt: bundle.invitation.lastOpenedAt,
    sentAt: bundle.invitation.sentAt,
    rsvpStatus: bundle.rsvps[0]?.status ?? "pending",
    responded: hasFullyResponded(bundle),
    pending: !hasFullyResponded(bundle),
  };
}

async function recordActivity(
  invitationId: string,
  type: ActivityType,
  metadata: Record<string, unknown> | null = null,
  db: DbOrTx = getDb(),
) {
  await db.insert(invitationActivity).values({
    invitationId,
    type,
    metadata,
  });
}

async function loadBundlesByIds(invitationIds?: string[]) {
  const db = getDb();

  if (invitationIds && invitationIds.length === 0) {
    return [];
  }

  const invitationRows = await db.query.invitations.findMany({
    where: invitationIds ? inArray(invitations.id, invitationIds) : undefined,
    orderBy: desc(invitations.createdAt),
  });

  if (invitationRows.length === 0) {
    return [];
  }

  const ids = invitationRows.map((row) => row.id);
  const [inviteeRows, rsvpRows, attendeeRows] = await Promise.all([
    db.query.invitees.findMany({
      where: inArray(invitees.invitationId, ids),
      orderBy: [desc(invitees.isPrimary), asc(invitees.createdAt), asc(invitees.fullName)],
    }),
    db.query.rsvps.findMany({
      where: inArray(rsvps.invitationId, ids),
      orderBy: asc(rsvps.updatedAt),
    }),
    db.query.attendeeResponses.findMany({
      orderBy: [asc(attendeeResponses.sortOrder), asc(attendeeResponses.fullName)],
    }),
  ]);

  const attendeeMap = new Map<string, AttendeeResponseRecord[]>();
  attendeeRows.forEach((row) => {
    attendeeMap.set(row.rsvpId, [...(attendeeMap.get(row.rsvpId) ?? []), row]);
  });

  const inviteeMap = new Map<string, InviteeRecord[]>();
  inviteeRows.forEach((row) => {
    inviteeMap.set(row.invitationId, [...(inviteeMap.get(row.invitationId) ?? []), row]);
  });

  const rsvpMap = new Map<string, InvitationBundle["rsvps"]>();
  rsvpRows.forEach((row) => {
    rsvpMap.set(row.invitationId, [
      ...(rsvpMap.get(row.invitationId) ?? []),
      {
        ...row,
        attendees: attendeeMap.get(row.id) ?? [],
      },
    ]);
  });

  return invitationRows.map((invitation) => ({
    invitation,
    invitees: inviteeMap.get(invitation.id) ?? [],
    rsvps: rsvpMap.get(invitation.id) ?? [],
  }));
}

export async function listInvitationBundles() {
  return loadBundlesByIds();
}

export async function getInvitationBundle(invitationId: string) {
  const [bundle] = await loadBundlesByIds([invitationId]);
  return bundle ?? null;
}

export async function getInvitationForAccess(
  invitationId: string,
  signature: string,
) {
  const bundle = await getInvitationBundle(invitationId);

  if (!bundle) {
    return { ok: false as const, reason: "invalid" as const };
  }

  if (
    !verifyInvitationSignature(
      invitationId,
      bundle.invitation.tokenVersion,
      signature,
    )
  ) {
    return { ok: false as const, reason: "invalid" as const };
  }

  if (isInvitationExpired(bundle)) {
    return { ok: false as const, reason: "expired" as const };
  }

  return { ok: true as const, bundle };
}

export async function getInvitationFromGuestSession(input: {
  invitationId: string;
  tokenVersion: number;
}) {
  const bundle = await getInvitationBundle(input.invitationId);

  if (!bundle || bundle.invitation.tokenVersion !== input.tokenVersion) {
    return null;
  }

  if (isInvitationExpired(bundle)) {
    return null;
  }

  return bundle;
}

export async function markInvitationOpened(invitationId: string) {
  const now = new Date();

  await getDb()
    .update(invitations)
    .set({
      firstOpenedAt: sql`coalesce(${invitations.firstOpenedAt}, ${now})`,
      lastOpenedAt: now,
      accessCount: sql`${invitations.accessCount} + 1`,
      updatedAt: now,
    })
    .where(eq(invitations.id, invitationId));

  await recordActivity(invitationId, "link_opened");
}

async function replaceInvitationStructure(
  invitationId: string,
  input: SaveInvitationInput,
) {
  const db = getDb();
  const now = new Date();
  const normalizedInvitees = normalizeInvitationInvitees(input);

  const currentInvitees = await db.query.invitees.findMany({
    where: eq(invitees.invitationId, invitationId),
    orderBy: [desc(invitees.isPrimary), asc(invitees.createdAt), asc(invitees.fullName)],
  });
  const keptInviteeIds = new Set<string>();

  for (const [index, inviteeInput] of normalizedInvitees.entries()) {
    const existingInvitee = currentInvitees[index];

    if (existingInvitee) {
      keptInviteeIds.add(existingInvitee.id);

      await db
        .update(invitees)
        .set({
          fullName: inviteeInput.fullName,
          email: null,
          kind: inviteeInput.kind,
          isPrimary: inviteeInput.isPrimary,
        })
        .where(eq(invitees.id, existingInvitee.id));

      continue;
    }

    await db.insert(invitees).values({
      invitationId,
      fullName: inviteeInput.fullName,
      email: null,
      kind: inviteeInput.kind,
      isPrimary: inviteeInput.isPrimary,
      createdAt: new Date(now.getTime() + index),
    });
  }

  const deletedInviteeIds = currentInvitees
    .filter((invitee) => !keptInviteeIds.has(invitee.id))
    .map((invitee) => invitee.id);

  if (deletedInviteeIds.length > 0) {
    await db.delete(invitees).where(inArray(invitees.id, deletedInviteeIds));
  }

  await db
    .update(invitations)
    .set({
      primaryEmail: normalizeEmail(input.primaryEmail),
      invitationMode: input.invitationMode,
      locale: input.locale,
      updatedAt: now,
    })
    .where(eq(invitations.id, invitationId));

  await recordActivity(invitationId, "admin_updated", {
    updatedAt: now.toISOString(),
  });
}

export async function saveInvitation(input: SaveInvitationInput) {
  const db = getDb();

  if (input.id) {
    await replaceInvitationStructure(input.id, input);
    return input.id;
  }

  const [created] = await db
    .insert(invitations)
    .values({
      primaryEmail: normalizeEmail(input.primaryEmail),
      invitationMode: input.invitationMode,
      locale: input.locale,
    })
    .returning({ id: invitations.id });

  await replaceInvitationStructure(created.id, input);

  return created.id;
}

export async function upsertInvitationsFromImport(
  imports: Array<SaveInvitationInput>,
) {
  if (imports.length === 0) {
    return;
  }

  const db = getDb();
  const normalizedEmails = imports.map((item) => normalizeEmail(item.primaryEmail));
  const existing = await db.query.invitations.findMany({
    where: inArray(invitations.primaryEmail, normalizedEmails),
  });
  const existingMap = new Map(
    existing.map((item) => [item.primaryEmail, item.id] as const),
  );

  for (const item of imports) {
    await saveInvitation({
      ...item,
      id: existingMap.get(normalizeEmail(item.primaryEmail)) ?? undefined,
    });
  }
}

export async function listDashboardData(filters: DashboardFilters = {}) {
  const bundles = await listInvitationBundles();
  const rows = bundles
    .map(buildInvitationSummary)
    .filter((summary) => {
      if (filters.status === "pending" && !summary.pending) {
        return false;
      }

      if (filters.status === "responded" && !summary.responded) {
        return false;
      }

      if (filters.status === "opened" && summary.accessCount === 0) {
        return false;
      }

      if (filters.search?.trim()) {
        const haystack = [summary.primaryGuestName, summary.primaryEmail]
          .join(" ")
          .toLowerCase();
        return haystack.includes(filters.search.toLowerCase());
      }

      return true;
    });

  const stats = {
    invitations: bundles.length,
    guests: bundles.reduce((total, bundle) => total + bundle.invitees.length, 0),
    opened: bundles.filter((bundle) => bundle.invitation.accessCount > 0).length,
    responded: bundles.filter(hasFullyResponded).length,
    waiting: bundles.filter((bundle) => !hasFullyResponded(bundle)).length,
  };

  return { rows, stats };
}

export async function getInvitationActivity(invitationId: string) {
  return getDb().query.invitationActivity.findMany({
    where: eq(invitationActivity.invitationId, invitationId),
    orderBy: desc(invitationActivity.createdAt),
    limit: 20,
  });
}

export async function sendInvitationEmailForInvitation(
  invitationId: string,
  mode: "invite_sent" | "invite_resent" = "invite_sent",
) {
  const bundle = await getInvitationBundle(invitationId);

  if (!bundle) {
    throw new Error("Invitation not found.");
  }

  const primaryGuest = getPrimaryGuest(bundle);
  const result = await sendInvitationEmail({
    to: bundle.invitation.primaryEmail,
    locale: bundle.invitation.locale,
    guestName: primaryGuest?.fullName ?? bundle.invitation.primaryEmail,
    invitationLink: buildInvitationUrl(
      bundle.invitation.id,
      bundle.invitation.tokenVersion,
    ),
  });

  if (!("skipped" in result)) {
    const now = new Date();
    await getDb()
      .update(invitations)
      .set({
        sentAt: bundle.invitation.sentAt ?? now,
        lastSentAt: now,
        updatedAt: now,
      })
      .where(eq(invitations.id, invitationId));

    await recordActivity(invitationId, mode, {
      emailedTo: bundle.invitation.primaryEmail,
    });
  }

  return result;
}

export async function sendRecoveryLinks(email: string, ipAddress?: string | null) {
  const db = getDb();
  const normalizedEmail = normalizeEmail(email);
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const recentEmailRequests = await db.query.recoveryRequests.findMany({
    where: and(
      eq(recoveryRequests.email, normalizedEmail),
      gte(recoveryRequests.createdAt, oneHourAgo),
    ),
  });

  const recentIpRequests =
    ipAddress?.trim()
      ? await db.query.recoveryRequests.findMany({
          where: and(
            eq(recoveryRequests.ipAddress, ipAddress),
            gte(recoveryRequests.createdAt, oneHourAgo),
          ),
        })
      : [];

  await db.insert(recoveryRequests).values({
    email: normalizedEmail,
    ipAddress: ipAddress?.trim() || null,
  });

  if (
    recentEmailRequests.length >= recoveryMaxPerEmailPerHour ||
    recentIpRequests.length >= recoveryMaxPerIpPerHour
  ) {
    return {
      rateLimited: true,
      invitations: 0,
    };
  }

  const inviteeMatches = await db.query.invitees.findMany({
    where: eq(invitees.email, normalizedEmail),
    columns: {
      invitationId: true,
    },
  });
  const matchedInviteeIds = inviteeMatches.map((row) => row.invitationId);
  const invitationWhere =
    matchedInviteeIds.length > 0
      ? or(
          eq(invitations.primaryEmail, normalizedEmail),
          inArray(invitations.id, matchedInviteeIds),
        )
      : eq(invitations.primaryEmail, normalizedEmail);

  const matchedInvitations = await db.query.invitations.findMany({
    where: invitationWhere,
  });

  if (matchedInvitations.length === 0) {
    return {
      rateLimited: false,
      invitations: 0,
    };
  }

  const bundles = await loadBundlesByIds(matchedInvitations.map((row) => row.id));

  for (const bundle of bundles) {
    const primaryGuest = getPrimaryGuest(bundle);
    const result = await sendRecoveryEmail({
      to: normalizedEmail,
      locale: bundle.invitation.locale,
      guestName: primaryGuest?.fullName ?? bundle.invitation.primaryEmail,
      invitationLink: buildInvitationUrl(
        bundle.invitation.id,
        bundle.invitation.tokenVersion,
      ),
    });

    if (!("skipped" in result)) {
      await recordActivity(bundle.invitation.id, "recovery_sent", {
        emailedTo: normalizedEmail,
      });
    }
  }

  return {
    rateLimited: false,
    invitations: bundles.length,
  };
}

function buildRsvpStatusFromPayload(parsed: GuestRsvpPayload) {
  return parsed.invitees.some((invitee) => invitee.attending) ? "attending" : "declined";
}

export async function saveGuestRsvp(input: {
  invitationId: string;
  payload: unknown;
  skipEmail?: boolean;
  contactPhone?: string | null;
}) {
  const bundle = await getInvitationBundle(input.invitationId);

  if (!bundle) {
    return {
      ok: false as const,
      formError: "Invitation not found.",
    };
  }

  const validation = validateGuestRsvpPayload(input.payload);

  if (!validation.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of validation.error.issues) {
      if (issue.path.length > 0) {
        const key = issue.path.join(".");
        (fieldErrors[key] ??= []).push(issue.message);
      }
    }
    return {
      ok: false as const,
      fieldErrors,
      formError: "Please review the highlighted fields.",
    };
  }

  const parsed = validation.data;

  const inviteeIds = new Set(bundle.invitees.map((invitee) => invitee.id));
  const payloadInviteeIds = new Set(parsed.invitees.map((invitee) => invitee.inviteeId));

  if (
    inviteeIds.size !== payloadInviteeIds.size ||
    [...inviteeIds].some((inviteeId) => !payloadInviteeIds.has(inviteeId))
  ) {
    return {
      ok: false as const,
      formError: "The RSVP payload did not match the invitation guest list.",
    };
  }

  const inviteeLookup = new Map(bundle.invitees.map((invitee) => [invitee.id, invitee] as const));
  const status = buildRsvpStatusFromPayload(parsed);
  const now = new Date();
  const existing = bundle.rsvps[0] ?? null;

  let rsvpId = existing?.id;

  if (existing) {
    await getDb()
      .update(rsvps)
      .set({
        status,
        submittedAt: now,
        updatedAt: now,
      })
      .where(eq(rsvps.id, existing.id));

    await getDb()
      .delete(attendeeResponses)
      .where(eq(attendeeResponses.rsvpId, existing.id));
  } else {
    const [created] = await getDb()
      .insert(rsvps)
      .values({
        invitationId: bundle.invitation.id,
        status,
        submittedAt: now,
        updatedAt: now,
      })
      .returning({ id: rsvps.id });
    rsvpId = created.id;
  }

  await Promise.all(
    parsed.invitees.map((response) => {
      const invitee = inviteeLookup.get(response.inviteeId);

      if (!invitee) {
        return Promise.resolve();
      }

      return getDb()
        .update(invitees)
        .set({
          fullName: response.fullName.trim(),
          kind: invitee.isPrimary ? "adult" : response.kind,
        })
        .where(eq(invitees.id, invitee.id));
    }),
  );

  const attendeeRows: Array<typeof attendeeResponses.$inferInsert> = [];
  let sortOrder = 0;

  parsed.invitees.forEach((response) => {
    const invitee = inviteeLookup.get(response.inviteeId);

    if (!invitee || !rsvpId) {
      return;
    }

    attendeeRows.push({
      rsvpId,
      inviteeId: invitee.id,
      attendeeType: response.kind === "child" ? "child" : "named_guest",
      fullName: response.fullName.trim(),
      isAttending: response.attending,
      dietaryRequirements: response.attending
        ? response.dietaryRequirements?.trim() || null
        : null,
      phoneNumber: null,
      sortOrder: sortOrder++,
    });
  });

  if (attendeeRows.length > 0) {
    await getDb().insert(attendeeResponses).values(attendeeRows);
  }

  if (input.contactPhone !== undefined) {
    const next =
      input.contactPhone === null
        ? null
        : input.contactPhone.trim().length > 0
          ? input.contactPhone.trim()
          : null;
    await getDb()
      .update(invitations)
      .set({
        contactPhone: next,
        updatedAt: now,
      })
      .where(eq(invitations.id, bundle.invitation.id));
  }

  await recordActivity(
    bundle.invitation.id,
    "rsvp_updated",
    {
      status,
      attendeeCount: attendeeRows.filter((attendee) => attendee.isAttending).length,
    },
  );

  if (status === "attending" && !input.skipEmail) {
    const primaryGuest = getPrimaryGuest(bundle);
    await sendConfirmationEmail({
      to: bundle.invitation.primaryEmail,
      locale: bundle.invitation.locale,
      guestName: primaryGuest?.fullName ?? bundle.invitation.primaryEmail,
      invitationLink: buildInvitationUrl(
        bundle.invitation.id,
        bundle.invitation.tokenVersion,
      ),
    });
  }

  return {
    ok: true as const,
    status,
  };
}

export async function buildAttendeeExportRows() {
  const bundles = await listInvitationBundles();
  return buildAttendeeRows(bundles);
}

export async function buildInvitationStatusExportRows() {
  const bundles = await listInvitationBundles();

  return bundles.map((bundle) => {
    const summary = buildInvitationSummary(bundle);

    return {
      invitationId: summary.id,
      primaryGuest: summary.primaryGuestName,
      primaryEmail: summary.primaryEmail,
      invitationMode: summary.invitationMode,
      accessCount: String(summary.accessCount),
      sentAt: summary.sentAt?.toISOString() ?? "",
      firstOpenedAt: summary.firstOpenedAt?.toISOString() ?? "",
      lastOpenedAt: summary.lastOpenedAt?.toISOString() ?? "",
      responded: summary.responded ? "yes" : "no",
      rsvpStatus: summary.rsvpStatus,
    };
  });
}

export async function getInvitationForAdmin(invitationId: string) {
  return getInvitationBundle(invitationId);
}

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

  return db.transaction(async (tx) => {
    const [invitation] = await tx
      .insert(invitations)
      .values({
        primaryEmail: normalizeEmail(input.primaryEmail),
        contactPhone: input.contactPhone.trim() || null,
        invitationMode,
        locale: "de",
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: invitations.id });

    if (!invitation) throw new Error("Failed to insert invitation row");

    const inviteeRows = input.roster.map((entry, index) => ({
      invitationId: invitation.id,
      fullName: entry.fullName.trim(),
      email: null,
      kind: index === 0 ? ("adult" as const) : entry.kind,
      isPrimary: index === 0,
      createdAt: new Date(now.getTime() + index),
    }));

    const insertedInvitees = await tx
      .insert(invitees)
      .values(inviteeRows)
      .returning({ id: invitees.id, isPrimary: invitees.isPrimary });

    if (insertedInvitees.length !== input.roster.length) {
      throw new Error(
        `Expected ${input.roster.length} invitee rows, got ${insertedInvitees.length}`,
      );
    }

    const [rsvpRow] = await tx
      .insert(rsvps)
      .values({
        invitationId: invitation.id,
        status: "attending",
        submittedAt: now,
        updatedAt: now,
      })
      .returning({ id: rsvps.id });

    if (!rsvpRow) throw new Error("Failed to insert rsvp row");

    const attendeeRows = input.roster.map((entry, index) => {
      const resolvedKind = index === 0 ? "adult" : entry.kind;
      return {
        rsvpId: rsvpRow.id,
        inviteeId: insertedInvitees[index]!.id,
        attendeeType: (resolvedKind === "child" ? "child" : "named_guest") as
          | "named_guest"
          | "child",
        fullName: entry.fullName.trim(),
        isAttending: true,
        dietaryRequirements: entry.dietaryRequirements || null,
        phoneNumber: null,
        sortOrder: index,
      };
    });

    await tx.insert(attendeeResponses).values(attendeeRows);

    await recordActivity(
      invitation.id,
      "rsvp_updated",
      {
        status: "attending",
        attendeeCount: attendeeRows.length,
      },
      tx,
    );

    return { invitationId: invitation.id };
  });
}

