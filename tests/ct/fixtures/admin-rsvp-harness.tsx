import {
  GuestRsvpFields,
  type RsvpFormProps,
} from "@/src/components/guest-rsvp-fields";

/**
 * Test harness simulating AdminRsvpForm without the server action dependency.
 * Renders an invitationId hidden field + GuestRsvpFields, matching the real
 * AdminRsvpForm layout.
 */
export function AdminRsvpHarness({
  invitationId,
  ...rsvpProps
}: RsvpFormProps & { invitationId: string }) {
  return (
    <form className="space-y-5">
      <input type="hidden" name="invitationId" value={invitationId} />
      <GuestRsvpFields {...rsvpProps} />
    </form>
  );
}
