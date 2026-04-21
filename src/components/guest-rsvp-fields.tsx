"use client";

import { useContext, useState } from "react";

import { LocaleContext } from "@/src/components/locale-context";
import { StyledSelect, StyledSelectItem } from "@/src/components/styled-select";
import {
  inkButtonClassName,
  inputClassName,
  Field,
  PaperPanel,
  Eyebrow,
} from "@/src/components/ui";
import { cn } from "@/src/lib/utils";
import { type InviteeKind, type InvitationMode, type Locale } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";

type InviteeState = {
  inviteeId: string;
  fullName: string;
  kind: InviteeKind;
  isPrimary: boolean;
  attending: boolean;
  dietaryRequirements: string;
};

type RsvpFormProps = {
  locale?: Locale;
  invitationMode: InvitationMode;
  invitees: InviteeState[];
  contactPhone?: string | null;
};

type GuestRsvpFieldsProps = RsvpFormProps & {
  state?: {
    error?: string;
    success?: string;
    fieldErrors?: Record<string, string[]>;
  };
  pending?: boolean;
};

const VALID_MEAL_VALUES = ["meat", "vegetarian"] as const;

function sanitizeMeal(value: string): string {
  return (VALID_MEAL_VALUES as readonly string[]).includes(value) ? value : "";
}

export function GuestRsvpFields({
  locale,
  invitationMode,
  invitees: initialInvitees,
  contactPhone: initialContactPhone,
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

  const [invitees, setInvitees] = useState(() =>
    initialInvitees.map((invitee) => ({
      ...invitee,
      dietaryRequirements: sanitizeMeal(invitee.dietaryRequirements),
    })),
  );

  const [contactPhone, setContactPhone] = useState(initialContactPhone ?? "");

  const fieldError = (path: string) => state?.fieldErrors?.[path]?.[0];

  const payload = JSON.stringify({ invitees, contactPhone });

  const toggleAttendance = (index: number) => {
    setInvitees((current) =>
      current.map((entry, i) =>
        i === index ? { ...entry, attending: !entry.attending } : entry,
      ),
    );
  };

  const updateFullName = (index: number, fullName: string) => {
    setInvitees((current) =>
      current.map((entry, i) => (i === index ? { ...entry, fullName } : entry)),
    );
  };

  const attendingInvitees = invitees.filter((inv) => inv.attending);

  return (
    <>
      <input type="hidden" name="payload" value={payload} />

      <PaperPanel className="space-y-5">
        <Field
          label={dictionary.guest.contactPhoneLabel}
          hint={dictionary.guest.contactPhoneHint}
        >
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className={inputClassName()}
            autoComplete="tel"
          />
        </Field>

        {/* Attendance checklist */}
        <div className="space-y-1">
          <Eyebrow>{dictionary.guest.status}</Eyebrow>
        </div>

        <div className="space-y-3">
          {invitees.map((invitee, index) => {
            const rowId = `attendance-${invitee.inviteeId}`;
            const nameErrorMessage = fieldError(`invitees.${index}.fullName`);
            const nameLabel =
              invitee.kind === "child"
                ? `${dictionary.guest.fullName} (${dictionary.guest.child})`
                : dictionary.guest.fullName;
            return (
              <div
                key={invitee.inviteeId}
                className={cn(
                  "space-y-3 rounded-xl border p-4 transition",
                  invitee.attending
                    ? "border-sage bg-sage-light"
                    : "border-border bg-paper",
                )}
              >
                <Field label={nameLabel} error={nameErrorMessage}>
                  <input
                    type="text"
                    value={invitee.fullName}
                    onChange={(event) => updateFullName(index, event.target.value)}
                    className={inputClassName({ error: Boolean(nameErrorMessage) })}
                    aria-invalid={nameErrorMessage ? true : undefined}
                    autoComplete="name"
                  />
                </Field>

                <input
                  type="checkbox"
                  id={rowId}
                  aria-label={invitee.fullName}
                  className="sr-only"
                  checked={invitee.attending}
                  onChange={() => toggleAttendance(index)}
                />
                <label
                  htmlFor={rowId}
                  className="flex cursor-pointer select-none items-center gap-3"
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition",
                      invitee.attending
                        ? "border-sage bg-sage text-paper"
                        : "border-border-sage",
                    )}
                    aria-hidden="true"
                  >
                    {invitee.attending && (
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </span>

                  <span
                    className={cn(
                      "text-sm font-medium",
                      invitee.attending ? "text-forest" : "text-sage-muted",
                    )}
                  >
                    {invitee.attending
                      ? dictionary.guest.attending
                      : dictionary.guest.notAttending}
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        {/* Detail fields for attending guests */}
        {attendingInvitees.length > 0 ? (
          <>
            <hr className="border-border" />
            <p className="text-sm font-medium text-ink">
              {dictionary.guest.attendingGuestDetails}
            </p>
            <div className="space-y-5">
              {invitees.map((invitee, index) => {
                if (!invitee.attending) return null;

                const mealTriggerId = `meal-${invitee.inviteeId}`;
                const hasMealError = !!fieldError(`invitees.${index}.dietaryRequirements`);

                return (
                  <div key={invitee.inviteeId} className="space-y-4">
                    <h3 className="font-serif text-xl text-ink">
                      {invitee.fullName}
                      {invitee.kind === "child" ? (
                        <span className="ml-1 text-base font-normal text-sage-muted">
                          ({dictionary.guest.child})
                        </span>
                      ) : null}
                    </h3>

                    <div className="space-y-4">
                      <Field
                        label={dictionary.guest.mealPreference}
                        error={fieldError(`invitees.${index}.dietaryRequirements`)}
                      >
                        <StyledSelect
                          id={mealTriggerId}
                          value={invitee.dietaryRequirements}
                          onValueChange={(dietaryRequirements) => {
                            setInvitees((current) =>
                              current.map((entry, i) =>
                                i === index ? { ...entry, dietaryRequirements } : entry,
                              ),
                            );
                          }}
                          placeholder={dictionary.guest.mealSelectPlaceholder}
                          aria-invalid={hasMealError ? true : undefined}
                          error={hasMealError}
                        >
                          <StyledSelectItem value="meat">
                            {dictionary.guest.mealMeat}
                          </StyledSelectItem>
                          <StyledSelectItem value="vegetarian">
                            {dictionary.guest.mealVegetarian}
                          </StyledSelectItem>
                        </StyledSelect>
                      </Field>

                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}

        {/* Error / success feedback */}
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

        {/* Primary CTA */}
        <button
          type="submit"
          className={cn(inkButtonClassName(), "w-full")}
          disabled={pending}
        >
          {pending ? `${dictionary.guest.saveRsvp}…` : dictionary.guest.saveRsvp}
        </button>
      </PaperPanel>
    </>
  );
}

export type { GuestRsvpFieldsProps, InviteeState, RsvpFormProps };
