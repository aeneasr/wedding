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
    en: "Celebrate with us on our wedding day",
    de: "Feiert mit uns unseren großen Tag",
  },
  name: {
    en: "Wedding Celebration",
    de: "Hochzeitsfeier",
  },
  summary: {
    en: "Ceremony, dinner, and dancing.",
    de: "Zeremonie, Abendessen und Tanz.",
  },
  venueName: {
    en: "Garden Hall",
    de: "Garden Hall",
  },
  address: {
    en: "Piazza dei Fiori 8, Rome",
    de: "Piazza dei Fiori 8, Rom",
  },
  mapUrl: "https://maps.google.com/?q=Piazza+dei+Fiori+8+Rome",
  schedule: [
    {
      time: "14:30",
      title: {
        en: "Guest arrival",
        de: "Ankunft der Gäste",
      },
      note: {
        en: "Meet in the courtyard for welcome drinks.",
        de: "Treffpunkt im Innenhof für Getränke zur Begrüßung.",
      },
    },
    {
      time: "15:30",
      title: {
        en: "Ceremony begins",
        de: "Beginn der Zeremonie",
      },
      note: {
        en: "Please be seated ten minutes before the ceremony.",
        de: "Bitte zehn Minuten vor Beginn Platz nehmen.",
      },
    },
    {
      time: "17:00",
      title: {
        en: "Photos and aperitivo",
        de: "Fotos und Aperitivo",
      },
      note: {
        en: "Canapes and drinks in the garden.",
        de: "Canapés und Getränke im Garten.",
      },
    },
    {
      time: "19:00",
      title: {
        en: "Dinner service",
        de: "Beginn des Abendessens",
      },
      note: {
        en: "Food service timing is based on final RSVP counts.",
        de: "Der Ablauf des Essens richtet sich nach der finalen RSVP-Anzahl.",
      },
    },
    {
      time: "21:30",
      title: {
        en: "Cake and dancing",
        de: "Torte und Tanz",
      },
      note: {
        en: "Live music followed by the DJ set.",
        de: "Live-Musik und anschließend DJ-Set.",
      },
    },
  ],
  logistics: [
    {
      label: {
        en: "Meeting point",
        de: "Treffpunkt",
      },
      value: {
        en: "Courtyard entrance on the north side of the venue.",
        de: "Eingang über den Innenhof auf der Nordseite der Location.",
      },
    },
    {
      label: {
        en: "Food service",
        de: "Essenszeiten",
      },
      value: {
        en: "Dinner starts around 19:00, with children served first where needed.",
        de: "Das Abendessen beginnt gegen 19:00 Uhr, Kinder werden bei Bedarf zuerst bedient.",
      },
    },
    {
      label: {
        en: "Transport",
        de: "Transport",
      },
      value: {
        en: "Shuttle details will be shared later through follow-up communication.",
        de: "Details zum Shuttle werden später in der weiteren Kommunikation geteilt.",
      },
    },
  ],
};

export function localizeEventText<T>(value: LocalizedValue<T>, locale: Locale) {
  return value[locale] ?? value.en;
}

export function formatEventDateBadge(locale: Locale = defaultLocale) {
  return format(new Date(eventContent.startsAt), "d MMM yyyy", {
    locale: getDateFnsLocale(locale),
  });
}

export function getInvitationExpiry() {
  return new Date(eventContent.endsAt).getTime();
}
