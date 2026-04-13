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
          <Eyebrow>Neue Einladung</Eyebrow>
          <Heading>Einladung erstellen</Heading>
          <SubtleText>
            Wähle die Gäste, Feiern und Antwortoptionen, bevor du den
            Einladungslink versendest.
          </SubtleText>
          <Link href="/admin" className={buttonClassName({ secondary: true })}>
            Zurück zur Übersicht
          </Link>
        </AdminPanel>
        <AdminPanel>
          <AdminInvitationForm />
        </AdminPanel>
      </PageContainer>
    </AdminShell>
  );
}
