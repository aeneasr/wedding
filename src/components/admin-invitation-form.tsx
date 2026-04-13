"use client";

import { useActionState, useMemo, useState } from "react";

import { saveInvitationAction, type AdminActionState } from "@/src/app-actions/admin";
import { buttonClassName, Field, inputClassName } from "@/src/components/ui";
import { defaultLocale, maxAdditionalHouseholdMembers, type Locale } from "@/src/lib/constants";

const initialState: AdminActionState = {};

type InvitationInviteeFormValue = {
  fullName: string;
  email: string;
  kind: "adult" | "child";
  isPrimary: boolean;
};

type InvitationFormValues = {
  id?: string;
  externalId?: string | null;
  primaryEmail: string;
  invitationMode: "individual" | "household";
  locale: Locale;
  invitees: InvitationInviteeFormValue[];
};

function createPrimaryInvitee(): InvitationInviteeFormValue {
  return {
    fullName: "",
    email: "",
    kind: "adult",
    isPrimary: true,
  };
}

function createAdditionalInvitee(): InvitationInviteeFormValue {
  return {
    fullName: "",
    email: "",
    kind: "adult",
    isPrimary: false,
  };
}

export function AdminInvitationForm({
  initial,
}: {
  initial?: InvitationFormValues;
}) {
  const [state, formAction, pending] = useActionState(saveInvitationAction, initialState);
  const [invitationMode, setInvitationMode] = useState<"individual" | "household">(
    initial?.invitationMode ?? "individual",
  );
  const [invitees, setInvitees] = useState<InvitationInviteeFormValue[]>(
    initial?.invitees.length ? initial.invitees : [createPrimaryInvitee()],
  );

  function resizeInvitees(nextAdditionalCount: number) {
    setInvitees((current) => {
      const primaryInvitee = current[0] ?? createPrimaryInvitee();
      const additionalInvitees = current.slice(1);

      if (nextAdditionalCount <= additionalInvitees.length) {
        return [primaryInvitee, ...additionalInvitees.slice(0, nextAdditionalCount)];
      }

      return [
        primaryInvitee,
        ...additionalInvitees,
        ...Array.from(
          { length: nextAdditionalCount - additionalInvitees.length },
          () => createAdditionalInvitee(),
        ),
      ];
    });
  }

  const serializedInvitees = useMemo(() => {
    const normalizedInvitees =
      invitationMode === "individual"
        ? [invitees[0] ?? createPrimaryInvitee()]
        : invitees;

    return JSON.stringify(
      normalizedInvitees.map((invitee, index) => ({
        fullName: invitee.fullName,
        email: invitee.email,
        kind: index === 0 ? "adult" : invitee.kind,
        isPrimary: index === 0,
      })),
    );
  }, [invitationMode, invitees]);

  const additionalInviteeCount =
    invitationMode === "household" ? Math.max(0, invitees.length - 1) : 0;

  return (
    <form action={formAction} className="space-y-5">
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <input type="hidden" name="inviteesPayload" value={serializedInvitees} />

      <Field label="Externe ID">
        <input
          type="text"
          name="externalId"
          className={inputClassName()}
          defaultValue={initial?.externalId ?? ""}
          placeholder="optionaler-import-schlüssel"
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Haupt-E-Mail">
          <input
            type="email"
            name="primaryEmail"
            className={inputClassName()}
            defaultValue={initial?.primaryEmail ?? ""}
            required
          />
        </Field>
      </div>
      <input type="hidden" name="locale" value={defaultLocale} />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Einladungsmodus">
          <select
            name="invitationMode"
            className={inputClassName()}
            value={invitationMode}
            onChange={(event) => {
              const nextMode = event.target.value as "individual" | "household";
              setInvitationMode(nextMode);

              if (nextMode === "individual") {
                setInvitees((current) => [current[0] ?? createPrimaryInvitee()]);
              }
            }}
          >
            <option value="individual">Einzelperson</option>
            <option value="household">Haushalt</option>
          </select>
        </Field>

        {invitationMode === "household" ? (
          <Field label="Weitere Haushaltsmitglieder">
            <select
              className={inputClassName()}
              value={String(additionalInviteeCount)}
              onChange={(event) => resizeInvitees(Number(event.target.value))}
            >
              {Array.from(
                { length: maxAdditionalHouseholdMembers + 1 },
                (_, index) => index,
              ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
      </div>

      <div className="space-y-4">
        {invitees.map((invitee, index) => (
          <div key={`invitee-${index}`} className="rounded-xl bg-cream p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-muted">
                {index === 0 ? "Hauptperson" : `Haushaltsmitglied ${index}`}
              </p>
              <span className="text-sm text-ink-light">
                {index === 0 ? "Erwachsen" : invitee.kind === "adult" ? "Erwachsen" : "Kind"}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Vollständiger Name"
                hint={
                  index === 0
                    ? undefined
                    : "Leer lassen, wenn der Gast dies später selbst ausfüllen soll."
                }
              >
                <input
                  type="text"
                  className={inputClassName()}
                  value={invitee.fullName}
                  required={index === 0}
                  onChange={(event) => {
                    const fullName = event.target.value;
                    setInvitees((current) =>
                      current.map((entry, currentIndex) =>
                        currentIndex === index ? { ...entry, fullName } : entry,
                      ),
                    );
                  }}
                />
              </Field>

              <Field label={index === 0 ? "E-Mail" : "E-Mail (optional)"}>
                <input
                  type="email"
                  className={inputClassName()}
                  value={invitee.email}
                  onChange={(event) => {
                    const email = event.target.value;
                    setInvitees((current) =>
                      current.map((entry, currentIndex) =>
                        currentIndex === index ? { ...entry, email } : entry,
                      ),
                    );
                  }}
                />
              </Field>

              {index > 0 ? (
                <Field label="Personentyp">
                  <select
                    className={inputClassName()}
                    value={invitee.kind}
                    onChange={(event) => {
                      const kind = event.target.value as "adult" | "child";
                      setInvitees((current) =>
                        current.map((entry, currentIndex) =>
                          currentIndex === index ? { ...entry, kind } : entry,
                        ),
                      );
                    }}
                  >
                    <option value="adult">Erwachsen</option>
                    <option value="child">Kind</option>
                  </select>
                </Field>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {state.error ? (
        <p className="rounded-xl bg-error-bg px-4 py-3 text-sm text-error-text">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className={buttonClassName()} disabled={pending}>
        {pending ? "Speichern …" : "Einladung speichern"}
      </button>
    </form>
  );
}

export type { InvitationFormValues, InvitationInviteeFormValue };
