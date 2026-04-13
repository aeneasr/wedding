import { format } from "date-fns";

import {
  defaultLocale,
  type Locale,
} from "@/src/lib/constants";
import { getDateFnsLocale } from "@/src/lib/utils";

type LocalizedValue<T> = Record<Locale, T>;

type EventContent = {
  startsAt: string;
  endsAt: string;
  hero: LocalizedValue<string>;
  name: LocalizedValue<string>;
  summary: LocalizedValue<string>;
  venueName: LocalizedValue<string>;
  address: LocalizedValue<string>;
  mapUrl: string;
  schedule: Array<{
    time: string;
    title: LocalizedValue<string>;
    note: LocalizedValue<string>;
  }>;
  logistics: Array<{
    label: LocalizedValue<string>;
    value: LocalizedValue<string>;
  }>;
};

export const eventContent: EventContent = {
  startsAt: "2026-08-22T14:30:00+02:00",
  endsAt: "2026-08-23T00:30:00+02:00",
  hero: {
    de: "Feiert mit uns unseren großen Tag",
  },
  name: {
    de: "Hochzeitsfeier",
  },
  summary: {
    de: "Zeremonie, Abendessen und Tanz.",
  },
  venueName: {
    de: "Garden Hall",
  },
  address: {
    de: "Piazza dei Fiori 8, Rom",
  },
  mapUrl: "https://maps.google.com/?q=Piazza+dei+Fiori+8+Rome",
  schedule: [
    {
      time: "14:30",
      title: {
        de: "Ankunft der Gäste",
      },
      note: {
        de: "Treffpunkt im Innenhof für Getränke zur Begrüßung.",
      },
    },
    {
      time: "15:30",
      title: {
        de: "Beginn der Zeremonie",
      },
      note: {
        de: "Bitte zehn Minuten vor Beginn Platz nehmen.",
      },
    },
    {
      time: "17:00",
      title: {
        de: "Fotos und Aperitivo",
      },
      note: {
        de: "Canapés und Getränke im Garten.",
      },
    },
    {
      time: "19:00",
      title: {
        de: "Beginn des Abendessens",
      },
      note: {
        de: "Der Ablauf des Essens richtet sich nach der finalen RSVP-Anzahl.",
      },
    },
    {
      time: "21:30",
      title: {
        de: "Torte und Tanz",
      },
      note: {
        de: "Live-Musik und anschließend DJ-Set.",
      },
    },
  ],
  logistics: [
    {
      label: {
        de: "Treffpunkt",
      },
      value: {
        de: "Eingang über den Innenhof auf der Nordseite der Location.",
      },
    },
    {
      label: {
        de: "Essenszeiten",
      },
      value: {
        de: "Das Abendessen beginnt gegen 19:00 Uhr, Kinder werden bei Bedarf zuerst bedient.",
      },
    },
    {
      label: {
        de: "Transport",
      },
      value: {
        de: "Details zum Shuttle werden später in der weiteren Kommunikation geteilt.",
      },
    },
  ],
};

export function localizeEventText<T>(value: LocalizedValue<T>, locale: Locale) {
  return value[locale] ?? value.de;
}

export function formatEventDateBadge(locale: Locale = defaultLocale) {
  return format(new Date(eventContent.startsAt), "d MMM yyyy", {
    locale: getDateFnsLocale(locale),
  });
}

export function getInvitationExpiry() {
  return new Date(eventContent.endsAt).getTime();
}
