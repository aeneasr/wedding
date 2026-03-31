import Link from "next/link";

import { AdminImportForm } from "@/src/components/admin-import-form";
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

export default async function AdminImportPage() {
  await requireAdminSession();

  return (
    <PageBackground>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <SurfaceCard className="space-y-5">
          <Eyebrow>CSV import</Eyebrow>
          <Heading>Preview grouped invitation imports before committing</Heading>
          <SubtleText>
            Use one row per named invitee and share the same
            <code className="mx-1 rounded bg-[#f1e3d7] px-2 py-1 text-xs">
              invitation_external_id
            </code>
            for guests that belong to the same invitation group.
          </SubtleText>
          <Link href="/admin" className={buttonClassName({ secondary: true })}>
            Back to dashboard
          </Link>
        </SurfaceCard>
        <SurfaceCard>
          <AdminImportForm />
        </SurfaceCard>
      </PageContainer>
    </PageBackground>
  );
}
