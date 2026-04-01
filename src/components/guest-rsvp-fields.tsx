"use client";

import { useContext, useState } from "react";

import { LocaleContext } from "@/src/components/locale-context";
import {
  inkButtonClassName,
  Field,
  PaperPanel,
  inputClassName,
  textAreaClassName,
} from "@/src/components/ui";
import { type InviteeKind, type InvitationMode, type Locale } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";

type InviteeState = {
  inviteeId: string;
  fullName: string;
  kind: InviteeKind;
  isPrimary: boolean;
  attending: boolean;
  dietaryRequirements: string;
  phoneNumber: string;
};

type RsvpFormProps = {
  locale?: Locale;
  invitationMode: InvitationMode;
  invitees: InviteeState[];
};

type GuestRsvpFieldsProps = RsvpFormProps & {
  state?: {
    error?: string;
    success?: string;
  };
  pending?: boolean;
};

export function GuestRsvpFields({
  locale,
  invitationMode,
  invitees: initialInvitees,
  state,
  pending = false,
}: GuestRsvpFieldsProps) {
  const localeContext = useContext(LocaleContext);
  const resolvedLocale = localeContext?.locale ?? locale;

  if (!resolvedLocale) {
    throw new Error(
      "GuestRsvpFields requires a locale prop when rendered outside LocaleProvider.",
    );
  }

  const dictionary = getDictionary(resolvedLocale);
  const [invitees, setInvitees] = useState(initialInvitees);

  const payload = JSON.stringify({
    invitees,
  });

  return (
    <>
      <input type="hidden" name="payload" value={payload} />

      {invitees.map((invitee, index) => (
        <PaperPanel key={invitee.inviteeId} className="space-y-4 bg-cream">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl text-ink">{invitee.fullName}</h3>
              <p className="text-sm text-sage-muted">
                {invitee.isPrimary
                  ? dictionary.guest.primaryGuest
                  : invitee.kind === "adult"
                    ? dictionary.guest.householdMember
                    : dictionary.guest.child}
              </p>
            </div>
            <Field label={dictionary.guest.status}>
              <select
                className={inputClassName()}
                value={invitee.attending ? "yes" : "no"}
                onChange={(event) => {
                  const nextAttending = event.target.value === "yes";
                  setInvitees((current) =>
                    current.map((entry, currentIndex) =>
                      currentIndex === index
                        ? { ...entry, attending: nextAttending }
                        : entry,
                    ),
                  );
                }}
              >
                <option value="yes">{dictionary.guest.attending}</option>
                <option value="no">{dictionary.guest.notAttending}</option>
              </select>
            </Field>
          </div>

          {invitationMode === "household" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={dictionary.guest.fullName}>
                <input
                  className={inputClassName()}
                  value={invitee.fullName}
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

              <Field label={dictionary.guest.personType}>
                <select
                  className={inputClassName()}
                  value={invitee.kind}
                  disabled={invitee.isPrimary}
                  onChange={(event) => {
                    const kind = event.target.value as InviteeKind;
                    setInvitees((current) =>
                      current.map((entry, currentIndex) =>
                        currentIndex === index
                          ? {
                              ...entry,
                              kind,
                              phoneNumber: kind === "child" ? "" : entry.phoneNumber,
                            }
                          : entry,
                      ),
                    );
                  }}
                >
                  <option value="adult">{dictionary.guest.adult}</option>
                  <option value="child">{dictionary.guest.child}</option>
                </select>
              </Field>
            </div>
          ) : null}

          {invitee.attending ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={dictionary.guest.dietaryRequirements}>
                <textarea
                  className={textAreaClassName()}
                  value={invitee.dietaryRequirements}
                  onChange={(event) => {
                    const dietaryRequirements = event.target.value;
                    setInvitees((current) =>
                      current.map((entry, currentIndex) =>
                        currentIndex === index
                          ? { ...entry, dietaryRequirements }
                          : entry,
                      ),
                    );
                  }}
                />
              </Field>
              {invitee.kind === "adult" ? (
                <Field label={dictionary.guest.phoneNumber}>
                  <input
                    className={inputClassName()}
                    value={invitee.phoneNumber}
                    onChange={(event) => {
                      const phoneNumber = event.target.value;
                      setInvitees((current) =>
                        current.map((entry, currentIndex) =>
                          currentIndex === index
                            ? { ...entry, phoneNumber }
                            : entry,
                        ),
                      );
                    }}
                  />
                </Field>
              ) : null}
            </div>
          ) : null}
        </PaperPanel>
      ))}

      {state?.error ? (
        <p className="rounded-xl bg-error-bg px-4 py-3 text-sm text-error-text">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="rounded-xl bg-success-bg px-4 py-3 text-sm text-success-text">
          {state.success}
        </p>
      ) : null}

      <button type="submit" className={inkButtonClassName()} disabled={pending}>
        {pending ? `${dictionary.guest.saveRsvp}...` : dictionary.guest.saveRsvp}
      </button>
    </>
  );
}

export type { GuestRsvpFieldsProps, InviteeState, RsvpFormProps };
