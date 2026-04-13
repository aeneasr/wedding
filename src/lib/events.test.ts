import { describe, expect, it } from "vitest";

import {
  eventContent,
  formatEventDateBadge,
  getInvitationExpiry,
} from "@/src/lib/events";

describe("event content", () => {
  it("uses the August 2026 wedding dates", () => {
    expect(eventContent.startsAt).toBe("2026-08-22T14:30:00+02:00");
    expect(eventContent.endsAt).toBe("2026-08-23T00:30:00+02:00");
  });

  it("formats the guest-facing date badges using the selected locale", () => {
    expect(formatEventDateBadge()).toBe("22 Aug. 2026");
    expect(formatEventDateBadge("de")).toBe("22 Aug. 2026");
  });

  it("expires invitations after the final invited event ends", () => {
    expect(new Date(getInvitationExpiry()).toISOString()).toBe(
      "2026-08-22T22:30:00.000Z",
    );
  });
});
