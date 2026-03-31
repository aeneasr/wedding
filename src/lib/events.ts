import { format } from "date-fns";

import {
  eventKeys,
  type EventKey,
  type Locale,
} from "@/src/lib/constants";

type LocalizedValue<T> = Record<Locale, T>;

export type EventContent = {
  key: EventKey;
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

export const events: Record<EventKey, EventContent> = {
  event_1: {
    key: "event_1",
    startsAt: "2026-09-18T18:00:00+02:00",
    endsAt: "2026-09-18T23:30:00+02:00",
    hero: {
      en: "An intimate gathering before the main celebration",
      de: "Ein intimes Treffen vor der grossen Feier",
    },
    name: {
      en: "Event One",
      de: "Veranstaltung Eins",
    },
    summary: {
      en: "A smaller evening with close family and friends.",
      de: "Ein kleiner Abend mit enger Familie und engen Freunden.",
    },
    venueName: {
      en: "Villa Terrace",
      de: "Villa Terrace",
    },
    address: {
      en: "Via del Giardino 12, Rome",
      de: "Via del Giardino 12, Rom",
    },
    mapUrl: "https://maps.google.com/?q=Via+del+Giardino+12+Rome",
    schedule: [
      {
        time: "18:00",
        title: {
          en: "Arrival and aperitivo",
          de: "Ankunft und Aperitivo",
        },
        note: {
          en: "Please arrive at the terrace entrance.",
          de: "Bitte kommt uber den Eingang zur Terrasse.",
        },
      },
      {
        time: "19:30",
        title: {
          en: "Dinner is served",
          de: "Beginn des Abendessens",
        },
        note: {
          en: "Dietary requirements collected in your RSVP will be shared with the venue.",
          de: "Ernahrungswunsche aus der RSVP werden an die Location weitergegeben.",
        },
      },
      {
        time: "21:30",
        title: {
          en: "Toasts and relaxed evening",
          de: "Ansprachen und entspannter Abend",
        },
        note: {
          en: "A quieter, seated evening with drinks afterwards.",
          de: "Ein ruhiger, sitzender Abend mit anschliessenden Getranken.",
        },
      },
    ],
    logistics: [
      {
        label: {
          en: "Dress code",
          de: "Dresscode",
        },
        value: {
          en: "Elegant but comfortable",
          de: "Elegant, aber bequem",
        },
      },
      {
        label: {
          en: "Arrival",
          de: "Anreise",
        },
        value: {
          en: "Limited parking on site. Taxi drop-off recommended.",
          de: "Begrenzte Parkplatze vor Ort. Taxi wird empfohlen.",
        },
      },
    ],
  },
  event_2: {
    key: "event_2",
    startsAt: "2026-09-19T14:30:00+02:00",
    endsAt: "2026-09-20T00:30:00+02:00",
    hero: {
      en: "The main wedding celebration",
      de: "Die grosse Hochzeitsfeier",
    },
    name: {
      en: "Event Two",
      de: "Veranstaltung Zwei",
    },
    summary: {
      en: "Ceremony, dinner, and dancing with the wider guest list.",
      de: "Zeremonie, Abendessen und Tanz mit dem grossen Gastekreis.",
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
          de: "Ankunft der Gaste",
        },
        note: {
          en: "Meet in the courtyard for welcome drinks.",
          de: "Treffpunkt im Innenhof fur Getranke zur Begrussung.",
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
          de: "Canapes und Getranke im Garten.",
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
          de: "Live-Musik und anschliessend DJ-Set.",
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
          de: "Eingang uber den Innenhof auf der Nordseite der Location.",
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
          de: "Details zum Shuttle werden spater in der weiteren Kommunikation geteilt.",
        },
      },
    ],
  },
};

export function getEventContent(eventKey: EventKey) {
  return events[eventKey];
}

export function listEventKeys() {
  return [...eventKeys];
}

export function localizeEventText<T>(value: LocalizedValue<T>, locale: Locale) {
  return value[locale] ?? value.en;
}

export function formatEventDateBadge(eventKey: EventKey) {
  return format(new Date(events[eventKey].startsAt), "d MMM yyyy");
}

export function getInvitationExpiry(invitedEvents: EventKey[]) {
  const endTimes = invitedEvents.map((eventKey) => new Date(events[eventKey].endsAt).getTime());
  return Math.max(...endTimes);
}
