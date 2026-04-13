import { type AttendeeType, type InviteeKind } from "@/src/lib/constants";

export type HouseholdInviteeInput = {
  fullName: string;
  kind: InviteeKind;
  isPrimary: boolean;
};

export type HouseholdInvitee = {
  id: string;
  fullName: string;
  kind: InviteeKind;
  isPrimary: boolean;
};

export type HouseholdAttendee = {
  inviteeId: string | null;
  attendeeType: AttendeeType;
  fullName: string;
  isAttending: boolean;
  dietaryRequirements: string | null;
  sortOrder: number;
};

export type HouseholdRsvpMember = {
  inviteeId: string;
  fullName: string;
  kind: InviteeKind;
  isPrimary: boolean;
  attending: boolean;
  dietaryRequirements: string;
};

const householdMemberPlaceholderPattern = /^Household member \d+$/;
const childPlaceholderPattern = /^Child \d+$/;

export function buildPlaceholderName(kind: InviteeKind, ordinal: number) {
  return kind === "child" ? `Child ${ordinal}` : `Household member ${ordinal}`;
}

export function isPlaceholderName(fullName: string) {
  return (
    householdMemberPlaceholderPattern.test(fullName.trim()) ||
    childPlaceholderPattern.test(fullName.trim())
  );
}

export function normalizeInviteeInputs(invitees: HouseholdInviteeInput[]) {
  let adultOrdinal = 1;
  let childOrdinal = 1;

  return invitees.map((invitee, index) => {
    const isPrimary = invitee.isPrimary || index === 0;
    const kind = isPrimary ? "adult" : invitee.kind;
    const normalizedName = invitee.fullName.trim();

    return {
      ...invitee,
      fullName:
        normalizedName ||
        buildPlaceholderName(kind, kind === "child" ? childOrdinal++ : adultOrdinal++),
      kind,
      isPrimary,
    };
  });
}

export function mapAttendeesToInvitees(
  invitees: HouseholdInvitee[],
  attendees: HouseholdAttendee[] = [],
) {
  const directAttendees = new Map(
    attendees
      .filter((attendee) => attendee.inviteeId)
      .map((attendee) => [attendee.inviteeId as string, attendee] as const),
  );
  const unmatchedAdults = attendees
    .filter((attendee) => !attendee.inviteeId && attendee.attendeeType !== "child")
    .sort((left, right) => left.sortOrder - right.sortOrder);
  const unmatchedChildren = attendees
    .filter((attendee) => !attendee.inviteeId && attendee.attendeeType === "child")
    .sort((left, right) => left.sortOrder - right.sortOrder);

  return invitees.map((invitee) => {
    const attendee =
      directAttendees.get(invitee.id) ??
      (invitee.isPrimary
        ? null
        : invitee.kind === "child"
          ? unmatchedChildren.shift() ?? null
          : unmatchedAdults.shift() ?? null);

    const displayName =
      attendee && isPlaceholderName(invitee.fullName) && attendee.fullName.trim()
        ? attendee.fullName
        : invitee.fullName;

    return {
      inviteeId: invitee.id,
      fullName: displayName,
      kind: invitee.kind,
      isPrimary: invitee.isPrimary,
      attending: attendee?.isAttending ?? false,
      dietaryRequirements: attendee?.dietaryRequirements ?? "",
    } satisfies HouseholdRsvpMember;
  });
}
