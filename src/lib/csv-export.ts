import type { InvitationBundle } from "@/src/server/invitations";

export function buildAttendeeRows(bundles: InvitationBundle[]) {
  return bundles.flatMap((bundle) => {
    const primaryGuest = bundle.invitees.find((i) => i.isPrimary) ?? bundle.invitees[0];

    return bundle.events.flatMap((event) => {
      const rsvp = bundle.rsvps.find((r) => r.eventKey === event.eventKey);

      const inviteeRows = bundle.invitees.map((invitee) => {
        const attendee = rsvp?.attendees.find((a) => a.inviteeId === invitee.id);

        return {
          invitationId: bundle.invitation.id,
          externalId: bundle.invitation.externalId ?? "",
          primaryGuest: primaryGuest?.fullName ?? "",
          primaryEmail: bundle.invitation.primaryEmail,
          eventKey: event.eventKey,
          rsvpStatus: rsvp?.status ?? "pending",
          inviteeName: invitee.fullName,
          attendeeType: invitee.kind === "child" ? "child" : "named_guest",
          attending: attendee ? (attendee.isAttending ? "yes" : "no") : "",
          dietaryRequirements: attendee?.dietaryRequirements ?? "",
          phoneNumber: attendee?.phoneNumber ?? "",
        };
      });

      const extraAttendees = (rsvp?.attendees ?? [])
        .filter((a) => !a.inviteeId)
        .map((attendee) => ({
          invitationId: bundle.invitation.id,
          externalId: bundle.invitation.externalId ?? "",
          primaryGuest: primaryGuest?.fullName ?? "",
          primaryEmail: bundle.invitation.primaryEmail,
          eventKey: event.eventKey,
          rsvpStatus: rsvp?.status ?? "pending",
          inviteeName: attendee.fullName,
          attendeeType: attendee.attendeeType,
          attending: attendee.isAttending ? "yes" : "no",
          dietaryRequirements: attendee.dietaryRequirements ?? "",
          phoneNumber: attendee.phoneNumber ?? "",
        }));

      return [...inviteeRows, ...extraAttendees];
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
