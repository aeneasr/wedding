"use client";

import { useActionState } from "react";

import {
  commitImportAction,
  previewImportAction,
  type ImportPreviewState,
} from "@/src/app-actions/admin";
import {
  buttonClassName,
  Field,
  Pill,
  SurfaceCard,
  inputClassName,
  textAreaClassName,
} from "@/src/components/ui";

const initialState: ImportPreviewState = {};

export function AdminImportForm() {
  const [state, formAction, pending] = useActionState(
    previewImportAction,
    initialState,
  );

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-5">
        <Field label="CSV file">
          <input type="file" name="csvFile" accept=".csv,text/csv" className={inputClassName()} />
        </Field>
        <Field label="Or paste CSV content">
          <textarea
            name="csvText"
            className={textAreaClassName()}
            placeholder="invitation_external_id,primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary,event_1_invited,event_2_invited,event_2_plus_one_allowed,event_2_children_allowed,event_2_max_children"
          />
        </Field>
        {state.error ? (
          <p className="rounded-2xl bg-[#f7dfd9] px-4 py-3 text-sm text-[#8a3f34]">
            {state.error}
          </p>
        ) : null}
        <button type="submit" className={buttonClassName()} disabled={pending}>
          {pending ? "Parsing..." : "Preview import"}
        </button>
      </form>

      {state.info ? (
        <p className="rounded-2xl bg-[#eee7df] px-4 py-3 text-sm text-[#5e4b3e]">
          {state.info}
        </p>
      ) : null}

      {state.errors && state.errors.length > 0 ? (
        <SurfaceCard className="space-y-3">
          <h3 className="font-serif text-2xl text-[#2f241c]">Validation issues</h3>
          <ul className="space-y-2 text-sm text-[#7b4e43]">
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </SurfaceCard>
      ) : null}

      {state.preview && state.preview.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl text-[#2f241c]">Preview</h3>
            <form action={commitImportAction}>
              <input type="hidden" name="previewPayload" value={state.previewPayload ?? ""} />
              <button type="submit" className={buttonClassName()}>
                Commit import
              </button>
            </form>
          </div>
          <div className="grid gap-4">
            {state.preview.map((group) => (
              <SurfaceCard key={group.externalId} className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Pill>{group.externalId}</Pill>
                  <Pill tone="muted">{group.primaryEmail}</Pill>
                  <Pill tone="warm">{group.invitationMode}</Pill>
                  <Pill tone="neutral">{group.locale}</Pill>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.event1Invited ? <Pill tone="success">Event One</Pill> : null}
                  {group.event2Invited ? <Pill tone="success">Event Two</Pill> : null}
                  {group.event2PlusOneAllowed ? <Pill tone="neutral">Plus one</Pill> : null}
                  {group.event2ChildrenAllowed ? (
                    <Pill tone="neutral">Children up to {group.event2MaxChildren}</Pill>
                  ) : null}
                </div>
                <ul className="space-y-2 text-sm text-[#43342a]">
                  {group.people.map((person) => (
                    <li key={`${group.externalId}-${person.fullName}`}>
                      {person.fullName}
                      {person.email ? ` | ${person.email}` : ""}
                      {` | ${person.kind}`}
                      {person.isPrimary ? " | primary" : ""}
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
