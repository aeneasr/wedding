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
  addresses: Array<{
    label: LocalizedValue<string>;
    mapUrl: string;
  }>;
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
  startsAt: "2026-08-22T17:00:00+02:00",
  endsAt: "2026-08-23T01:00:00+02:00",
  hero: {
    de: "Wir freuen uns mit Dir einen wundervollen Tag zu verbringen",
  },
  name: {
    de: "Hochzeitsfeier von Anna und Aeneas",
  },
  summary: {
    de: "Zusammen feiern wir unsere Hochzeit. Es wird eine entspannte, heitere Hochzeitsfeier ohne Zeremonie, da wir bereits einige Tage vorher mit der Familie standesamtlich heiraten.",
  },
  venueName: {
    de: "München",
  },
  addresses: [
    {
      label: {
        de: "TIVO, Oettingenstraße 74, 80538 München",
      },
      mapUrl: "https://maps.app.goo.gl/f1yhKmPSPiPUuGFp8",
    },
  ],
  schedule: [
    {
      time: "17:00",
      title: {
        de: "Ankunft im TIVO",
      },
      note: {
        de: "Start ist im TIVO um 17:00, wo wir mit leckeren Drinks erwartet werden.",
      },
    },
    {
      time: "18:30",
      title: {
        de: "Essen",
      },
      note: {
        de: "Nach ein paar leckeren Drinks wird essen serviert, welches man im sitzen oder stehen genießen kann.",
      },
    },
    {
      time: "20:00",
      title: {
        de: "Tanzen",
      },
      note: {
        de: "Sobald die Mägen gefüllt sind, feiern wir diesen wunderbaren Tag mit einem DJ-Set des Brautpaars und tanzen bis in die Nacht hinein!",
      },
    },
    {
      time: "22:00",
      title: {
        de: "Feiern",
      },
      note: {
        de: "Ab 22 Uhr feiern und tanzen wir drinnen weiter.",
      },
    },
    {
      time: "01:00",
      title: {
        de: "Ende",
      },
      note: {
        de: "Das TIVO ist öffentlich gut angebunden mit Bus und Tram, auch nachts!",
      },
    },
  ],
  logistics: [
    {
      label: {
        de: "Anreise",
      },
      value: {
        de: "Am besten erreicht man das TIVO mit der Tram oder dem Bus. Es gibt nur begrenzt Parkplätze in der Nähe.",
      },
    },
    {
      label: {
        de: "Desscode",
      },
      value: {
        de: "Locker sommerlich",
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
