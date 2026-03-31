"use client";

import { createContext, useContext, useState } from "react";

import { buttonClassName } from "@/src/components/ui";
import { locales, type Locale } from "@/src/lib/constants";
import { getDictionary } from "@/src/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

function persistGuestLocale(locale: Locale) {
  const search = new URLSearchParams({ locale });

  void fetch(`/guest/locale?${search.toString()}`, {
    cache: "no-store",
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => undefined);
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children?: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState(initialLocale);

  function setLocale(nextLocale: Locale) {
    setLocaleState((currentLocale) => {
      if (currentLocale === nextLocale) {
        return currentLocale;
      }

      persistGuestLocale(nextLocale);
      return nextLocale;
    });
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const dictionary = getDictionary(locale);

  return (
    <div className="flex items-center gap-2">
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          className={buttonClassName({
            secondary: option !== locale,
            compact: true,
          })}
          aria-pressed={option === locale}
          onClick={() => setLocale(option)}
        >
          {dictionary.switchTo[option]}
        </button>
      ))}
    </div>
  );
}
