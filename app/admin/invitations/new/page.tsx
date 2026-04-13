import Link from "next/link";

import { AdminInvitationForm } from "@/src/components/admin-invitation-form";
import {
  AdminPanel,
  AdminShell,
  Eyebrow,
  Heading,
  PageContainer,
  SubtleText,
  buttonClassName,
} from "@/src/components/ui";
import { requireAdminSession } from "@/src/server/access";

export const dynamic = "force-dynamic";

export default async function NewInvitationPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <AdminPanel className="space-y-5">
          <Eyebrow>New invitation</Eyebrow>
          <Heading>Create an invitation</Heading>
          <SubtleText>
            Choose the guests, celebrations, and reply options before sending
            the invitation link.
          </SubtleText>
          <Link href="/admin" className={buttonClassName({ secondary: true })}>
            Back to dashboard
          </Link>
        </AdminPanel>
        <AdminPanel>
          <AdminInvitationForm />
        </AdminPanel>
      </PageContainer>
    </AdminShell>
  );
}
