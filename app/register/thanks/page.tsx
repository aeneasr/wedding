import { getDictionary } from "@/src/lib/i18n";
import { defaultLocale } from "@/src/lib/constants";
import { PaperPanel, Eyebrow } from "@/src/components/ui";

export default function RegisterThanksPage() {
  const dictionary = getDictionary(defaultLocale);
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <PaperPanel className="space-y-4">
        <Eyebrow>{dictionary.register.eyebrow}</Eyebrow>
        <h1 className="text-2xl font-serif">{dictionary.register.thanksTitle}</h1>
        <p className="text-base leading-relaxed">
          {dictionary.register.thanksBody}
        </p>
      </PaperPanel>
    </main>
  );
}
