"use client";

import { useContext, useState } from "react";

import { LocaleContext } from "@/src/components/locale-context";
import {
  buttonClassName,
  Field,
  SurfaceCard,
  inputClassName,
  textAreaClassName,
} from "@/src/components/ui";
import { type EventKey, type InviteeKind, type Locale } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";

type InviteeState = {
  inviteeId: string;
  fullName: string;
  kind: InviteeKind;
  attending: boolean;
  dietaryRequirements: string;
  phoneNumber: string;
};

type PlusOneState = {
  attending: boolean;
  fullName: string;
  dietaryRequirements: string;
  phoneNumber: string;
};

type ChildState = {
  fullName: string;
  dietaryRequirements: string;
};

type RsvpFormProps = {
  locale?: Locale;
  eventKey: EventKey;
  invitees: InviteeState[];
  plusOneAllowed: boolean;
  childrenAllowed: boolean;
  maxChildren: number;
  initialPlusOne?: PlusOneState | null;
  initialChildren?: ChildState[];
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
  eventKey,
  invitees: initialInvitees,
  plusOneAllowed,
  childrenAllowed,
  maxChildren,
  initialPlusOne,
  initialChildren = [],
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
  const [plusOne, setPlusOne] = useState<PlusOneState>(
    initialPlusOne ?? {
      attending: false,
      fullName: "",
      dietaryRequirements: "",
      phoneNumber: "",
    },
  );
  const [childCount, setChildCount] = useState(initialChildren.length);
  const [children, setChildren] = useState<ChildState[]>(
    initialChildren.length > 0 ? initialChildren : [],
  );

  function resizeChildren(nextCount: number) {
    setChildCount(nextCount);
    setChildren((current) => {
      if (nextCount <= current.length) {
        return current.slice(0, nextCount);
      }

      return [
        ...current,
        ...Array.from({ length: nextCount - current.length }, () => ({
          fullName: "",
          dietaryRequirements: "",
        })),
      ];
    });
  }

  const payload = JSON.stringify({
    eventKey,
    invitees,
    plusOne: plusOneAllowed ? plusOne : null,
    children: childrenAllowed ? children.slice(0, childCount) : [],
  });

  return (
    <>
      <input type="hidden" name="eventKey" value={eventKey} />
      <input type="hidden" name="payload" value={payload} />

      {invitees.map((invitee, index) => (
        <SurfaceCard key={invitee.inviteeId} className="space-y-4 bg-[#fffaf6]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl text-[#2f241c]">{invitee.fullName}</h3>
              <p className="text-sm text-[#705d50]">
                {invitee.kind === "adult"
                  ? dictionary.guest.invitedPerson
                  : dictionary.guest.children}
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
                        ? {
                            ...entry,
                            attending: nextAttending,
                          }
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
        </SurfaceCard>
      ))}

      {plusOneAllowed ? (
        <SurfaceCard className="space-y-4 bg-[#fffaf6]">
          <h3 className="font-serif text-2xl text-[#2f241c]">{dictionary.guest.plusOne}</h3>
          <Field label={dictionary.guest.bringPlusOne}>
            <select
              className={inputClassName()}
              value={plusOne.attending ? "yes" : "no"}
              onChange={(event) => {
                setPlusOne((current) => ({
                  ...current,
                  attending: event.target.value === "yes",
                }));
              }}
            >
              <option value="no">{dictionary.guest.no}</option>
              <option value="yes">{dictionary.guest.yes}</option>
            </select>
          </Field>
          {plusOne.attending ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={dictionary.guest.plusOneName}>
                <input
                  className={inputClassName()}
                  value={plusOne.fullName}
                  onChange={(event) => {
                    const fullName = event.target.value;
                    setPlusOne((current) => ({ ...current, fullName }));
                  }}
                />
              </Field>
              <Field label={dictionary.guest.phoneNumber}>
                <input
                  className={inputClassName()}
                  value={plusOne.phoneNumber}
                  onChange={(event) => {
                    const phoneNumber = event.target.value;
                    setPlusOne((current) => ({ ...current, phoneNumber }));
                  }}
                />
              </Field>
              <Field label={dictionary.guest.dietaryRequirements}>
                <textarea
                  className={textAreaClassName()}
                  value={plusOne.dietaryRequirements}
                  onChange={(event) => {
                    const dietaryRequirements = event.target.value;
                    setPlusOne((current) => ({ ...current, dietaryRequirements }));
                  }}
                />
              </Field>
            </div>
          ) : null}
        </SurfaceCard>
      ) : null}

      {childrenAllowed ? (
        <SurfaceCard className="space-y-4 bg-[#fffaf6]">
          <h3 className="font-serif text-2xl text-[#2f241c]">{dictionary.guest.children}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={dictionary.guest.bringChildren}>
              <select
                className={inputClassName()}
                value={childCount > 0 ? "yes" : "no"}
                onChange={(event) => {
                  if (event.target.value === "no") {
                    resizeChildren(0);
                    return;
                  }

                  resizeChildren(childCount === 0 ? 1 : childCount);
                }}
              >
                <option value="no">{dictionary.guest.no}</option>
                <option value="yes">{dictionary.guest.yes}</option>
              </select>
            </Field>
            <Field label={dictionary.guest.childrenCount}>
              <select
                className={inputClassName()}
                value={String(childCount)}
                onChange={(event) => resizeChildren(Number(event.target.value))}
                disabled={childCount === 0}
              >
                <option value="0">0</option>
                {Array.from({ length: maxChildren }, (_, index) => index + 1).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          {childCount > 0 ? (
            <div className="grid gap-4">
              {children.map((child, index) => (
                <div key={`child-${index}`} className="grid gap-4 rounded-[22px] bg-[#faf4ee] p-4 sm:grid-cols-2">
                  <Field label={`${dictionary.guest.childName} ${index + 1}`}>
                    <input
                      className={inputClassName()}
                      value={child.fullName}
                      onChange={(event) => {
                        const fullName = event.target.value;
                        setChildren((current) =>
                          current.map((entry, currentIndex) =>
                            currentIndex === index ? { ...entry, fullName } : entry,
                          ),
                        );
                      }}
                    />
                  </Field>
                  <Field label={dictionary.guest.dietaryRequirements}>
                    <textarea
                      className={textAreaClassName()}
                      value={child.dietaryRequirements}
                      onChange={(event) => {
                        const dietaryRequirements = event.target.value;
                        setChildren((current) =>
                          current.map((entry, currentIndex) =>
                            currentIndex === index
                              ? { ...entry, dietaryRequirements }
                              : entry,
                          ),
                        );
                      }}
                    />
                  </Field>
                </div>
              ))}
            </div>
          ) : null}
        </SurfaceCard>
      ) : null}

      {state?.error ? (
        <p className="rounded-2xl bg-[#f7dfd9] px-4 py-3 text-sm text-[#8a3f34]">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="rounded-2xl bg-[#e0ecde] px-4 py-3 text-sm text-[#355b39]">
          {state.success}
        </p>
      ) : null}

      <button type="submit" className={buttonClassName()} disabled={pending}>
        {pending ? `${dictionary.guest.saveRsvp}...` : dictionary.guest.saveRsvp}
      </button>
    </>
  );
}

export type {
  ChildState,
  GuestRsvpFieldsProps,
  InviteeState,
  PlusOneState,
  RsvpFormProps,
};
