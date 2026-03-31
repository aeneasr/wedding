import { describe, expect, it } from "vitest";

import { validateGuestRsvpPayload } from "@/src/lib/validation";

describe("validateGuestRsvpPayload", () => {
  it("requires contact fields for attending adults", () => {
    const result = validateGuestRsvpPayload({
      eventKey: "event_2",
      invitees: [
        {
          inviteeId: "7d5aaf64-fac2-4ed0-b2e2-6771c0b9c749",
          fullName: "Alex Rivera",
          kind: "adult",
          attending: true,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ],
      plusOne: null,
      children: [],
    });

    expect(result.success).toBe(false);
  });

  it("accepts a full Event Two response", () => {
    const result = validateGuestRsvpPayload({
      eventKey: "event_2",
      invitees: [
        {
          inviteeId: "7d5aaf64-fac2-4ed0-b2e2-6771c0b9c749",
          fullName: "Alex Rivera",
          kind: "adult",
          attending: true,
          dietaryRequirements: "Vegetarian",
          phoneNumber: "+49 123 456789",
        },
      ],
      plusOne: {
        attending: true,
        fullName: "Sam Rivera",
        dietaryRequirements: "",
        phoneNumber: "+49 123 456780",
      },
      children: [
        {
          fullName: "Max Rivera",
          dietaryRequirements: "No nuts",
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
