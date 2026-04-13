"use client";

import {
  AdminPanel,
  AdminShell,
  Eyebrow,
  Heading,
  PageContainer,
  SubtleText,
  buttonClassName,
} from "@/src/components/ui";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AdminShell>
      <PageContainer className="items-center justify-center py-8 sm:py-14">
        <AdminPanel className="w-full max-w-3xl space-y-4">
          <Eyebrow>Fehler</Eyebrow>
          <Heading className="text-4xl">Ein Fehler ist aufgetreten</Heading>
          <SubtleText>
            Die Seite konnte nicht geladen werden. Bitte versuche es erneut
            oder wende dich an den Administrator.
          </SubtleText>
          {error.digest && (
            <SubtleText>Fehlercode: {error.digest}</SubtleText>
          )}
          <button className={buttonClassName()} onClick={reset}>
            Erneut versuchen
          </button>
        </AdminPanel>
      </PageContainer>
    </AdminShell>
  );
}
