import Link from "next/link";

import { AdminInvitationForm } from "@/src/components/admin-invitation-form";
import {
  Eyebrow,
  Heading,
  PageBackground,
  PageContainer,
  SubtleText,
  SurfaceCard,
  buttonClassName,
} from "@/src/components/ui";
import { requireAdminSession } from "@/src/server/access";

export const dynamic = "force-dynamic";

export default async function NewInvitationPage() {
  await requireAdminSession();

  return (
    <PageBackground>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <SurfaceCard className="space-y-5">
          <Eyebrow>New invitation</Eyebrow>
          <Heading>Create an invitation record</Heading>
          <SubtleText>
            Define the invitation scope, named guests, and event access before sending
            the secure link.
          </SubtleText>
          <Link href="/admin" className={buttonClassName({ secondary: true })}>
            Back to dashboard
          </Link>
        </SurfaceCard>
        <SurfaceCard>
          <AdminInvitationForm />
        </SurfaceCard>
      </PageContainer>
    </PageBackground>
  );
}
