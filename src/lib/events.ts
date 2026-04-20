import { format } from "date-fns";

import {
  defaultLocale,
  type Locale,
} from "@/src/lib/constants";
import { getDateFnsLocale } from "@/src/lib/utils";

type LocalizedValue<T> = Record<Locale, T>;

type EventContent = {
  date: string;
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
  date: "2026-08-22",
  startsAt: "15.00",
  endsAt: "01.00",
  hero: {
    de: "Wir freuen uns mit Dir einen wundervollen Tag zu verbringen",
  },
  name: {
    de: "Hochzeitparty von Anna und Aeneas",
  },
  summary: {
    de: "Zusammen feiern wir unsere Hochzeit. Es wird eine entspannte, heitere Hochzeitparty ohne Zeremonie. Wir heiraten standesamtlich ein paar Tage vorher.",
  },
  venueName: {
    de: "München",
  },
  addresses: [
    {
      label: {
        de: "Kleine Eisbach Welle, Paradiesstraße, 81667 München (hier klicken für Google Maps)",
      },
      mapUrl: "https://maps.app.goo.gl/UXJ2vfFmub59CSWA9",
    },
    {
      label: {
        de: "TIVO, Oettingenstraße 74, 80538 München (hier klicken für Google Maps)",
      },
      mapUrl: "https://maps.app.goo.gl/f1yhKmPSPiPUuGFp8",
    },
  ],
  schedule: [
    {
      time: "15:00",
      title: {
        de: "Kleine Eisbach Welle",
      },
      note: {
        de: "Wir treffen uns an der kleinen Eisbach Welle für ein paar Drinks und Snacks, und wenn man möchte den Surfern zuschauen.",
      },
    },
    {
      time: "17:00",
      title: {
        de: "Ankunft im Tivo",
      },
      note: {
        de: "Vom Eisbach laufen wir zusammen zum TIVO (ca. 10 Minuten) wo wir mit leckeren Drinks erwartet werden.",
      },
    },
    {
      time: "18:30",
      title: {
        de: "Essen",
      },
      note: {
        de: "Nach ein paar leckeren Drinks wird Essen serviert, welches im Sitzen oder Stehen genossen werden kann.",
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
        de: "Ab 22 Uhr feiern und tanzen wir Drinnen weiter.",
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
        de: "Am Besten erreicht man das Tivo mit der Tram oder dem Bus. Es gibt nur begrenzt Parkplätze in der Nähe.",
      },
    },
    {
      label: {
        de: "Dresscode",
      },
      value: {
        de: "Sommer Party",
      },
    },
  ],
};

export function localizeEventText<T>(value: LocalizedValue<T>, locale: Locale) {
  return value[locale] ?? value.de;
}

export function formatEventDateBadge(locale: Locale = defaultLocale) {
  return format(new Date(eventContent.date), "d MMM yyyy", {
    locale: getDateFnsLocale(locale),
  });
}

export function getInvitationExpiry() {
  return new Date("2026-08-23T01:00:00+02:00").getTime();
}
