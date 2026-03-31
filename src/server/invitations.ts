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
  invitationEvents,
  invitations,
  invitees,
  recoveryRequests,
  rsvps,
} from "@/src/db/schema";
import {
  type ActivityType,
  type EventKey,
  type InvitationMode,
  type InviteeKind,
  type Locale,
  type RsvpStatus,
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

export type InvitationRecord = typeof invitations.$inferSelect;
export type InviteeRecord = typeof invitees.$inferSelect;
export type InvitationEventRecord = typeof invitationEvents.$inferSelect;
export type RsvpRecord = typeof rsvps.$inferSelect;
export type AttendeeResponseRecord = typeof attendeeResponses.$inferSelect;
export type InvitationActivityRecord = typeof invitationActivity.$inferSelect;

export type InvitationBundle = {
  invitation: InvitationRecord;
  invitees: InviteeRecord[];
  events: InvitationEventRecord[];
  rsvps: Array<
    RsvpRecord & {
      attendees: AttendeeResponseRecord[];
    }
  >;
};

export type SaveInvitationInput = {
  id?: string;
  externalId?: string | null;
  primaryEmail: string;
  invitationMode: InvitationMode;
  locale: Locale;
  namedGuests: Array<{
    fullName: string;
    email?: string | null;
    kind: InviteeKind;
    isPrimary: boolean;
  }>;
  event1Invited: boolean;
  event2Invited: boolean;
  event2PlusOneAllowed: boolean;
  event2ChildrenAllowed: boolean;
  event2MaxChildren: number;
};

export type DashboardFilters = {
  search?: string;
  status?: "all" | "pending" | "responded" | "opened";
  event?: "all" | EventKey;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getInvitedEventKeys(bundle: InvitationBundle) {
  return bundle.events.map((event) => event.eventKey);
}

function getPrimaryGuest(bundle: InvitationBundle) {
  return (
    bundle.invitees.find((invitee) => invitee.isPrimary) ??
    bundle.invitees.at(0) ??
    null
  );
}

function getRsvpForEvent(bundle: InvitationBundle, eventKey: EventKey) {
  return bundle.rsvps.find((rsvp) => rsvp.eventKey === eventKey) ?? null;
}

function isInvitationExpired(bundle: InvitationBundle) {
  return Date.now() > getInvitationExpiry(getInvitedEventKeys(bundle));
}

function getEventStatus(bundle: InvitationBundle, eventKey: EventKey): RsvpStatus | null {
  if (!bundle.events.some((event) => event.eventKey === eventKey)) {
    return null;
  }

  return getRsvpForEvent(bundle, eventKey)?.status ?? "pending";
}

function hasFullyResponded(bundle: InvitationBundle) {
  const invitedEventKeys = getInvitedEventKeys(bundle);
  return invitedEventKeys.every((eventKey) => getEventStatus(bundle, eventKey) !== "pending");
}

function buildInvitationSummary(bundle: InvitationBundle) {
  const primaryGuest = getPrimaryGuest(bundle);
  const eventStatuses = Object.fromEntries(
    getInvitedEventKeys(bundle).map((eventKey) => [
      eventKey,
      getEventStatus(bundle, eventKey) ?? "pending",
    ]),
  ) as Record<EventKey, RsvpStatus>;

  return {
    id: bundle.invitation.id,
    externalId: bundle.invitation.externalId,
    primaryEmail: bundle.invitation.primaryEmail,
    primaryGuestName: primaryGuest?.fullName ?? bundle.invitation.primaryEmail,
    invitationMode: bundle.invitation.invitationMode,
    locale: bundle.invitation.locale,
    invitedEvents: getInvitedEventKeys(bundle),
    guestCount: bundle.invitees.length,
    accessCount: bundle.invitation.accessCount,
    firstOpenedAt: bundle.invitation.firstOpenedAt,
    lastOpenedAt: bundle.invitation.lastOpenedAt,
    sentAt: bundle.invitation.sentAt,
    eventStatuses,
    responded: hasFullyResponded(bundle),
    pending: !hasFullyResponded(bundle),
  };
}

async function recordActivity(
  invitationId: string,
  type: ActivityType,
  metadata: Record<string, unknown> | null = null,
  eventKey?: EventKey,
) {
  await getDb().insert(invitationActivity).values({
    invitationId,
    type,
    metadata,
    eventKey,
  });
}

async function loadBundlesByIds(invitationIds?: string[]) {
  const db = getDb();

  const invitationRows = await db.query.invitations.findMany({
    where:
      invitationIds && invitationIds.length > 0
        ? inArray(invitations.id, invitationIds)
        : undefined,
    orderBy: desc(invitations.createdAt),
  });

  if (invitationRows.length === 0) {
    return [];
  }

  const ids = invitationRows.map((row) => row.id);
  const [inviteeRows, eventRows, rsvpRows, attendeeRows] = await Promise.all([
    db.query.invitees.findMany({
      where: inArray(invitees.invitationId, ids),
      orderBy: [desc(invitees.isPrimary), asc(invitees.fullName)],
    }),
    db.query.invitationEvents.findMany({
      where: inArray(invitationEvents.invitationId, ids),
      orderBy: asc(invitationEvents.eventKey),
    }),
    db.query.rsvps.findMany({
      where: inArray(rsvps.invitationId, ids),
      orderBy: asc(rsvps.eventKey),
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

  const eventMap = new Map<string, InvitationEventRecord[]>();
  eventRows.forEach((row) => {
    eventMap.set(row.invitationId, [...(eventMap.get(row.invitationId) ?? []), row]);
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
    events: eventMap.get(invitation.id) ?? [],
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
  const invitedEvents: Array<{
    invitationId: string;
    eventKey: EventKey;
    plusOneAllowed: boolean;
    childrenAllowed: boolean;
    maxChildren: number;
  }> = [];

  if (input.event1Invited) {
    invitedEvents.push({
      invitationId,
      eventKey: "event_1",
      plusOneAllowed: false,
      childrenAllowed: false,
      maxChildren: 0,
    });
  }

  if (input.event2Invited) {
    invitedEvents.push({
      invitationId,
      eventKey: "event_2",
      plusOneAllowed: input.event2PlusOneAllowed,
      childrenAllowed: input.event2ChildrenAllowed,
      maxChildren: input.event2ChildrenAllowed ? input.event2MaxChildren : 0,
    });
  }

  const currentRsvps = await db.query.rsvps.findMany({
    where: eq(rsvps.invitationId, invitationId),
  });
  const allowedEventKeys = new Set(invitedEvents.map((event) => event.eventKey));
  const obsoleteRsvpIds = currentRsvps
    .filter((rsvp) => !allowedEventKeys.has(rsvp.eventKey))
    .map((rsvp) => rsvp.id);

  if (obsoleteRsvpIds.length > 0) {
    await db
      .delete(attendeeResponses)
      .where(inArray(attendeeResponses.rsvpId, obsoleteRsvpIds));
    await db.delete(rsvps).where(inArray(rsvps.id, obsoleteRsvpIds));
  }

  await db.delete(invitees).where(eq(invitees.invitationId, invitationId));
  await db
    .delete(invitationEvents)
    .where(eq(invitationEvents.invitationId, invitationId));

  if (input.namedGuests.length > 0) {
    await db.insert(invitees).values(
      input.namedGuests.map((guest, index) => ({
        invitationId,
        fullName: guest.fullName.trim(),
        email: guest.email?.trim() ? normalizeEmail(guest.email) : null,
        kind: guest.kind,
        isPrimary:
          guest.isPrimary || (!input.namedGuests.some((item) => item.isPrimary) && index === 0),
      })),
    );
  }

  if (invitedEvents.length > 0) {
    await db.insert(invitationEvents).values(invitedEvents);
  }

  await db
    .update(invitations)
    .set({
      primaryEmail: normalizeEmail(input.primaryEmail),
      invitationMode: input.invitationMode,
      locale: input.locale,
      externalId: input.externalId?.trim() || null,
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
      externalId: input.externalId?.trim() || null,
      primaryEmail: normalizeEmail(input.primaryEmail),
      invitationMode: input.invitationMode,
      locale: input.locale,
    })
    .returning({ id: invitations.id });

  await replaceInvitationStructure(created.id, input);

  return created.id;
}

export async function upsertInvitationsFromImport(
  imports: Array<
    SaveInvitationInput & {
      externalId: string;
    }
  >,
) {
  if (imports.length === 0) {
    return;
  }

  const db = getDb();
  const existing = await db.query.invitations.findMany({
    where: inArray(
      invitations.externalId,
      imports.map((item) => item.externalId),
    ),
  });
  const existingMap = new Map(
    existing.map((item) => [item.externalId, item.id] as const),
  );

  for (const item of imports) {
    await saveInvitation({
      ...item,
      id: existingMap.get(item.externalId) ?? undefined,
    });
  }
}

export async function listDashboardData(filters: DashboardFilters = {}) {
  const bundles = await listInvitationBundles();
  const rows = bundles
    .map(buildInvitationSummary)
    .filter((summary) => {
      if (filters.event && filters.event !== "all" && !summary.invitedEvents.includes(filters.event)) {
        return false;
      }

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
        const haystack = [
          summary.primaryGuestName,
          summary.primaryEmail,
          summary.externalId ?? "",
        ]
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
    invitedEvents: getInvitedEventKeys(bundle),
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
  const namedGuestsAttending = parsed.invitees.some((invitee) => invitee.attending);
  const plusOneAttending = parsed.plusOne?.attending ?? false;
  const childrenAttending = parsed.children.length > 0;

  return namedGuestsAttending || plusOneAttending || childrenAttending
    ? "attending"
    : "declined";
}

export async function saveGuestRsvp(input: {
  invitationId: string;
  eventKey: EventKey;
  payload: unknown;
  skipEmail?: boolean;
}) {
  const bundle = await getInvitationBundle(input.invitationId);

  if (!bundle) {
    return {
      ok: false as const,
      formError: "Invitation not found.",
    };
  }

  const entitlement = bundle.events.find((event) => event.eventKey === input.eventKey);

  if (!entitlement) {
    return {
      ok: false as const,
      formError: "This event is not available for this invitation.",
    };
  }

  const validation = validateGuestRsvpPayload(input.payload);

  if (!validation.success) {
    return {
      ok: false as const,
      fieldErrors: validation.error.flatten(),
      formError: "Please review the highlighted fields.",
    };
  }

  const parsed = validation.data;

  if (parsed.eventKey !== input.eventKey) {
    return {
      ok: false as const,
      formError: "The submitted RSVP did not match the selected event.",
    };
  }

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

  if (input.eventKey === "event_1") {
    if (parsed.plusOne?.attending || parsed.children.length > 0) {
      return {
        ok: false as const,
        formError: "Additional guests are not available for this event.",
      };
    }
  }

  if (input.eventKey === "event_2") {
    if (!entitlement.plusOneAllowed && parsed.plusOne?.attending) {
      return {
        ok: false as const,
        formError: "A plus one is not available for this invitation.",
      };
    }

    if (!entitlement.childrenAllowed && parsed.children.length > 0) {
      return {
        ok: false as const,
        formError: "Children are not available for this invitation.",
      };
    }

    if (parsed.children.length > entitlement.maxChildren) {
      return {
        ok: false as const,
        formError: "The submitted child count exceeds this invitation limit.",
      };
    }
  }

  const inviteeLookup = new Map(bundle.invitees.map((invitee) => [invitee.id, invitee] as const));
  const status = buildRsvpStatusFromPayload(parsed);
  const now = new Date();
  const existing = getRsvpForEvent(bundle, input.eventKey);

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
        eventKey: input.eventKey,
        status,
        submittedAt: now,
        updatedAt: now,
      })
      .returning({ id: rsvps.id });
    rsvpId = created.id;
  }

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
      attendeeType: invitee.kind === "child" ? "child" : "named_guest",
      fullName: invitee.fullName,
      isAttending: response.attending,
      dietaryRequirements: response.attending
        ? response.dietaryRequirements?.trim() || null
        : null,
      phoneNumber:
        response.attending && invitee.kind === "adult"
          ? response.phoneNumber?.trim() || null
          : null,
      sortOrder: sortOrder++,
    });
  });

  if (rsvpId && parsed.plusOne?.attending) {
    attendeeRows.push({
      rsvpId,
      attendeeType: "plus_one",
      fullName: parsed.plusOne.fullName?.trim() || "Plus one",
      isAttending: true,
      dietaryRequirements: parsed.plusOne.dietaryRequirements?.trim() || null,
      phoneNumber: parsed.plusOne.phoneNumber?.trim() || null,
      sortOrder: sortOrder++,
    });
  }

  if (rsvpId) {
    parsed.children.forEach((child) => {
      attendeeRows.push({
        rsvpId,
        attendeeType: "child",
        fullName: child.fullName.trim(),
        isAttending: true,
        dietaryRequirements: child.dietaryRequirements?.trim() || null,
        phoneNumber: null,
        sortOrder: sortOrder++,
      });
    });
  }

  if (attendeeRows.length > 0) {
    await getDb().insert(attendeeResponses).values(attendeeRows);
  }

  await recordActivity(
    bundle.invitation.id,
    "rsvp_updated",
    {
      status,
      attendeeCount: attendeeRows.filter((attendee) => attendee.isAttending).length,
    },
    input.eventKey,
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
      eventKey: input.eventKey,
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
      externalId: summary.externalId ?? "",
      primaryGuest: summary.primaryGuestName,
      primaryEmail: summary.primaryEmail,
      invitationMode: summary.invitationMode,
      invitedEvents: summary.invitedEvents.join("|"),
      accessCount: String(summary.accessCount),
      sentAt: summary.sentAt?.toISOString() ?? "",
      firstOpenedAt: summary.firstOpenedAt?.toISOString() ?? "",
      lastOpenedAt: summary.lastOpenedAt?.toISOString() ?? "",
      responded: summary.responded ? "yes" : "no",
      event1Status: summary.eventStatuses.event_1 ?? "",
      event2Status: summary.eventStatuses.event_2 ?? "",
    };
  });
}

export async function getInvitationForAdmin(invitationId: string) {
  return getInvitationBundle(invitationId);
}

export async function getInvitationByExternalId(externalId: string) {
  const invitation = await getDb().query.invitations.findFirst({
    where: eq(invitations.externalId, externalId),
  });

  if (!invitation) {
    return null;
  }

  return getInvitationBundle(invitation.id);
}
