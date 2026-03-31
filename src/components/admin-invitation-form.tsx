"use client";

import { useActionState, useState } from "react";

import { saveInvitationAction, type AdminActionState } from "@/src/app-actions/admin";
import {
  buttonClassName,
  Field,
  inputClassName,
  textAreaClassName,
} from "@/src/components/ui";

const initialState: AdminActionState = {};

type InvitationFormValues = {
  id?: string;
  externalId?: string | null;
  primaryEmail: string;
  invitationMode: "individual" | "household";
  locale: "en" | "de";
  namedGuestsText: string;
  event1Invited: boolean;
  event2Invited: boolean;
  event2PlusOneAllowed: boolean;
  event2ChildrenAllowed: boolean;
  event2MaxChildren: number;
};

export function AdminInvitationForm({
  initial,
}: {
  initial?: InvitationFormValues;
}) {
  const [state, formAction, pending] = useActionState(saveInvitationAction, initialState);
  const [event2Invited, setEvent2Invited] = useState(initial?.event2Invited ?? false);

  return (
    <form action={formAction} className="space-y-5">
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <Field label="External ID">
        <input
          type="text"
          name="externalId"
          className={inputClassName()}
          defaultValue={initial?.externalId ?? ""}
          placeholder="optional-import-key"
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Primary email">
          <input
            type="email"
            name="primaryEmail"
            className={inputClassName()}
            defaultValue={initial?.primaryEmail ?? ""}
            required
          />
        </Field>
        <Field label="Locale">
          <select
            name="locale"
            className={inputClassName()}
            defaultValue={initial?.locale ?? "en"}
          >
            <option value="en">English</option>
            <option value="de">German</option>
          </select>
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Invitation mode">
          <select
            name="invitationMode"
            className={inputClassName()}
            defaultValue={initial?.invitationMode ?? "individual"}
          >
            <option value="individual">Individual</option>
            <option value="household">Household</option>
          </select>
        </Field>
        <Field label="Max children for Event Two">
          <input
            type="number"
            name="event2MaxChildren"
            min={0}
            max={8}
            className={inputClassName()}
            defaultValue={initial?.event2MaxChildren ?? 0}
          />
        </Field>
      </div>
      <Field
        label="Named guests"
        hint="One guest per line: Name | email | adult|child | primary. Example: Alex Smith | alex@example.com | adult | primary"
      >
        <textarea
          name="namedGuests"
          className={textAreaClassName()}
          defaultValue={initial?.namedGuestsText ?? ""}
          required
        />
      </Field>
      <div className="grid gap-3 rounded-[24px] bg-[#faf4ee] p-4 text-sm text-[#3b2d24]">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="event1Invited" defaultChecked={initial?.event1Invited ?? false} />
          Invite to Event One
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="event2Invited"
            checked={event2Invited}
            onChange={(e) => setEvent2Invited(e.target.checked)}
          />
          Invite to Event Two
        </label>
        <label className={`flex items-center gap-3 ${!event2Invited ? "opacity-40" : ""}`}>
          <input
            type="checkbox"
            name="event2PlusOneAllowed"
            defaultChecked={initial?.event2PlusOneAllowed ?? false}
            disabled={!event2Invited}
          />
          Event Two: plus one allowed
        </label>
        <label className={`flex items-center gap-3 ${!event2Invited ? "opacity-40" : ""}`}>
          <input
            type="checkbox"
            name="event2ChildrenAllowed"
            defaultChecked={initial?.event2ChildrenAllowed ?? false}
            disabled={!event2Invited}
          />
          Event Two: children allowed
        </label>
      </div>
      {state.error ? (
        <p className="rounded-2xl bg-[#f7dfd9] px-4 py-3 text-sm text-[#8a3f34]">
          {state.error}
        </p>
      ) : null}
      <button type="submit" className={buttonClassName()} disabled={pending}>
        {pending ? "Saving..." : "Save invitation"}
      </button>
    </form>
  );
}

export type { InvitationFormValues };
