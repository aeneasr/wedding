import Link from "next/link";
import { notFound } from "next/navigation";

import { sendInvitationAction } from "@/src/app-actions/admin";
import {
  AdminInvitationForm,
  type InvitationFormValues,
} from "@/src/components/admin-invitation-form";
import { AdminRsvpForm } from "@/src/components/admin-rsvp-form";
import {
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  Pill,
  SubtleText,
  SurfaceCard,
  buttonClassName,
} from "@/src/components/ui";
import { buildInvitationUrl } from "@/src/lib/urls";
import { requireAdminSession } from "@/src/server/access";
import {
  getInvitationActivity,
  getInvitationForAdmin,
} from "@/src/server/invitations";

export const dynamic = "force-dynamic";

function buildNamedGuestsText(values: Awaited<ReturnType<typeof getInvitationForAdmin>>) {
  if (!values) {
    return "";
  }

  return values.invitees
    .map((invitee) =>
      [
        invitee.fullName,
        invitee.email ?? "",
        invitee.kind,
        invitee.isPrimary ? "primary" : "",
      ]
        .filter(Boolean)
        .join(" | "),
    )
    .join("\n");
}

export default async function AdminInvitationDetailPage({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}) {
  await requireAdminSession();
  const { invitationId } = await params;
  const bundle = await getInvitationForAdmin(invitationId);

  if (!bundle) {
    notFound();
  }

  const activity = await getInvitationActivity(invitationId);
  const formValues: InvitationFormValues = {
    id: bundle.invitation.id,
    externalId: bundle.invitation.externalId,
    primaryEmail: bundle.invitation.primaryEmail,
    invitationMode: bundle.invitation.invitationMode,
    locale: bundle.invitation.locale,
    namedGuestsText: buildNamedGuestsText(bundle),
    event1Invited: bundle.events.some((event) => event.eventKey === "event_1"),
    event2Invited: bundle.events.some((event) => event.eventKey === "event_2"),
    event2PlusOneAllowed:
      bundle.events.find((event) => event.eventKey === "event_2")?.plusOneAllowed ??
      false,
    event2ChildrenAllowed:
      bundle.events.find((event) => event.eventKey === "event_2")?.childrenAllowed ??
      false,
    event2MaxChildren:
      bundle.events.find((event) => event.eventKey === "event_2")?.maxChildren ?? 0,
  };

  const invitationLink = buildInvitationUrl(
    bundle.invitation.id,
    bundle.invitation.tokenVersion,
  );

  return (
    <PageBackground>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <SurfaceCard className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <Eyebrow>Invitation detail</Eyebrow>
              <Heading>
                {bundle.invitees.find((invitee) => invitee.isPrimary)?.fullName ??
                  bundle.invitation.primaryEmail}
              </Heading>
              <SubtleText>{bundle.invitation.primaryEmail}</SubtleText>
              <div className="flex flex-wrap gap-2">
                {bundle.events.map((event) => (
                  <Pill key={event.eventKey} tone="warm">
                    {event.eventKey}
                  </Pill>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <form action={sendInvitationAction}>
                <input type="hidden" name="invitationId" value={bundle.invitation.id} />
                <input
                  type="hidden"
                  name="redirectTo"
                  value={`/admin/invitations/${bundle.invitation.id}`}
                />
                <input
                  type="hidden"
                  name="resend"
                  value={bundle.invitation.sentAt ? "true" : "false"}
                />
                <button type="submit" className={buttonClassName()}>
                  {bundle.invitation.sentAt ? "Resend link" : "Send link"}
                </button>
              </form>
              <Link href="/admin" className={buttonClassName({ secondary: true })}>
                Back to dashboard
              </Link>
            </div>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-[#3b2d24]">Invitation link</span>
            <input
              readOnly
              value={invitationLink}
              className="w-full rounded-2xl border border-[#dbc8bb] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f241c]"
            />
          </label>
        </SurfaceCard>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard>
            <AdminInvitationForm initial={formValues} />
          </SurfaceCard>
          <div className="grid gap-6">
            <SurfaceCard className="space-y-4">
              <Eyebrow>Current RSVP state</Eyebrow>
              {bundle.rsvps.length === 0 ? (
                <SubtleText>No RSVP has been submitted yet.</SubtleText>
              ) : (
                <div className="space-y-4">
                  {bundle.rsvps.map((rsvp) => (
                    <div key={rsvp.id} className="rounded-[24px] bg-[#faf4ee] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-[#2f241c]">{rsvp.eventKey}</p>
                        <Pill tone={rsvp.status === "attending" ? "success" : rsvp.status === "declined" ? "muted" : "warm"}>
                          {rsvp.status}
                        </Pill>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-[#4f3d32]">
                        {rsvp.attendees.map((attendee) => (
                          <li key={attendee.id}>
                            {attendee.fullName} | {attendee.attendeeType} |{" "}
                            {attendee.isAttending ? "attending" : "not attending"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </SurfaceCard>

            {bundle.events.map((event) => {
              const rsvp = bundle.rsvps.find((r) => r.eventKey === event.eventKey);
              const invitees = bundle.invitees.map((invitee) => {
                const response = rsvp?.attendees.find((a) => a.inviteeId === invitee.id);
                return {
                  inviteeId: invitee.id,
                  fullName: invitee.fullName,
                  kind: invitee.kind,
                  attending: response?.isAttending ?? false,
                  dietaryRequirements: response?.dietaryRequirements ?? "",
                  phoneNumber: response?.phoneNumber ?? "",
                };
              });

              const existingPlusOne = rsvp?.attendees.find(
                (a) => a.attendeeType === "plus_one",
              );
              const existingChildren =
                rsvp?.attendees.filter(
                  (a) => a.attendeeType === "child" && !a.inviteeId,
                ) ?? [];

              return (
                <SurfaceCard key={event.eventKey} className="space-y-4">
                  <Eyebrow>RSVP for {event.eventKey}</Eyebrow>
                  <AdminRsvpForm
                    invitationId={bundle.invitation.id}
                    locale={bundle.invitation.locale}
                    eventKey={event.eventKey}
                    invitees={invitees}
                    plusOneAllowed={event.plusOneAllowed}
                    childrenAllowed={event.childrenAllowed}
                    maxChildren={event.maxChildren}
                    initialPlusOne={
                      existingPlusOne
                          ? {
                            attending: true,
                            fullName: existingPlusOne.fullName,
                            dietaryRequirements:
                              existingPlusOne.dietaryRequirements ?? "",
                            phoneNumber: existingPlusOne.phoneNumber ?? "",
                          }
                        : undefined
                    }
                    initialChildren={existingChildren.map((c) => ({
                      fullName: c.fullName,
                      dietaryRequirements: c.dietaryRequirements ?? "",
                    }))}
                  />
                </SurfaceCard>
              );
            })}

            <SurfaceCard className="space-y-4">
              <Eyebrow>Recent activity</Eyebrow>
              <div className="space-y-3">
                {activity.length === 0 ? (
                  <SubtleText>No activity recorded yet.</SubtleText>
                ) : (
                  activity.map((item) => (
                    <div key={item.id} className="rounded-[22px] bg-[#faf4ee] p-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f6e57]">
                        {item.type}
                      </p>
                      <p className="mt-2 text-sm text-[#46362c]">
                        {item.createdAt.toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </SurfaceCard>
          </div>
        </div>
      </PageContainer>
    </PageBackground>
  );
}
