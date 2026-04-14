import Link from "next/link";
import { notFound } from "next/navigation";

import { sendInvitationAction } from "@/src/app-actions/admin";
import {
  AdminInvitationForm,
  type InvitationFormValues,
} from "@/src/components/admin-invitation-form";
import { AdminRsvpForm } from "@/src/components/admin-rsvp-form";
import {
  AdminPanel,
  AdminShell,
  Eyebrow,
  Heading,
  InkBadge,
  PageContainer,
  SubtleText,
  buttonClassName,
  inputClassName,
} from "@/src/components/ui";
import { mapAttendeesToInvitees } from "@/src/lib/household";
import { buildInvitationUrl } from "@/src/lib/urls";
import { requireAdminSession } from "@/src/server/access";
import {
  getInvitationActivity,
  getInvitationForAdmin,
} from "@/src/server/invitations";

export const dynamic = "force-dynamic";

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
    primaryEmail: bundle.invitation.primaryEmail,
    invitationMode: bundle.invitation.invitationMode,
    locale: bundle.invitation.locale,
    invitees: bundle.invitees.map((invitee) => ({
      fullName: invitee.fullName,
      email: invitee.email ?? "",
      kind: invitee.kind,
      isPrimary: invitee.isPrimary,
    })),
  };

  const invitationLink = buildInvitationUrl(
    bundle.invitation.id,
    bundle.invitation.tokenVersion,
  );

  return (
    <AdminShell>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <AdminPanel className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <Eyebrow>Einladungsdetails</Eyebrow>
              <Heading>
                {bundle.invitees.find((invitee) => invitee.isPrimary)?.fullName ??
                  bundle.invitation.primaryEmail}
              </Heading>
              <SubtleText>{bundle.invitation.primaryEmail}</SubtleText>
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
                  {bundle.invitation.sentAt ? "Link erneut senden" : "Link senden"}
                </button>
              </form>
              <Link href="/admin" className={buttonClassName({ secondary: true })}>
                Zurück zur Übersicht
              </Link>
            </div>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink">Einladungslink</span>
            <input
              readOnly
              value={invitationLink}
              className={inputClassName()}
            />
          </label>
        </AdminPanel>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <AdminPanel>
            <AdminInvitationForm initial={formValues} />
          </AdminPanel>
          <div className="grid gap-6">
            <AdminPanel className="space-y-4">
              <Eyebrow>Aktueller RSVP-Status</Eyebrow>
              {bundle.rsvps.length === 0 ? (
                <SubtleText>Es wurde noch keine Antwort abgegeben.</SubtleText>
              ) : (
                <div className="space-y-4">
                  {bundle.rsvps.map((rsvp) => (
                    <div key={rsvp.id} className="rounded-xl bg-cream p-4">
                      <div className="flex items-center justify-between gap-3">
                        <InkBadge tone={rsvp.status === "attending" ? "success" : rsvp.status === "declined" ? "muted" : "warm"}>
                          {rsvp.status}
                        </InkBadge>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-ink-light">
                        {mapAttendeesToInvitees(bundle.invitees, rsvp.attendees).map((invitee) => (
                          <li key={invitee.inviteeId}>
                            {invitee.fullName} | {invitee.kind} |{" "}
                            {invitee.attending ? "dabei" : "nicht dabei"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </AdminPanel>

            <AdminPanel className="space-y-4">
              <Eyebrow>RSVP bearbeiten</Eyebrow>
              <AdminRsvpForm
                invitationId={bundle.invitation.id}
                locale={bundle.invitation.locale}
                invitationMode={bundle.invitation.invitationMode}
                invitees={mapAttendeesToInvitees(bundle.invitees, bundle.rsvps[0]?.attendees ?? [])}
              />
            </AdminPanel>

            <AdminPanel className="space-y-4">
              <Eyebrow>Letzte Aktivität</Eyebrow>
              <div className="space-y-3">
                {activity.length === 0 ? (
                  <SubtleText>Noch keine Aktivität vorhanden.</SubtleText>
                ) : (
                  activity.map((item) => (
                    <div key={item.id} className="rounded-xl bg-cream p-4">
                      <p className="text-sm font-medium uppercase tracking-wide text-sage-muted">
                        {item.type}
                      </p>
                      <p className="mt-2 text-sm text-ink-light">
                        {item.createdAt.toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </AdminPanel>
          </div>
        </div>
      </PageContainer>
    </AdminShell>
  );
}
