import { useState, useMemo } from "react";

import {
  buttonClassName,
  Field,
  inputClassName,
  PaperPanel,
  Eyebrow,
} from "@/src/components/ui";
import { getDictionary } from "@/src/lib/i18n";
import { defaultLocale, maxHouseholdMembers } from "@/src/lib/constants";

/**
 * Isolated harness replicating the RegistrationForm UI without the
 * Next.js server action dependency (useActionState / registerGuestAction).
 * The real component cannot be mounted in Playwright CT because the action
 * imports next/headers, next/navigation, and Node crypto.
 *
 * The dietary / kind StyledSelect (Radix) dropdowns are replaced with plain
 * <select> elements because Radix throws when a SelectItem receives value=""
 * in the Vite CT environment. The gate/reveal and roster add-remove logic —
 * the things these tests actually cover — is identical to the real component.
 */

type DietaryRequirements = "" | "meat" | "vegetarian";

type RosterEntry = {
  fullName: string;
  kind: "adult" | "child";
  dietaryRequirements: DietaryRequirements;
};

function createPrimary(): RosterEntry {
  return { fullName: "", kind: "adult", dietaryRequirements: "" };
}

function createAdditional(): RosterEntry {
  return { fullName: "", kind: "adult", dietaryRequirements: "" };
}

export function RegistrationFormHarness({
  initialCode,
}: {
  initialCode?: string;
} = {}) {
  const dictionary = getDictionary(defaultLocale);
  const [codeRevealed, setCodeRevealed] = useState(Boolean(initialCode));
  const [codeValue, setCodeValue] = useState(initialCode ?? "");

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
      <div className="space-y-6">
        <PaperPanel className="space-y-4">
          <p className="text-sm leading-6 text-ink-light sm:text-base sm:leading-7">
            {dictionary.landing.codePrompt}
          </p>
          <Field label={dictionary.register.codeLabel}>
            <input
              type="text"
              autoComplete="off"
              className={inputClassName()}
              value={codeValue}
              onChange={(event) => setCodeValue(event.target.value)}
            />
          </Field>
          <button
            type="button"
            className={buttonClassName()}
            onClick={() => setCodeRevealed(true)}
          >
            {dictionary.register.codeSubmit}
          </button>
        </PaperPanel>
      </div>
    );
  }

  return (
    <form className="space-y-6">
      <input type="hidden" name="code" value={codeValue} />
      <input type="hidden" name="payload" value={payload} />

      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.primarySectionTitle}</Eyebrow>
        <Field label={dictionary.register.yourNameLabel}>
          <input
            type="text"
            className={inputClassName()}
            value={roster[0].fullName}
            onChange={(event) =>
              updateRoster(0, { fullName: event.target.value })
            }
          />
        </Field>
        <Field label={dictionary.register.yourEmailLabel}>
          <input
            type="email"
            autoComplete="email"
            className={inputClassName()}
            value={primaryEmail}
            onChange={(event) => setPrimaryEmail(event.target.value)}
          />
        </Field>
        <Field
          label={dictionary.register.phoneLabel}
          hint={dictionary.register.phoneHint}
        >
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={inputClassName()}
            value={contactPhone}
            onChange={(event) => setContactPhone(event.target.value)}
          />
        </Field>
        <Field label={dictionary.register.dietaryLabel}>
          <select
            value={roster[0].dietaryRequirements}
            onChange={(event) =>
              updateRoster(0, {
                dietaryRequirements: event.target.value as DietaryRequirements,
              })
            }
          >
            <option value="">{dictionary.register.dietaryNone}</option>
            <option value="meat">{dictionary.register.dietaryMeat}</option>
            <option value="vegetarian">
              {dictionary.register.dietaryVegetarian}
            </option>
          </select>
        </Field>
      </PaperPanel>

      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.additionalSectionTitle}</Eyebrow>
        {roster.slice(1).map((entry, i) => {
          const index = i + 1;
          return (
            <div key={index} className="space-y-3 border-t pt-3">
              <Field label={dictionary.register.yourNameLabel}>
                <input
                  type="text"
                  className={inputClassName()}
                  value={entry.fullName}
                  onChange={(event) =>
                    updateRoster(index, { fullName: event.target.value })
                  }
                />
              </Field>
              <Field
                label={
                  dictionary.register.adult + " / " + dictionary.register.child
                }
              >
                <select
                  value={entry.kind}
                  onChange={(event) =>
                    updateRoster(index, {
                      kind: event.target.value as "adult" | "child",
                    })
                  }
                >
                  <option value="adult">{dictionary.register.adult}</option>
                  <option value="child">{dictionary.register.child}</option>
                </select>
              </Field>
              <Field label={dictionary.register.dietaryLabel}>
                <select
                  value={entry.dietaryRequirements}
                  onChange={(event) =>
                    updateRoster(index, {
                      dietaryRequirements:
                        event.target.value as DietaryRequirements,
                    })
                  }
                >
                  <option value="">{dictionary.register.dietaryNone}</option>
                  <option value="meat">{dictionary.register.dietaryMeat}</option>
                  <option value="vegetarian">
                    {dictionary.register.dietaryVegetarian}
                  </option>
                </select>
              </Field>
              <button
                type="button"
                className="text-sm underline"
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
            className={buttonClassName()}
            onClick={addPerson}
          >
            {dictionary.register.addPerson}
          </button>
        ) : null}
      </PaperPanel>

      <button type="submit" className={buttonClassName()}>
        {dictionary.register.submit}
      </button>
    </form>
  );
}
