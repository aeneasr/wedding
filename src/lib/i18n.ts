import {
  defaultLocale,
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
  guest: {
    rsvp: string;
    details: string;
    update: string;
    privateAccess: string;
    logout: string;
    schedule: string;
    logistics: string;
    status: string;
    responsePending: string;
    responseAttending: string;
    responseDeclined: string;
    backToOverview: string;
    securedByLink: string;
    addToCalendar: string;
    dietaryRequirements: string;
    phoneNumber: string;
    fullName: string;
    personType: string;
    adult: string;
    child: string;
    yes: string;
    no: string;
    attending: string;
    notAttending: string;
    saveRsvp: string;
    saved: string;
    recoverLink: string;
    primaryGuest: string;
    householdMember: string;
    updateHint: string;
    summaryLead: string;
    venue: string;
    address: string;
    timing: string;
    saveError: string;
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
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    localeLabel: "English",
    switchTo: {
      en: "English",
      de: "German",
    },
    landing: {
      eyebrow: "Wedding invitation",
      title: "Your wedding invitation and RSVP",
      description:
        "Use your personal invitation link to see the celebrations on your invitation, send your RSVP, and return later if your plans change.",
      primaryCta: "Open invitation",
      recoverCta: "Find my invitation link",
      emailPrivacyNote: "Invitation links are shared privately by email",
      imageAlt:
        "Wedding invitation for Anna and Aeneas with the message We're getting married and the date 22.08.2026.",
      imageLabel: "Wedding invitation artwork",
      privacyTitle: "Shared only with invited guests",
      privacyBody:
        "Each invitation link opens only the celebrations and details meant for that guest or household.",
      features: [
        "Reply separately for each wedding event",
        "Return with the same invitation link if plans change",
        "See the practical details that belong to your invitation",
      ],
    },
    recover: {
      title: "Find your invitation link",
      description:
        "Enter the email address used for your invitation and we will send the same link again if we find a match.",
      emailLabel: "Invitation email address",
      submit: "Send invitation link",
      missingEmail: "Enter the email address associated with your invitation.",
      neutralSuccess:
        "If that email address matches an invitation, we have sent the link again.",
      helpEyebrow: "Invitation help",
      helpTitle: "We can only resend an existing invitation",
      helpBody:
        "If the email address matches one already on the guest list, we will send the same invitation link again.",
    },
    guest: {
      rsvp: "RSVP",
      details: "Details",
      update: "Change reply",
      privateAccess: "Your invitation",
      logout: "Logout",
      schedule: "Schedule",
      logistics: "Practical information",
      status: "Status",
      responsePending: "Pending",
      responseAttending: "Attending",
      responseDeclined: "Declined",
      backToOverview: "Back to invitation",
      securedByLink: "Keep your invitation link handy.",
      addToCalendar: "Add to calendar",
      dietaryRequirements: "Dietary requirements",
      phoneNumber: "Phone number",
      fullName: "Full name",
      personType: "Person type",
      adult: "Adult",
      child: "Child",
      yes: "Yes",
      no: "No",
      attending: "Attending",
      notAttending: "Not attending",
      saveRsvp: "Save RSVP",
      saved: "Your RSVP has been saved.",
      recoverLink: "Find invitation link",
      primaryGuest: "Primary guest",
      householdMember: "Household member",
      updateHint:
        "Use that same link any time you need to change your reply.",
      summaryLead: "Welcome to your wedding invitation.",
      venue: "Venue",
      address: "Address",
      timing: "Timing",
      saveError: "Unable to save your RSVP right now.",
    },
    admin: {
      loginTitle: "Admin access",
      loginDescription:
        "Use the shared organizer password to manage invitations and RSVP data.",
    },
    errors: {
      linkEyebrow: "Invitation link",
      invalidLinkTitle: "This invitation link is not working",
      invalidLinkBody:
        "This link is no longer valid. Enter the email address on your invitation and we will send you the latest link.",
      expiredLinkTitle: "This invitation has closed",
      expiredLinkBody:
        "This invitation link is no longer active because the celebrations on it have already taken place.",
      setupTitle: "Configuration required",
      setupBody:
        "The application is missing one or more required environment variables.",
    },
    emails: {
      invitationSubject: "Your wedding invitation",
      recoverySubject: "Your wedding invitation link",
      confirmationSubject: "Your RSVP for the Wedding Celebration",
      greeting: "Hello",
      invitationIntro:
        "Use the link below to open your invitation, see your celebration details, and send or update your RSVP.",
      manageRsvp: "Open invitation",
      reminder:
        "Keep this email so you can return with the same link if your plans change.",
      recoveryIntro:
        "You asked us to resend your invitation link. Use the link below to reopen your invitation and RSVP whenever you are ready.",
      confirmationIntro:
        "Thank you for replying. Your event details and invitation link are included below.",
    },
  },
  de: {
    localeLabel: "Deutsch",
    switchTo: {
      en: "Englisch",
      de: "Deutsch",
    },
    landing: {
      eyebrow: "Hochzeitseinladung",
      title: "Deine Hochzeitseinladung und RSVP",
      description:
        "Mit deinem persönlichen Einladungslink kannst du uns deine Zu- oder Absage mitteilen und später bei Bedarf Änderungen vornehmen.",
      primaryCta: "Einladung öffnen",
      recoverCta: "Meinen Einladungslink finden",
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
      submit: "Einladungslink senden",
      missingEmail: "Gib die E-Mail-Adresse ein, die zu deiner Einladung gehört.",
      neutralSuccess:
        "Wenn diese E-Mail-Adresse zu einer Einladung gehört, haben wir den Link erneut gesendet.",
      helpEyebrow: "Hilfe zur Einladung",
      helpTitle: "Wir können nur eine bestehende Einladung erneut senden",
      helpBody:
        "Wenn die E-Mail-Adresse bereits auf der Gästeliste steht, schicken wir denselben Einladungslink erneut.",
    },
    guest: {
      rsvp: "RSVP",
      details: "Details",
      update: "Antwort ändern",
      privateAccess: "Deine Einladung",
      logout: "Abmelden",
      schedule: "Ablauf",
      logistics: "Praktische Informationen",
      status: "Status",
      responsePending: "Ausstehend",
      responseAttending: "Zugesagt",
      responseDeclined: "Abgesagt",
      backToOverview: "Zurück zur Einladung",
      securedByLink: "Beware deinen Einladungslink gut auf.",
      addToCalendar: "Zum Kalender hinzufügen",
      dietaryRequirements: "Ernährungswünsche",
      phoneNumber: "Telefonnummer",
      fullName: "Vollständiger Name",
      personType: "Personentyp",
      adult: "Erwachsen",
      child: "Kind",
      yes: "Ja",
      no: "Nein",
      attending: "Dabei",
      notAttending: "Nicht dabei",
      saveRsvp: "RSVP speichern",
      saved: "Deine RSVP wurde gespeichert.",
      recoverLink: "Einladungslink finden",
      primaryGuest: "Hauptgast",
      householdMember: "Haushaltsmitglied",
      updateHint:
        "Mit dem Einladungs-Link kannst du deine Antworten jederzeit ändern.",
      summaryLead: "Schön, dass du dabei bist.",
      venue: "Ort",
      address: "Adresse",
      timing: "Zeit",
      saveError: "Deine RSVP kann gerade nicht gespeichert werden.",
    },
    admin: {
      loginTitle: "Admin-Zugang",
      loginDescription:
        "Bitte gib das Passwort ein.",
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
    },
  },
};

export function getDictionary(locale?: string | null) {
  return dictionaries[(locale as Locale) ?? defaultLocale] ?? dictionaries[defaultLocale];
}
