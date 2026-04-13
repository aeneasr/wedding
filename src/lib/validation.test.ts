import { describe, expect, it } from "vitest";

import { validateGuestRsvpPayload } from "@/src/lib/validation";

describe("validateGuestRsvpPayload", () => {
  it("accepts attending adult without phone number", () => {
    const result = validateGuestRsvpPayload({
      invitees: [
        {
          inviteeId: "7d5aaf64-fac2-4ed0-b2e2-6771c0b9c749",
          fullName: "Alex Rivera",
          kind: "adult",
          isPrimary: true,
          attending: true,
          dietaryRequirements: "",
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("accepts a full household response", () => {
    const result = validateGuestRsvpPayload({
      invitees: [
        {
          inviteeId: "7d5aaf64-fac2-4ed0-b2e2-6771c0b9c749",
          fullName: "Alex Rivera",
          kind: "adult",
          isPrimary: true,
          attending: true,
          dietaryRequirements: "vegetarian",
        },
        {
          inviteeId: "11111111-1111-4111-8111-111111111111",
          fullName: "Sam Rivera",
          kind: "adult",
          isPrimary: false,
          attending: true,
          dietaryRequirements: "",
        },
        {
          inviteeId: "22222222-2222-4222-8222-222222222222",
          fullName: "Max Rivera",
          kind: "child",
          isPrimary: false,
          attending: true,
          dietaryRequirements: "meat",
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
