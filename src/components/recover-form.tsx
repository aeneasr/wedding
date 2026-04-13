"use client";

import { useActionState } from "react";

import { submitRecoveryAction, type GuestActionState } from "@/src/app-actions/guest";
import { inkButtonClassName, Field, inputClassName } from "@/src/components/ui";

const initialState: GuestActionState = {};

export function RecoverForm({
  label,
  submitLabel,
}: {
  label: string;
  submitLabel: string;
}) {
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
        <p className="rounded-xl bg-error-bg px-4 py-3 text-sm text-error-text">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-xl bg-success-bg px-4 py-3 text-sm text-success-text">
          {state.success}
        </p>
      ) : null}
      <button type="submit" className={inkButtonClassName()} disabled={pending}>
        {pending ? `${submitLabel}...` : submitLabel}
      </button>
    </form>
  );
}
