"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { saveGuestRsvpAction, type GuestActionState } from "@/src/app-actions/guest";
import {
  GuestRsvpFields,
  type ChildState,
  type InviteeState,
  type PlusOneState,
  type RsvpFormProps,
} from "@/src/components/guest-rsvp-fields";

const initialState: GuestActionState = {};

type GuestRsvpFormProps = RsvpFormProps;

export function GuestRsvpForm(props: GuestRsvpFormProps) {
  const [state, formAction, pending] = useActionState(saveGuestRsvpAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/guest?saved=1");
    }
  }, [state.success, router]);

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
  InviteeState,
  PlusOneState,
  RsvpFormProps,
};
