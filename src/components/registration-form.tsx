"use client";

import { useActionState, useMemo, useState } from "react";

import {
  registerGuestAction,
  type RegisterActionState,
} from "@/src/app-actions/guest";
import {
  buttonClassName,
  Field,
  inputClassName,
  PaperPanel,
  Eyebrow,
} from "@/src/components/ui";
import { StyledSelect, StyledSelectItem } from "@/src/components/styled-select";
import { getDictionary } from "@/src/lib/i18n";
import { defaultLocale, maxHouseholdMembers } from "@/src/lib/constants";

const initialState: RegisterActionState = {};

type RosterEntry = {
  fullName: string;
  kind: "adult" | "child";
  dietaryRequirements: "" | "meat" | "vegetarian";
};

function createPrimary(): RosterEntry {
  return { fullName: "", kind: "adult", dietaryRequirements: "" };
}

function createAdditional(): RosterEntry {
  return { fullName: "", kind: "adult", dietaryRequirements: "" };
}

export function RegistrationForm() {
  const dictionary = getDictionary(defaultLocale);
  const [state, formAction, pending] = useActionState(
    registerGuestAction,
    initialState,
  );
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  const [primaryEmail, setPrimaryEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [roster, setRoster] = useState<RosterEntry[]>([createPrimary()]);

  const payload = useMemo(
    () =>
      JSON.stringify({
        primaryEmail,
        contactPhone,
        roster,
      }),
    [primaryEmail, contactPhone, roster],
  );

  const fieldError = (key: string) => state.fieldErrors?.[key]?.[0];

  function updateRoster(index: number, patch: Partial<RosterEntry>) {
    setRoster((current) =>
      current.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
    );
  }

  function addPerson() {
    if (roster.length >= maxHouseholdMembers) return;
    setRoster((current) => [...current, createAdditional()]);
  }

  function removePerson(index: number) {
    if (index === 0) return;
    setRoster((current) => current.filter((_, i) => i !== index));
  }

  if (!codeRevealed) {
    return (
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setCodeRevealed(true);
        }}
      >
        <div className="space-y-4">
          <Field label={dictionary.register.codeLabel}>
            <input
              type="text"
              autoComplete="off"
              className={inputClassName()}
              value={codeValue}
              onChange={(event) => setCodeValue(event.target.value)}
            />
          </Field>
          <button type="submit" className={`${buttonClassName()} w-full`}>
            {dictionary.register.codeSubmit}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="code" value={codeValue} />
      <input type="hidden" name="payload" value={payload} />

      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.primarySectionTitle}</Eyebrow>
        <Field
          label={dictionary.register.yourNameLabel}
          error={fieldError("roster.0.fullName")}
        >
          <input
            type="text"
            className={inputClassName({ error: Boolean(fieldError("roster.0.fullName")) })}
            value={roster[0].fullName}
            onChange={(event) =>
              updateRoster(0, { fullName: event.target.value })
            }
          />
        </Field>
        <Field
          label={dictionary.register.yourEmailLabel}
          error={fieldError("primaryEmail")}
        >
          <input
            type="email"
            autoComplete="email"
            className={inputClassName({ error: Boolean(fieldError("primaryEmail")) })}
            value={primaryEmail}
            onChange={(event) => setPrimaryEmail(event.target.value)}
          />
        </Field>
        <Field
          label={dictionary.register.phoneLabel}
          hint={dictionary.register.phoneHint}
          error={fieldError("contactPhone")}
        >
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClassName({ error: Boolean(fieldError("contactPhone")) })}
            value={contactPhone}
            onChange={(event) => setContactPhone(event.target.value)}
          />
        </Field>
        <Field
          label={dictionary.register.dietaryLabel}
          error={fieldError("roster.0.dietaryRequirements")}
        >
          <StyledSelect
            value={roster[0].dietaryRequirements}
            onValueChange={(value) =>
              updateRoster(0, {
                dietaryRequirements: value as RosterEntry["dietaryRequirements"],
              })
            }
            placeholder={dictionary.register.dietaryNone}
          >
            <StyledSelectItem value="meat">
              {dictionary.register.dietaryMeat}
            </StyledSelectItem>
            <StyledSelectItem value="vegetarian">
              {dictionary.register.dietaryVegetarian}
            </StyledSelectItem>
          </StyledSelect>
        </Field>
      </PaperPanel>

      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.additionalSectionTitle}</Eyebrow>
        {roster.slice(1).map((entry, i) => {
          const index = i + 1;
          return (
            <div key={index} className="space-y-3 border-t pt-3">
              <Field
                label={dictionary.register.yourNameLabel}
                error={fieldError(`roster.${index}.fullName`)}
              >
                <input
                  type="text"
                  className={inputClassName({ error: Boolean(fieldError(`roster.${index}.fullName`)) })}
                  value={entry.fullName}
                  onChange={(event) =>
                    updateRoster(index, { fullName: event.target.value })
                  }
                />
              </Field>
              <Field label={dictionary.register.adult + " / " + dictionary.register.child}>
                <StyledSelect
                  value={entry.kind}
                  onValueChange={(value) =>
                    updateRoster(index, { kind: value as "adult" | "child" })
                  }
                >
                  <StyledSelectItem value="adult">
                    {dictionary.register.adult}
                  </StyledSelectItem>
                  <StyledSelectItem value="child">
                    {dictionary.register.child}
                  </StyledSelectItem>
                </StyledSelect>
              </Field>
              <Field
                label={dictionary.register.dietaryLabel}
                error={fieldError(`roster.${index}.dietaryRequirements`)}
              >
                <StyledSelect
                  value={entry.dietaryRequirements}
                  onValueChange={(value) =>
                    updateRoster(index, {
                      dietaryRequirements: value as RosterEntry["dietaryRequirements"],
                    })
                  }
                  placeholder={dictionary.register.dietaryNone}
                >
                  <StyledSelectItem value="meat">
                    {dictionary.register.dietaryMeat}
                  </StyledSelectItem>
                  <StyledSelectItem value="vegetarian">
                    {dictionary.register.dietaryVegetarian}
                  </StyledSelectItem>
                </StyledSelect>
              </Field>
              <button
                type="button"
                className="min-h-[44px] px-1 text-sm underline"
                onClick={() => removePerson(index)}
              >
                {dictionary.register.removePerson}
              </button>
            </div>
          );
        })}
        {roster.length < maxHouseholdMembers ? (
          <button
            type="button"
            className={`${buttonClassName()} w-full`}
            onClick={addPerson}
          >
            {dictionary.register.addPerson}
          </button>
        ) : null}
      </PaperPanel>

      {state.error ? (
        <p className="rounded-xl bg-error-bg px-4 py-3 text-sm text-error-text" role="alert">
          {state.error}
        </p>
      ) : null}

      <button type="submit" className={`${buttonClassName()} w-full`} disabled={pending}>
        {dictionary.register.submit}
      </button>
    </form>
  );
}
