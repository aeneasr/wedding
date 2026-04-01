import { z } from "zod";

import {
  maxAdditionalHouseholdMembers,
  maxHouseholdMembers,
  type InviteeKind,
  type InvitationMode,
  type Locale,
} from "@/src/lib/constants";

export const inviteeInputSchema = z.object({
  fullName: z.string().trim().max(120),
  email: z.email().optional().or(z.literal("")),
  kind: z.enum(["adult", "child"]).default("adult"),
  isPrimary: z.boolean().default(false),
});

export const adminInvitationSchema = z
  .object({
    primaryEmail: z.email("A valid primary email is required."),
    invitationMode: z.enum(["individual", "household"] satisfies [InvitationMode, ...InvitationMode[]]),
    locale: z.enum(["en", "de"] satisfies [Locale, ...Locale[]]),
    invitees: z
      .array(inviteeInputSchema)
      .min(1, "Add at least one person.")
      .max(maxHouseholdMembers, `A household can include up to ${maxHouseholdMembers} people.`),
  })
  .superRefine((value, ctx) => {
    if (value.invitationMode === "individual" && value.invitees.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Individual invitations can only include one person.",
        path: ["invitees"],
      });
    }

    if (value.invitationMode === "household" && value.invitees.length > maxAdditionalHouseholdMembers + 1) {
      ctx.addIssue({
        code: "custom",
        message: `A household can include up to ${maxHouseholdMembers} people.`,
        path: ["invitees"],
      });
    }

    if (value.invitees.length === 0) {
      return;
    }

    const primaryInvitees = value.invitees.filter((invitee) => invitee.isPrimary);

    if (primaryInvitees.length !== 1 || !value.invitees[0]?.isPrimary) {
      ctx.addIssue({
        code: "custom",
        message: "Exactly one primary person is required, and it must be the first row.",
        path: ["invitees"],
      });
    }

    value.invitees.forEach((invitee, index) => {
      if (index === 0) {
        if (!invitee.fullName.trim()) {
          ctx.addIssue({
            code: "custom",
            message: "Primary person name is required.",
            path: ["invitees", index, "fullName"],
          });
        }

        if (invitee.kind !== "adult") {
          ctx.addIssue({
            code: "custom",
            message: "The primary person must be an adult.",
            path: ["invitees", index, "kind"],
          });
        }
      }
    });
  });

const guestResponseSchema = z.object({
  inviteeId: z.string().uuid(),
  fullName: z.string().trim().min(1).max(120),
  kind: z.enum(["adult", "child"] satisfies [InviteeKind, ...InviteeKind[]]),
  isPrimary: z.boolean(),
  attending: z.boolean(),
  dietaryRequirements: z.string().trim().max(500).optional(),
  phoneNumber: z.string().trim().max(50).optional(),
});

export const guestRsvpSchema = z.object({
  invitees: z.array(guestResponseSchema).min(1),
});

export type GuestRsvpPayload = z.infer<typeof guestRsvpSchema>;

export function validateGuestRsvpPayload(payload: unknown) {
  return guestRsvpSchema.superRefine((value, ctx) => {
    value.invitees.forEach((invitee, index) => {
      if (invitee.isPrimary && invitee.kind !== "adult") {
        ctx.addIssue({
          code: "custom",
          path: ["invitees", index, "kind"],
          message: "The primary person must remain an adult.",
        });
      }

      if (invitee.attending && invitee.kind === "adult") {
        if (!invitee.phoneNumber?.trim()) {
          ctx.addIssue({
            code: "custom",
            path: ["invitees", index, "phoneNumber"],
            message: "Phone number is required for attending adults.",
          });
        }
      }

      if (!invitee.fullName.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["invitees", index, "fullName"],
          message: "Name is required.",
        });
      }
    });
  }).safeParse(payload);
}
