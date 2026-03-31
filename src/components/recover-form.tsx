"use client";

import { useActionState } from "react";

import { submitRecoveryAction, type GuestActionState } from "@/src/app-actions/guest";
import { buttonClassName, Field, inputClassName } from "@/src/components/ui";

const initialState: GuestActionState = {};

export function RecoverForm({ label }: { label: string }) {
  const [state, formAction, pending] = useActionState(
    submitRecoveryAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <Field label={label}>
        <input
          type="email"
          name="email"
          className={inputClassName()}
          autoComplete="email"
          required
        />
      </Field>
      {state.error ? (
        <p className="rounded-2xl bg-[#f7dfd9] px-4 py-3 text-sm text-[#8a3f34]">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-2xl bg-[#e0ecde] px-4 py-3 text-sm text-[#355b39]">
          {state.success}
        </p>
      ) : null}
      <button type="submit" className={buttonClassName()} disabled={pending}>
        {pending ? "Sending..." : "Send recovery email"}
      </button>
    </form>
  );
}
