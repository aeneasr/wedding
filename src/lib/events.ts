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
  startsAt: "2026-08-22T16:00:00+02:00",
  endsAt: "2026-08-23T01:00:00+02:00",
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
    de: "TIVO",
  },
  address: {
    de: "Oettingenstraße 74, 80538 München",
  },
  mapUrl: "https://maps.app.goo.gl/f1yhKmPSPiPUuGFp8",
  schedule: [
    {
      time: "16:00",
      title: {
        de: "Ankunft",
      },
      note: {
        de: "",
      },
    },
    {
      time: "19:00",
      title: {
        de: "Essen",
      },
      note: {
        de: "",
      },
    },
    {
      time: "21:00",
      title: {
        de: "Tanzen",
      },
      note: {
        de: "",
      },
    },
    {
      time: "01:00",
      title: {
        de: "Ende",
      },
      note: {
        de: "",
      },
    },
  ],
  logistics: [
    {
      label: {
        de: "Anreise",
      },
      value: {
        de: "Am besten erreicht man das Tivo mit der Tram oder dem Bus. Es gibt nur begrenzt Parkplätze in der Nähe.",
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
