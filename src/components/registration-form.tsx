"use client";

import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  registerGuestAction,
  type RegisterActionState,
  validateRegistrationCodeAction,
  type CodeGateActionState,
} from "@/src/app-actions/guest";
import { extractInvitationCodeFromUrl } from "@/src/lib/invitation-url";
import {
  buttonClassName,
  DataList,
  Eyebrow,
  Field,
  inputClassName,
  PaperPanel,
  SectionTitle,
} from "@/src/components/ui";
import { StyledSelect, StyledSelectItem } from "@/src/components/styled-select";
import type { Locale } from "@/src/lib/constants";
import { maxHouseholdMembers } from "@/src/lib/constants";
import {
  eventContent,
  formatEventDateBadge,
  localizeEventText,
} from "@/src/lib/events";
import { getDictionary } from "@/src/lib/i18n";
import { cn } from "@/src/lib/utils";

const initialState: RegisterActionState = {};
const initialCodeState: CodeGateActionState = { valid: false };

type RosterEntry = {
  fullName: string;
  kind: "adult" | "child";
  attending: boolean;
  dietaryRequirements: "" | "meat" | "vegetarian";
};

function createPrimary(): RosterEntry {
  return { fullName: "", kind: "adult", attending: true, dietaryRequirements: "" };
}

function createAdditional(): RosterEntry {
  return { fullName: "", kind: "adult", attending: true, dietaryRequirements: "" };
}

export function RegistrationForm({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const [state, formAction, pending] = useActionState(
    registerGuestAction,
    initialState,
  );
  const [codeState, codeFormAction, codePending] = useActionState(
    validateRegistrationCodeAction,
    initialCodeState,
  );
  const [codeValue, setCodeValue] = useState("");
  const urlCodeApplied = useRef(false);

  useEffect(() => {
    if (urlCodeApplied.current) return;
    urlCodeApplied.current = true;
    const urlCode = extractInvitationCodeFromUrl(window.location.href);
    if (!urlCode) return;
    // Deferred to post-mount so the client reads window.location without
    // triggering SSR hydration mismatches on the gate input's value.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCodeValue(urlCode);
    const formData = new FormData();
    formData.set("code", urlCode);
    startTransition(() => {
      codeFormAction(formData);
    });
  }, [codeFormAction]);

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

  function toggleAttendance(index: number) {
    setRoster((current) =>
      current.map((entry, i) =>
        i === index
          ? {
              ...entry,
              attending: !entry.attending,
              dietaryRequirements: entry.attending ? "" : entry.dietaryRequirements,
            }
          : entry,
      ),
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

  function renderAttendanceToggle(index: number, attending: boolean) {
    const toggleId = `registration-attending-${index}`;
    return (
      <div className="space-y-2">
        <Eyebrow>{dictionary.register.statusLabel}</Eyebrow>
        <div
          className={cn(
            "rounded-xl border p-3 transition",
            attending ? "border-sage bg-sage-light" : "border-border bg-paper",
          )}
        >
          <input
            type="checkbox"
            id={toggleId}
            className="sr-only"
            checked={attending}
            onChange={() => toggleAttendance(index)}
          />
          <label
            htmlFor={toggleId}
            className="flex cursor-pointer select-none items-center gap-3"
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition",
                attending
                  ? "border-sage bg-sage text-paper"
                  : "border-border-sage",
              )}
              aria-hidden="true"
            >
              {attending ? (
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
              ) : null}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                attending ? "text-forest" : "text-sage-muted",
              )}
            >
              {attending
                ? dictionary.register.attending
                : dictionary.register.notAttending}
            </span>
          </label>
        </div>
      </div>
    );
  }

  const recoverLink = (
    <div className="flex justify-center">
      <Link
        href="/recover"
        className="inline-flex text-sm font-medium tracking-wide text-sage-muted underline decoration-border underline-offset-4 transition hover:text-sage sm:text-base"
      >
        {dictionary.landing.makeChangesCta}
      </Link>
    </div>
  );

  if (!codeState.valid) {
    return (
      <form
        action={codeFormAction}
        className="mx-auto flex w-full max-w-[28rem] flex-col gap-6"
      >
        <div className="space-y-4">
          <Field
            label={dictionary.register.codeLabel}
            error={codeState.invalid ? dictionary.register.codeError : undefined}
          >
            <input
              type="text"
              name="code"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className={inputClassName({ error: Boolean(codeState.invalid) })}
              value={codeValue}
              onChange={(event) => setCodeValue(event.target.value)}
            />
          </Field>
          <button
            type="submit"
            className={`${buttonClassName()} w-full`}
            disabled={codePending}
          >
            {dictionary.register.codeSubmit}
          </button>
        </div>
        {recoverLink}
      </form>
    );
  }

  return (
    <form action={formAction} className="flex w-full flex-col gap-6">
      <input type="hidden" name="code" value={codeValue} />
      <input type="hidden" name="payload" value={payload} />

      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.guest.privateAccess}</Eyebrow>
        <DataList
          items={[
            {
              label: formatEventDateBadge(locale),
              value: localizeEventText(eventContent.name, locale),
            },
            {
              label: dictionary.guest.venue,
              value: localizeEventText(eventContent.venueName, locale),
            },
            {
              label: dictionary.guest.address,
              value: (
                <div className="flex flex-col gap-1">
                  {eventContent.addresses.map((entry) => (
                    <p key={entry.mapUrl}>
                      {localizeEventText(entry.label, locale)} (
                      <a
                        href={entry.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {dictionary.guest.mapLinkLabel}
                      </a>
                      )
                    </p>
                  ))}
                </div>
              ),
            },
            {
              label: dictionary.guest.timing,
              value: `${eventContent.startsAt} – ${eventContent.endsAt}`,
            },
          ]}
        />
      </PaperPanel>

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
        {renderAttendanceToggle(0, roster[0].attending)}
        {roster[0].attending ? (
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
        ) : null}
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
              {renderAttendanceToggle(index, entry.attending)}
              {entry.attending ? (
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
              ) : null}
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

      {recoverLink}

      <PaperPanel className="space-y-5">
        <SectionTitle title={dictionary.guest.schedule} />
        <div className="grid gap-3">
          {eventContent.schedule.map((item) => (
            <div
              key={item.time}
              className="grid gap-2 rounded-xl bg-cream p-4 sm:grid-cols-[120px_1fr]"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-sage">
                {item.time}
              </p>
              <div>
                <p className="font-medium text-ink">
                  {localizeEventText(item.title, locale)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-light">
                  {localizeEventText(item.note, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PaperPanel>

      <PaperPanel className="space-y-5">
        <SectionTitle title={dictionary.guest.logistics} />
        <div className="grid gap-3">
          {eventContent.logistics.map((item) => (
            <div
              key={localizeEventText(item.label, locale)}
              className="rounded-xl bg-cream p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-sage-muted">
                {localizeEventText(item.label, locale)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                {localizeEventText(item.value, locale)}
              </p>
            </div>
          ))}
        </div>
      </PaperPanel>
    </form>
  );
}
