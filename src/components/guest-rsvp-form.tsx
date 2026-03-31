"use client";

import { useActionState } from "react";

import { saveGuestRsvpAction, type GuestActionState } from "@/src/app-actions/guest";
import {
  GuestRsvpFields,
  type ChildState,
  type GuestRsvpFieldsProps,
  type InviteeState,
  type PlusOneState,
  type RsvpFormProps,
} from "@/src/components/guest-rsvp-fields";

const initialState: GuestActionState = {};

type GuestRsvpFormProps = RsvpFormProps;

export function GuestRsvpForm(props: GuestRsvpFormProps) {
  const [state, formAction, pending] = useActionState(saveGuestRsvpAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <GuestRsvpFields
        {...props}
        state={state}
        pending={pending}
      />
    </form>
  );
}

export type {
  ChildState,
  GuestRsvpFormProps,
  GuestRsvpFieldsProps,
  InviteeState,
  PlusOneState,
  RsvpFormProps,
};
