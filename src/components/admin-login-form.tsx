"use client";

import { useActionState } from "react";

import { loginAdminAction, type AdminActionState } from "@/src/app-actions/admin";
import { buttonClassName, Field, inputClassName } from "@/src/components/ui";

const initialState: AdminActionState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdminAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Gemeinsames Passwort">
        <input
          type="password"
          name="password"
          className={inputClassName()}
          autoComplete="current-password"
          required
        />
      </Field>
      {state.error ? (
        <p className="rounded-xl bg-error-bg px-4 py-3 text-sm text-error-text">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className={buttonClassName()} disabled={pending}>
        {pending ? "Prüfen …" : "Dashboard öffnen"}
      </button>
    </form>
  );
}
