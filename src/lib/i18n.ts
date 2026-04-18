import {
  defaultLocale,
  type Locale,
} from "@/src/lib/constants";

type Dictionary = {
  localeLabel: string;
  landing: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    recoverCta: string;
    emailPrivacyNote: string;
    imageAlt: string;
    imageLabel: string;
    privacyTitle: string;
    privacyBody: string;
    features: string[];
  };
  recover: {
    title: string;
    description: string;
    emailLabel: string;
    submit: string;
    missingEmail: string;
    neutralSuccess: string;
    helpEyebrow: string;
    helpTitle: string;
    helpBody: string;
  };
  register: {
    eyebrow: string;
    title: string;
    description: string;
    codeLabel: string;
    codeSubmit: string;
    codeError: string;
    primarySectionTitle: string;
    yourNameLabel: string;
    yourEmailLabel: string;
    phoneLabel: string;
    phoneHint: string;
    dietaryLabel: string;
    dietaryNone: string;
    dietaryMeat: string;
    dietaryVegetarian: string;
    additionalSectionTitle: string;
    addPerson: string;
    removePerson: string;
    adult: string;
    child: string;
    submit: string;
    formError: string;
    thanksTitle: string;
    thanksBody: string;
  };
  guest: {
    details: string;
    update: string;
    privateAccess: string;
    logout: string;
    schedule: string;
    logistics: string;
    responsePending: string;
    responseAttending: string;
    responseDeclined: string;
    backToOverview: string;
    securedByLink: string;
    addToCalendar: string;
    mealPreference: string;
    mealSelectPlaceholder: string;
    mealMeat: string;
    mealVegetarian: string;
    fullName: string;
    adult: string;
    child: string;
    yes: string;
    no: string;
    attending: string;
    notAttending: string;
    saveRsvp: string;
    saved: string;
    recoverLink: string;
    updateHint: string;
    summaryLead: string;
    welcomeSubtitle: string;
    venue: string;
    address: string;
    timing: string;
    saveError: string;
    status: string;
    attendingGuestDetails: string;
    contactPhoneLabel: string;
    contactPhoneHint: string;
  };
  admin: {
    loginTitle: string;
    loginDescription: string;
  };
  errors: {
    linkEyebrow: string;
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
    confirmationSubject: string;
    greeting: string;
    invitationIntro: string;
    manageRsvp: string;
    reminder: string;
    recoveryIntro: string;
    confirmationIntro: string;
    coupleNames: string;
    closing: string;
    headerLabel: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  de: {
    localeLabel: "Deutsch",
    landing: {
      eyebrow: "Hochzeitseinladung",
      title: "Deine Hochzeitseinladung und RSVP",
      description:
        "Mit deinem persönlichen Einladungslink kannst du uns deine Zu- oder Absage mitteilen und später bei Bedarf Änderungen vornehmen.",
      primaryCta: "Einladung öffnen",
      recoverCta: "Einladungslink finden",
      emailPrivacyNote: "Einladungslinks werden privat per E-Mail geteilt",
      imageAlt:
        "Hochzeitseinladung für Anna und Aeneas mit der Botschaft Wir heiraten und dem Datum 22.08.2026.",
      imageLabel: "Darstellung der Hochzeitseinladung",
      privacyTitle: "Nur für eingeladene Gäste",
      privacyBody:
        "Jeder Einladungslink zeigt die Feiern und Informationen, die für den jeweiligen Gast oder Haushalt gedacht sind.",
      features: [
        "Für jede Feier separat antworten",
        "Mit demselben Einladungslink später wiederkommen",
        "Nur die Details sehen, die zu deiner Einladung gehören",
      ],
    },
    recover: {
      title: "Deinen Einladungslink finden",
      description:
        "Gib die E-Mail-Adresse an, die für deine Einladung verwendet wurde. Wenn wir einen Treffer finden, schicken wir dir denselben Link erneut.",
      emailLabel: "E-Mail-Adresse der Einladung",
      submit: "Link senden",
      missingEmail: "Gib die E-Mail-Adresse ein, die zu deiner Einladung gehört.",
      neutralSuccess:
        "Wenn diese E-Mail-Adresse zu einer Einladung gehört, haben wir den Link erneut gesendet.",
      helpEyebrow: "Hinweis",
      helpTitle: "Wir können nur eine bestehende Einladung erneut senden",
      helpBody:
        "Wenn die E-Mail-Adresse bereits auf der Gästeliste steht, schicken wir denselben Einladungslink erneut.",
    },
    register: {
      eyebrow: "Anmeldung",
      title: "Sag uns Bescheid",
      description:
        "Trag dich und deine Begleitung ein. Wir schicken dir anschließend einen Einladungslink an die angegebene E-Mail-Adresse.",
      codeLabel: "Einladungscode",
      codeSubmit: "Weiter",
      codeError: "Der Code stimmt leider nicht.",
      primarySectionTitle: "Deine Angaben",
      yourNameLabel: "Dein vollständiger Name",
      yourEmailLabel: "Deine E-Mail",
      phoneLabel: "Telefonnummer (optional)",
      phoneHint: "Nur für kurzfristige Rücksprachen am Hochzeitstag.",
      dietaryLabel: "Essenswunsch",
      dietaryNone: "Keine Angabe",
      dietaryMeat: "Fleisch",
      dietaryVegetarian: "Vegetarisch",
      additionalSectionTitle: "Weitere Personen",
      addPerson: "Weitere Person hinzufügen",
      removePerson: "Entfernen",
      adult: "Erwachsen",
      child: "Kind",
      submit: "Anmeldung absenden",
      formError: "Bitte überprüfe die markierten Felder.",
      thanksTitle: "Danke!",
      thanksBody:
        "Wir haben dir einen Einladungslink per E-Mail geschickt. Öffne deinen Posteingang, um deine Angaben anzusehen oder zu ändern.",
    },
    guest: {
      details: "Details",
      update: "Antwort ändern",
      privateAccess: "Deine Einladung",
      logout: "Abmelden",
      schedule: "Ablauf",
      logistics: "Praktische Informationen",
      status: "Teilnahme",
      responsePending: "Ausstehend",
      responseAttending: "Zugesagt",
      responseDeclined: "Abgesagt",
      backToOverview: "Zurück zur Einladung",
      securedByLink: "Bewahre deinen Einladungslink gut auf.",
      addToCalendar: "Zum Kalender hinzufügen",
      mealPreference: "Essenswunsch",
      mealSelectPlaceholder: "Bitte wählen …",
      mealMeat: "Fleisch",
      mealVegetarian: "Vegetarisch",
      fullName: "Vollständiger Name",
      adult: "Erwachsen",
      child: "Kind",
      yes: "Ja",
      no: "Nein",
      attending: "Dabei",
      notAttending: "Nicht dabei",
      saveRsvp: "Antwort speichern",
      saved: "Deine Antwort wurde gespeichert.",
      recoverLink: "Einladungslink finden",
      updateHint:
        "Mit dem Einladungs-Link kannst du deine Antworten jederzeit ändern.",
      summaryLead: "{name}",
      welcomeSubtitle:
        "Wir freuen uns, diesen besonderen Tag mit dir zu feiern.",
      venue: "Ort",
      address: "Adresse",
      timing: "Zeit",
      saveError: "Deine Antwort kann gerade nicht gespeichert werden.",
      attendingGuestDetails: "Angaben der Teilnehmenden",
      contactPhoneLabel: "Telefonnummer (optional)",
      contactPhoneHint: "Nur für kurzfristige Rücksprachen.",
    },
    admin: {
      loginTitle: "Admin-Zugang",
      loginDescription: "Bitte gib das Passwort ein.",
    },
    errors: {
      linkEyebrow: "Einladungslink",
      invalidLinkTitle: "Dieser Einladungslink funktioniert nicht mehr",
      invalidLinkBody:
        "Dieser Link ist nicht mehr gültig. Gib die E-Mail-Adresse deiner Einladung ein, dann schicken wir dir den aktuellen Link.",
      expiredLinkTitle: "Diese Einladung ist geschlossen",
      expiredLinkBody:
        "Dieser Einladungslink ist nicht mehr aktiv, weil die darin enthaltenen Feiern bereits vorbei sind.",
      setupTitle: "Konfiguration erforderlich",
      setupBody:
        "Der Anwendung fehlen eine oder mehrere erforderliche Umgebungsvariablen.",
    },
    emails: {
      invitationSubject: "Deine Hochzeitseinladung",
      recoverySubject: "Dein Link zur Hochzeitseinladung",
      confirmationSubject: "Deine RSVP für die Hochzeitsfeier",
      greeting: "Hallo",
      invitationIntro:
        "Nutze den Link unten, um deine Einladung zu öffnen, deine Details anzusehen und deine RSVP zu senden oder zu aktualisieren.",
      manageRsvp: "Einladung öffnen",
      reminder:
        "Behalte diese E-Mail, damit du mit demselben Link später wiederkommen kannst, falls sich deine Pläne ändern.",
      recoveryIntro:
        "Du hast deinen Einladungslink erneut angefordert. Mit dem Link unten kannst du deine Einladung wieder öffnen und antworten, wann immer es für dich passt.",
      confirmationIntro:
        "Danke für deine Antwort. Deine Details und dein Einladungslink stehen unten für dich bereit.",
      coupleNames: "Anna & Aeneas",
      closing: "Mit Liebe,",
      headerLabel: "Hochzeitseinladung",
    },
  },
};

export function getDictionary(locale?: string | null) {
  return dictionaries[(locale as Locale) ?? defaultLocale] ?? dictionaries[defaultLocale];
}
