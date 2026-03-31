import {
  defaultLocale,
  type EventKey,
  type Locale,
} from "@/src/lib/constants";

type Dictionary = {
  localeLabel: string;
  switchTo: Record<Locale, string>;
  landing: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    recoverCta: string;
    privacyTitle: string;
    privacyBody: string;
    features: string[];
  };
  recover: {
    title: string;
    description: string;
    emailLabel: string;
    submit: string;
    neutralSuccess: string;
  };
  guest: {
    overview: string;
    rsvp: string;
    details: string;
    calendar: string;
    update: string;
    invitedEvents: string;
    privateAccess: string;
    logout: string;
    schedule: string;
    logistics: string;
    status: string;
    responsePending: string;
    responseAttending: string;
    responseDeclined: string;
    noAccess: string;
    backToOverview: string;
    securedByLink: string;
    addToCalendar: string;
    eventDetails: string;
    dietaryRequirements: string;
    phoneNumber: string;
    yes: string;
    no: string;
    attending: string;
    notAttending: string;
    plusOne: string;
    children: string;
    bringPlusOne: string;
    bringChildren: string;
    childrenCount: string;
    childName: string;
    saveRsvp: string;
    saved: string;
    informationHidden: string;
    recoverLink: string;
    mainGuests: string;
    plusOneName: string;
    invitedPerson: string;
    updateHint: string;
    summaryLead: string;
    contactHeading: string;
  };
  admin: {
    loginTitle: string;
    loginDescription: string;
    passwordLabel: string;
    submit: string;
  };
  errors: {
    invalidLinkTitle: string;
    invalidLinkBody: string;
    expiredLinkTitle: string;
    expiredLinkBody: string;
    setupTitle: string;
    setupBody: string;
  };
  emails: {
    invitationSubject: string;
    recoverySubject: string;
    confirmationSubject: Record<EventKey, string>;
    greeting: string;
    invitationIntro: string;
    invitedTo: string;
    manageRsvp: string;
    reminder: string;
    recoveryIntro: string;
    confirmationIntro: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    localeLabel: "English",
    switchTo: {
      en: "English",
      de: "German",
    },
    landing: {
      eyebrow: "Invitation-only access",
      title: "A private RSVP space for each invited guest",
      description:
        "Open your personal invitation link to see the event details that apply to you, confirm attendance, and update your response at any time.",
      primaryCta: "Open invitation",
      recoverCta: "Recover my link",
      privacyTitle: "Private by design",
      privacyBody:
        "Guests only see the events they are invited to. Invitation links are created by the organizers and sent directly by email.",
      features: [
        "Separate RSVP flows for both wedding events",
        "Updates allowed through the original secure invitation link",
        "Practical event details only for invited guests",
      ],
    },
    recover: {
      title: "Recover your invitation link",
      description:
        "Enter the email address already associated with your invitation. If we find a match, we will resend your access link.",
      emailLabel: "Invitation email address",
      submit: "Send recovery email",
      neutralSuccess:
        "If that email address matches an existing invitation, a recovery message has been sent.",
    },
    guest: {
      overview: "Overview",
      rsvp: "RSVP",
      details: "Details",
      calendar: "Calendar",
      update: "Update response",
      invitedEvents: "Your invited events",
      privateAccess: "Private invitation area",
      logout: "Clear this browser session",
      schedule: "Schedule",
      logistics: "Practical information",
      status: "Status",
      responsePending: "Pending",
      responseAttending: "Attending",
      responseDeclined: "Declined",
      noAccess: "You are not invited to this event.",
      backToOverview: "Back to overview",
      securedByLink: "Access is secured by your invitation link.",
      addToCalendar: "Add to calendar",
      eventDetails: "Event details",
      dietaryRequirements: "Dietary requirements",
      phoneNumber: "Phone number",
      yes: "Yes",
      no: "No",
      attending: "Attending",
      notAttending: "Not attending",
      plusOne: "Plus one",
      children: "Children",
      bringPlusOne: "Bringing a plus one",
      bringChildren: "Bringing children",
      childrenCount: "Number of children",
      childName: "Child name",
      saveRsvp: "Save RSVP",
      saved: "RSVP saved",
      informationHidden:
        "Guests only see information for the events they are invited to.",
      recoverLink: "Recover link",
      mainGuests: "Named guests",
      plusOneName: "Plus-one name",
      invitedPerson: "Invited guest",
      updateHint:
        "You can return later with the same invitation link to update any answer.",
      summaryLead: "Your invitation includes the following event access.",
      contactHeading: "Contact details for attending adults",
    },
    admin: {
      loginTitle: "Admin access",
      loginDescription:
        "Use the shared organizer password to manage invitations and RSVP data.",
      passwordLabel: "Shared password",
      submit: "Open dashboard",
    },
    errors: {
      invalidLinkTitle: "Invitation link not recognized",
      invalidLinkBody:
        "This link is invalid or has already been rotated. Request a new link using the invitation email address already on file.",
      expiredLinkTitle: "Invitation access has expired",
      expiredLinkBody:
        "The linked invitation is no longer active because all invited events have already passed.",
      setupTitle: "Configuration required",
      setupBody:
        "The application is missing one or more required environment variables.",
    },
    emails: {
      invitationSubject: "Your wedding invitation link",
      recoverySubject: "Your wedding invitation access link",
      confirmationSubject: {
        event_1: "RSVP confirmation for Event One",
        event_2: "RSVP confirmation for Event Two",
      },
      greeting: "Hello",
      invitationIntro:
        "Your personal invitation page is ready. Use the secure link below to view your invitation details and submit or update your RSVP.",
      invitedTo: "Invited events",
      manageRsvp: "Manage RSVP",
      reminder:
        "The same link will remain valid, so you can come back later if your plans change.",
      recoveryIntro:
        "A request was made to recover your invitation link. Use the same secure link below to access your private invitation area again.",
      confirmationIntro:
        "Thank you for confirming. Your event details and RSVP update link are included below.",
    },
  },
  de: {
    localeLabel: "Deutsch",
    switchTo: {
      en: "Englisch",
      de: "Deutsch",
    },
    landing: {
      eyebrow: "Nur mit Einladung",
      title: "Ein privater RSVP-Bereich fur jeden eingeladenen Gast",
      description:
        "Offne deinen personlichen Einladungslink, um nur die fur dich relevanten Veranstaltungsdetails zu sehen, deine Teilnahme zu bestatigen und deine Antwort spater zu aktualisieren.",
      primaryCta: "Einladung offnen",
      recoverCta: "Link erneut anfordern",
      privacyTitle: "Privat gestaltet",
      privacyBody:
        "Gaste sehen nur die Veranstaltungen, zu denen sie eingeladen sind. Die Einladungslinks werden von den Organisatoren erstellt und direkt per E-Mail versendet.",
      features: [
        "Getrennte RSVP-Ablaufe fur beide Hochzeitsveranstaltungen",
        "Aktualisierungen jederzeit uber den ursprunglichen sicheren Link",
        "Praktische Veranstaltungsdetails nur fur eingeladene Gaste",
      ],
    },
    recover: {
      title: "Einladungslink erneut erhalten",
      description:
        "Gib die E-Mail-Adresse ein, die bereits mit deiner Einladung verknupft ist. Wenn wir einen Treffer finden, schicken wir den Zugang erneut.",
      emailLabel: "E-Mail-Adresse der Einladung",
      submit: "Wiederherstellungs-E-Mail senden",
      neutralSuccess:
        "Wenn diese E-Mail-Adresse zu einer bestehenden Einladung gehort, wurde eine Nachricht mit dem Zugangslink gesendet.",
    },
    guest: {
      overview: "Uberblick",
      rsvp: "RSVP",
      details: "Details",
      calendar: "Kalender",
      update: "Antwort aktualisieren",
      invitedEvents: "Deine eingeladenen Veranstaltungen",
      privateAccess: "Privater Einladungsbereich",
      logout: "Browser-Sitzung entfernen",
      schedule: "Ablauf",
      logistics: "Praktische Informationen",
      status: "Status",
      responsePending: "Ausstehend",
      responseAttending: "Zugesagt",
      responseDeclined: "Abgesagt",
      noAccess: "Du bist zu dieser Veranstaltung nicht eingeladen.",
      backToOverview: "Zuruck zum Uberblick",
      securedByLink: "Der Zugang ist durch deinen Einladungslink geschutzt.",
      addToCalendar: "Zum Kalender hinzufugen",
      eventDetails: "Veranstaltungsdetails",
      dietaryRequirements: "Ernahrungswunsche",
      phoneNumber: "Telefonnummer",
      yes: "Ja",
      no: "Nein",
      attending: "Dabei",
      notAttending: "Nicht dabei",
      plusOne: "Begleitperson",
      children: "Kinder",
      bringPlusOne: "Begleitperson mitbringen",
      bringChildren: "Kinder mitbringen",
      childrenCount: "Anzahl der Kinder",
      childName: "Name des Kindes",
      saveRsvp: "RSVP speichern",
      saved: "RSVP gespeichert",
      informationHidden:
        "Gaste sehen nur Informationen zu den Veranstaltungen, fur die sie freigeschaltet sind.",
      recoverLink: "Link wiederherstellen",
      mainGuests: "Namentlich eingeladene Gaste",
      plusOneName: "Name der Begleitperson",
      invitedPerson: "Eingeladener Gast",
      updateHint:
        "Du kannst spater mit demselben Einladungslink zuruckkehren und jede Antwort andern.",
      summaryLead:
        "Deine Einladung umfasst Zugriff auf die folgenden Veranstaltungen.",
      contactHeading: "Kontaktdaten fur teilnehmende Erwachsene",
    },
    admin: {
      loginTitle: "Admin-Zugang",
      loginDescription:
        "Nutze das gemeinsame Organisatoren-Passwort, um Einladungen und RSVP-Daten zu verwalten.",
      passwordLabel: "Gemeinsames Passwort",
      submit: "Dashboard offnen",
    },
    errors: {
      invalidLinkTitle: "Einladungslink nicht erkannt",
      invalidLinkBody:
        "Dieser Link ist ungultig oder wurde ersetzt. Fordere mit der hinterlegten E-Mail-Adresse einen neuen Link an.",
      expiredLinkTitle: "Einladungszugang abgelaufen",
      expiredLinkBody:
        "Diese Einladung ist nicht mehr aktiv, weil alle damit verbundenen Veranstaltungen bereits vorbei sind.",
      setupTitle: "Konfiguration erforderlich",
      setupBody:
        "Der Anwendung fehlen eine oder mehrere erforderliche Umgebungsvariablen.",
    },
    emails: {
      invitationSubject: "Dein Hochzeits-Einladungslink",
      recoverySubject: "Dein Zugangslink zur Hochzeitseinladung",
      confirmationSubject: {
        event_1: "RSVP-Bestatigung fur Veranstaltung Eins",
        event_2: "RSVP-Bestatigung fur Veranstaltung Zwei",
      },
      greeting: "Hallo",
      invitationIntro:
        "Deine personliche Einladungsseite ist bereit. Nutze den sicheren Link unten, um deine Einladungsdetails anzusehen und deine RSVP-Antwort zu senden oder zu aktualisieren.",
      invitedTo: "Eingeladene Veranstaltungen",
      manageRsvp: "RSVP verwalten",
      reminder:
        "Derselbe Link bleibt gultig, damit du spater bei Anderungen erneut zuruckkehren kannst.",
      recoveryIntro:
        "Es wurde eine Anfrage gestellt, deinen Einladungslink erneut zu senden. Nutze den sicheren Link unten, um wieder auf deinen privaten Bereich zuzugreifen.",
      confirmationIntro:
        "Vielen Dank fur deine Zusage. Deine Veranstaltungsdetails und dein RSVP-Aktualisierungslink sind unten enthalten.",
    },
  },
};

export function getDictionary(locale?: string | null) {
  return dictionaries[(locale as Locale) ?? defaultLocale] ?? dictionaries.en;
}
