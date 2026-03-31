import { describe, expect, it } from "vitest";

import {
  formatEventDateBadge,
  getEventContent,
  getInvitationExpiry,
} from "@/src/lib/events";

describe("event content", () => {
  it("uses the August 2026 wedding dates", () => {
    expect(getEventContent("event_1").startsAt).toBe("2026-08-20T18:00:00+02:00");
    expect(getEventContent("event_1").endsAt).toBe("2026-08-20T23:30:00+02:00");
    expect(getEventContent("event_2").startsAt).toBe("2026-08-22T14:30:00+02:00");
    expect(getEventContent("event_2").endsAt).toBe("2026-08-23T00:30:00+02:00");
  });

  it("formats the guest-facing date badges from the August schedule", () => {
    expect(formatEventDateBadge("event_1")).toBe("20 Aug 2026");
    expect(formatEventDateBadge("event_2")).toBe("22 Aug 2026");
  });

  it("expires invitations after the final invited event ends", () => {
    expect(new Date(getInvitationExpiry(["event_1", "event_2"])).toISOString()).toBe(
      "2026-08-22T22:30:00.000Z",
    );
  });
});
