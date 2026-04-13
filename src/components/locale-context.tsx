"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { type Locale } from "@/src/lib/constants";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

async function persistGuestLocale(locale: Locale) {
  const search = new URLSearchParams({ locale });

  const response = await fetch(`/guest/locale?${search.toString()}`, {
    cache: "no-store",
    credentials: "same-origin",
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error(`Unable to persist locale ${locale}.`);
  }
}

export function LocaleProvider({
  children,
  initialLocale,
  onLocalePersistedAction,
}: {
  children?: React.ReactNode;
  initialLocale: Locale;
  onLocalePersistedAction?: () => void;
}) {
  const [locale, setLocaleState] = useState(initialLocale);
  const localeRef = useRef(locale);

  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  function setLocale(nextLocale: Locale) {
    const previousLocale = localeRef.current;

    if (previousLocale === nextLocale) {
      return;
    }

    setLocaleState(nextLocale);

    void persistGuestLocale(nextLocale)
      .then(() => {
        if (localeRef.current === nextLocale) {
          onLocalePersistedAction?.();
        }
      })
      .catch(() => {
        if (localeRef.current === nextLocale) {
          setLocaleState(previousLocale);
        }
      });
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function GuestLocaleProvider({
  children,
  initialLocale,
}: {
  children?: React.ReactNode;
  initialLocale: Locale;
}) {
  const router = useRouter();

  return (
    <LocaleProvider
      initialLocale={initialLocale}
      onLocalePersistedAction={() => {
        router.refresh();
      }}
    >
      {children}
    </LocaleProvider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
}
