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
        <Field label="CSV-Datei">
          <input type="file" name="csvFile" accept=".csv,text/csv" className={inputClassName()} />
        </Field>
        <Field label="Oder CSV-Inhalt einfügen">
          <textarea
            name="csvText"
            className={textAreaClassName()}
            placeholder="invitation_external_id,primary_email,invitation_mode,locale,person_name,person_email,person_type,is_primary,event_1_invited,event_2_invited"
          />
        </Field>
        {state.error ? (
          <p className="rounded-xl bg-error-bg px-4 py-3 text-sm text-error-text">
            {state.error}
          </p>
        ) : null}
        <button type="submit" className={buttonClassName()} disabled={pending}>
          {pending ? "Verarbeiten …" : "Import-Vorschau"}
        </button>
      </form>

      {state.info ? (
        <p className="rounded-xl bg-cream-dark px-4 py-3 text-sm text-ink-light">
          {state.info}
        </p>
      ) : null}

      {state.errors && state.errors.length > 0 ? (
        <SurfaceCard className="space-y-3">
          <h3 className="font-serif text-2xl text-ink">Validierungsfehler</h3>
          <ul className="space-y-2 text-sm text-error-text">
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </SurfaceCard>
      ) : null}

      {state.preview && state.preview.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-2xl text-ink">Vorschau</h3>
            <form action={commitImportAction}>
              <input type="hidden" name="previewPayload" value={state.previewPayload ?? ""} />
              <button type="submit" className={buttonClassName()}>
                Import übernehmen
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
                <ul className="space-y-2 text-sm text-ink">
                  {group.invitees.map((person) => (
                    <li key={`${group.externalId}-${person.fullName}`}>
                      {person.fullName}
                      {person.email ? ` | ${person.email}` : ""}
                      {` | ${person.kind}`}
                      {person.isPrimary ? " | Hauptperson" : ""}
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
