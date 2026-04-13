import Link from "next/link";

import { AdminImportForm } from "@/src/components/admin-import-form";
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

export default async function AdminImportPage() {
  await requireAdminSession();

  return (
    <AdminShell>
      <PageContainer className="gap-6 py-6 sm:py-10">
        <AdminPanel className="space-y-5">
          <Eyebrow>CSV import</Eyebrow>
          <Heading>Preview grouped invitation imports before committing</Heading>
          <SubtleText>
            Use one row per named invitee and share the same
            <code className="mx-1 rounded bg-cream-dark px-2 py-1 text-xs">
              invitation_external_id
            </code>
            for guests that belong to the same invitation group.
          </SubtleText>
          <Link href="/admin" className={buttonClassName({ secondary: true })}>
            Back to dashboard
          </Link>
        </AdminPanel>
        <AdminPanel>
          <AdminImportForm />
        </AdminPanel>
      </PageContainer>
    </AdminShell>
  );
}
