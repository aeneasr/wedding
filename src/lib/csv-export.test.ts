import { describe, expect, it } from "vitest";

import { buildAttendeeRows } from "@/src/lib/csv-export";
import type { InvitationBundle } from "@/src/server/invitations";

const now = new Date("2026-03-31T12:00:00Z");

function makeBundle(
  overrides: Partial<{
    invitees: InvitationBundle["invitees"];
    events: InvitationBundle["events"];
    rsvps: InvitationBundle["rsvps"];
  }> = {},
): InvitationBundle {
  return {
    invitation: {
      id: "inv-1",
      externalId: "ext-1",
      primaryEmail: "alice@example.com",
      invitationMode: "individual",
      locale: "en",
      tokenVersion: 1,
      sentAt: null,
      lastSentAt: null,
      firstOpenedAt: null,
      lastOpenedAt: null,
      accessCount: 0,
      createdAt: now,
      updatedAt: now,
    },
    invitees: overrides.invitees ?? [
      {
        id: "invitee-1",
        invitationId: "inv-1",
        fullName: "Alice Smith",
        email: "alice@example.com",
        kind: "adult",
        isPrimary: true,
        createdAt: now,
      },
    ],
    events: overrides.events ?? [
      {
        invitationId: "inv-1",
        eventKey: "event_1",
        plusOneAllowed: false,
        childrenAllowed: false,
        maxChildren: 0,
        createdAt: now,
      },
    ],
    rsvps: overrides.rsvps ?? [],
  };
}

describe("buildAttendeeRows", () => {
  it("produces rows for invitees even without RSVPs", () => {
    const bundle = makeBundle();

    const rows = buildAttendeeRows([bundle]);

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      invitationId: "inv-1",
      externalId: "ext-1",
      primaryGuest: "Alice Smith",
      primaryEmail: "alice@example.com",
      eventKey: "event_1",
      inviteeName: "Alice Smith",
      rsvpStatus: "pending",
      attending: "",
    });
  });

  it("includes RSVP data when responses exist", () => {
    const bundle = makeBundle({
      rsvps: [
        {
          id: "rsvp-1",
          invitationId: "inv-1",
          eventKey: "event_1",
          status: "attending",
          submittedAt: now,
          updatedAt: now,
          attendees: [
            {
              id: "att-1",
              rsvpId: "rsvp-1",
              inviteeId: "invitee-1",
              attendeeType: "named_guest",
              fullName: "Alice Smith",
              isAttending: true,
              dietaryRequirements: "vegan",
              phoneNumber: "+1234567890",
              sortOrder: 0,
              createdAt: now,
            },
          ],
        },
      ],
    });

    const rows = buildAttendeeRows([bundle]);

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      rsvpStatus: "attending",
      attending: "yes",
      dietaryRequirements: "vegan",
      phoneNumber: "+1234567890",
    });
  });

  it("includes plus-ones and children as extra rows", () => {
    const bundle = makeBundle({
      events: [
        {
          invitationId: "inv-1",
          eventKey: "event_2",
          plusOneAllowed: true,
          childrenAllowed: true,
          maxChildren: 2,
          createdAt: now,
        },
      ],
      rsvps: [
        {
          id: "rsvp-2",
          invitationId: "inv-1",
          eventKey: "event_2",
          status: "attending",
          submittedAt: now,
          updatedAt: now,
          attendees: [
            {
              id: "att-1",
              rsvpId: "rsvp-2",
              inviteeId: "invitee-1",
              attendeeType: "named_guest",
              fullName: "Alice Smith",
              isAttending: true,
              dietaryRequirements: null,
              phoneNumber: null,
              sortOrder: 0,
              createdAt: now,
            },
            {
              id: "att-2",
              rsvpId: "rsvp-2",
              inviteeId: null,
              attendeeType: "plus_one",
              fullName: "Bob Jones",
              isAttending: true,
              dietaryRequirements: "gluten-free",
              phoneNumber: null,
              sortOrder: 1,
              createdAt: now,
            },
            {
              id: "att-3",
              rsvpId: "rsvp-2",
              inviteeId: null,
              attendeeType: "child",
              fullName: "Charlie Smith",
              isAttending: true,
              dietaryRequirements: null,
              phoneNumber: null,
              sortOrder: 2,
              createdAt: now,
            },
          ],
        },
      ],
    });

    const rows = buildAttendeeRows([bundle]);

    expect(rows).toHaveLength(3);
    expect(rows[0]?.inviteeName).toBe("Alice Smith");
    expect(rows[0]?.attendeeType).toBe("named_guest");
    expect(rows[1]?.inviteeName).toBe("Bob Jones");
    expect(rows[1]?.attendeeType).toBe("plus_one");
    expect(rows[2]?.inviteeName).toBe("Charlie Smith");
    expect(rows[2]?.attendeeType).toBe("child");
  });

  it("produces rows for each invitee x event combination", () => {
    const bundle = makeBundle({
      invitees: [
        {
          id: "invitee-1",
          invitationId: "inv-1",
          fullName: "Alice Smith",
          email: "alice@example.com",
          kind: "adult",
          isPrimary: true,
          createdAt: now,
        },
        {
          id: "invitee-2",
          invitationId: "inv-1",
          fullName: "Dan Smith",
          email: null,
          kind: "adult",
          isPrimary: false,
          createdAt: now,
        },
      ],
      events: [
        {
          invitationId: "inv-1",
          eventKey: "event_1",
          plusOneAllowed: false,
          childrenAllowed: false,
          maxChildren: 0,
          createdAt: now,
        },
        {
          invitationId: "inv-1",
          eventKey: "event_2",
          plusOneAllowed: false,
          childrenAllowed: false,
          maxChildren: 0,
          createdAt: now,
        },
      ],
    });

    const rows = buildAttendeeRows([bundle]);

    expect(rows).toHaveLength(4);
    const combinations = rows.map((r) => `${r.inviteeName}:${r.eventKey}`);
    expect(combinations).toEqual([
      "Alice Smith:event_1",
      "Dan Smith:event_1",
      "Alice Smith:event_2",
      "Dan Smith:event_2",
    ]);
  });

  it("returns empty array for empty bundles", () => {
    expect(buildAttendeeRows([])).toEqual([]);
  });
});
