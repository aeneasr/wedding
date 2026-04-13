import { useState } from "react";

/**
 * Isolated harness replicating the invitation-mode / additional-household-member
 * logic from AdminInvitationForm. The real component can't be mounted in
 * Playwright CT because it imports a Next.js server action via useActionState.
 */
export function EventCheckboxes({
  initialInvitationMode = "individual",
  initialAdditionalMembers = 0,
}: {
  initialInvitationMode?: "individual" | "household";
  initialAdditionalMembers?: number;
}) {
  const [invitationMode, setInvitationMode] = useState(initialInvitationMode);
  const [additionalMembers, setAdditionalMembers] = useState(initialAdditionalMembers);

  return (
    <div className="space-y-4">
      <label className="flex flex-col gap-2">
        <span>Invitation mode</span>
        <select
          value={invitationMode}
          onChange={(event) => {
            const nextMode = event.target.value as "individual" | "household";
            setInvitationMode(nextMode);

            if (nextMode === "individual") {
              setAdditionalMembers(0);
            }
          }}
        >
          <option value="individual">Individual</option>
          <option value="household">Household</option>
        </select>
      </label>

      {invitationMode === "household" ? (
        <label className="flex flex-col gap-2">
          <span>Additional household members</span>
          <select
            value={String(additionalMembers)}
            onChange={(event) => setAdditionalMembers(Number(event.target.value))}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="grid gap-3 rounded-xl bg-cream p-4 text-sm text-ink">
        <label className="flex flex-col gap-2">
          <span>Full name</span>
          <input type="text" value="Primary Person" readOnly />
        </label>

        {invitationMode === "household"
          ? Array.from({ length: additionalMembers }, (_, index) => (
              <div key={index} className="grid gap-2 rounded-lg bg-white/70 p-3">
                <label className="flex flex-col gap-2">
                  <span>Full name</span>
                  <input type="text" value="" readOnly />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Person type</span>
                  <select value="adult" onChange={() => undefined}>
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                  </select>
                </label>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
