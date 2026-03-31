"use client";

import { useActionState } from "react";

import { saveAdminRsvpAction, type AdminActionState } from "@/src/app-actions/admin";
import { GuestRsvpFields, type RsvpFormProps } from "@/src/components/guest-rsvp-fields";
import { type Locale } from "@/src/lib/constants";

const initialState: AdminActionState = {};

type AdminRsvpFormProps = Omit<RsvpFormProps, "locale"> & {
  invitationId: string;
  locale: Locale;
};

export function AdminRsvpForm({ invitationId, ...rsvpProps }: AdminRsvpFormProps) {
  const [state, formAction, pending] = useActionState(saveAdminRsvpAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="invitationId" value={invitationId} />
      <GuestRsvpFields {...rsvpProps} state={state} pending={pending} />
    </form>
  );
}
