import { mapAttendeesToInvitees } from "@/src/lib/household";
import type { InvitationBundle } from "@/src/server/invitations";

export function buildAttendeeRows(bundles: InvitationBundle[]) {
  return bundles.flatMap((bundle) => {
    const primaryGuest = bundle.invitees.find((i) => i.isPrimary) ?? bundle.invitees[0];
    const rsvp = bundle.rsvps[0] ?? null;

    return mapAttendeesToInvitees(bundle.invitees, rsvp?.attendees ?? []).map((invitee) => {
      const attendeeType = invitee.kind === "child" ? "child" : "named_guest";

      return {
        invitationId: bundle.invitation.id,
        externalId: bundle.invitation.externalId ?? "",
        primaryGuest: primaryGuest?.fullName ?? "",
        primaryEmail: bundle.invitation.primaryEmail,
        rsvpStatus: rsvp?.status ?? "pending",
        inviteeName: invitee.fullName,
        attendeeType,
        attending: rsvp ? (invitee.attending ? "yes" : "no") : "",
        dietaryRequirements: rsvp ? invitee.dietaryRequirements : "",
        phoneNumber: rsvp ? invitee.phoneNumber : "",
      };
    });
  });
}

export function toCsv(rows: Array<Record<string, string>>) {
  if (rows.length === 0) {
    return "";
  }

  const headers = Object.keys(rows[0]);
  const escapeCell = (value: string) => `"${value.replaceAll('"', '""')}"`;

  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => escapeCell(row[header] ?? "")).join(",")),
  ].join("\n");
}
