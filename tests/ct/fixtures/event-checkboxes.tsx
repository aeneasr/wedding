import { useState } from "react";

/**
 * Isolated harness replicating the checkbox disable/enable logic from
 * AdminInvitationForm. The real component can't be mounted in Playwright CT
 * because it imports a Next.js server action via useActionState.
 */
export function EventCheckboxes({
  initialEvent2Invited = false,
  initialPlusOne = false,
  initialChildren = false,
}: {
  initialEvent2Invited?: boolean;
  initialPlusOne?: boolean;
  initialChildren?: boolean;
}) {
  const [event2Invited, setEvent2Invited] = useState(initialEvent2Invited);

  return (
    <div className="grid gap-3 rounded-[24px] bg-[#faf4ee] p-4 text-sm text-[#3b2d24]">
      <label className="flex items-center gap-3">
        <input type="checkbox" name="event1Invited" defaultChecked />
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
      <label
        className={`flex items-center gap-3 ${!event2Invited ? "opacity-40" : ""}`}
      >
        <input
          type="checkbox"
          name="event2PlusOneAllowed"
          defaultChecked={initialPlusOne}
          disabled={!event2Invited}
        />
        Event Two: plus one allowed
      </label>
      <label
        className={`flex items-center gap-3 ${!event2Invited ? "opacity-40" : ""}`}
      >
        <input
          type="checkbox"
          name="event2ChildrenAllowed"
          defaultChecked={initialChildren}
          disabled={!event2Invited}
        />
        Event Two: children allowed
      </label>
    </div>
  );
}
