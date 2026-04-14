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
          <Eyebrow>CSV-Import</Eyebrow>
          <Heading>Gruppierte Einladungen vor dem Importieren prüfen</Heading>
          <SubtleText>
            Verwende eine Zeile pro benanntem Gast und nutze dieselbe
            <code className="mx-1 rounded bg-cream-dark px-2 py-1 text-xs">
              primary_email
            </code>
            für Gäste, die zur selben Einladungsgruppe gehören.
          </SubtleText>
          <Link href="/admin" className={buttonClassName({ secondary: true })}>
            Zurück zur Übersicht
          </Link>
        </AdminPanel>
        <AdminPanel>
          <AdminImportForm />
        </AdminPanel>
      </PageContainer>
    </AdminShell>
  );
}
