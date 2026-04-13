import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { de } from "date-fns/locale";

import { defaultLocale, type Locale } from "@/src/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getDateFnsLocale(_locale: Locale = defaultLocale) {
  return de;
}

export function formatDateTime(value: string, locale: Locale = defaultLocale) {
  return format(
    new Date(value),
    "EEEE, d MMMM yyyy 'um' HH:mm",
    { locale: getDateFnsLocale(locale) },
  );
}
