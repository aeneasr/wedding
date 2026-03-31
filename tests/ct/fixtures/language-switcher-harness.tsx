import {
  LanguageSwitcher,
  LocaleProvider,
  useLocale,
} from "@/src/components/locale-context";
import { getDictionary } from "@/src/lib/i18n";

function LocalePreview() {
  const { locale } = useLocale();
  const dictionary = getDictionary(locale);

  return <p data-testid="locale-label">{dictionary.localeLabel}</p>;
}

export function LanguageSwitcherHarness({
  initialLocale,
}: {
  initialLocale: "en" | "de";
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <div className="flex flex-col gap-4">
        <LanguageSwitcher />
        <LocalePreview />
      </div>
    </LocaleProvider>
  );
}
