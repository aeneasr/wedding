"use client";

import { useActionState } from "react";

import { loginAdminAction, type AdminActionState } from "@/src/app-actions/admin";
import { buttonClassName, Field, inputClassName } from "@/src/components/ui";

const initialState: AdminActionState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdminAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Shared password">
        <input
          type="password"
          name="password"
          className={inputClassName()}
          autoComplete="current-password"
          required
        />
      </Field>
      {state.error ? (
        <p className="rounded-2xl bg-[#f7dfd9] px-4 py-3 text-sm text-[#8a3f34]">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className={buttonClassName()} disabled={pending}>
        {pending ? "Checking..." : "Open dashboard"}
      </button>
    </form>
  );
}
