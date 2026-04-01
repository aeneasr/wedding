import { describe, expect, it } from "vitest";

import { validateGuestRsvpPayload } from "@/src/lib/validation";

describe("validateGuestRsvpPayload", () => {
  it("requires contact fields for attending adults", () => {
    const result = validateGuestRsvpPayload({
      invitees: [
        {
          inviteeId: "7d5aaf64-fac2-4ed0-b2e2-6771c0b9c749",
          fullName: "Alex Rivera",
          kind: "adult",
          isPrimary: true,
          attending: true,
          dietaryRequirements: "",
          phoneNumber: "",
        },
      ],
    });

    expect(result.success).toBe(false);
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
          dietaryRequirements: "Vegetarian",
          phoneNumber: "+49 123 456789",
        },
        {
          inviteeId: "11111111-1111-4111-8111-111111111111",
          fullName: "Sam Rivera",
          kind: "adult",
          isPrimary: false,
          attending: true,
          dietaryRequirements: "",
          phoneNumber: "+49 123 456780",
        },
        {
          inviteeId: "22222222-2222-4222-8222-222222222222",
          fullName: "Max Rivera",
          kind: "child",
          isPrimary: false,
          attending: true,
          dietaryRequirements: "No nuts",
          phoneNumber: "",
        },
      ],
    });

    expect(result.success).toBe(true);
  });
});
