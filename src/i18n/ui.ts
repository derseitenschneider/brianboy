/**
 * i18n/ui.ts
 *
 * Translation strings and helper functions for bilingual site.
 * German (de) is default, English (en) is secondary.
 */

export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export const defaultLang = "de" as const;

export type Lang = keyof typeof languages;

export const ui = {
  de: {
    "nav.home": "Startseite",
    "nav.about": "Uber mich",
    "nav.menu": "Menu",
    "theme.toggle": "Farbschema wechseln",
    "lang.switch": "Sprache wechseln",
    "site.title": "Brian Boy",
    "site.description": "Tech-Unternehmer und Musiker",
    "hero.greeting": "Hallo, ich bin",
    "hero.tagline": "Tech-Unternehmer & Musiker",
    "footer.rights": "Alle Rechte vorbehalten.",

    // Phase 3: Hero section
    "hero.intro":
      "Tech-Unternehmer und ehemaliger Berufsmusiker aus der Schweiz. Ich baue digitale Produkte, die Menschen im Alltag helfen \u2014 von Webanwendungen bis hin zu SaaS-Plattformen.",
    "hero.cta": "Kontakt aufnehmen",

    // Phase 3: Work section
    "work.title": "Arbeit",
    "work.morntag.name": "Morntag",
    "work.morntag.role": "Mitinhaber",
    "work.morntag.description":
      "Webentwicklungs-Agentur, die massgeschneiderte digitale Produkte und Websites f\u00FCr Unternehmen realisiert.",
    "work.morntag.url": "https://morntag.com",
    "work.eleno.name": "Eleno",
    "work.eleno.role": "Gr\u00FCnder",
    "work.eleno.description":
      "Musikunterrichts-Plattform, die Lehrpersonen bei der Planung, Verwaltung und Durchf\u00FChrung ihres Unterrichts unterst\u00FCtzt.",
    "work.eleno.url": "https://eleno.app",
    "work.pressdify.name": "Pressdify",
    "work.pressdify.role": "Projekt",
    "work.pressdify.description":
      "Tool, das WordPress-Websites in schnelle, sichere statische Seiten verwandelt.",
    "work.pressdify.url": "https://pressdify.com",

    // Phase 3: About page
    "about.title": "\u00DCber mich",
    "about.meta":
      "Brian Boy \u2014 vom Berufsmusiker zum Tech-Unternehmer. Die Geschichte hinter Morntag, Eleno und Pressdify.",
    "about.p1":
      "Musik war mein erster Beruf und f\u00FCr lange Zeit meine ganze Welt. Nach dem Studium an der Musikhochschule spielte ich als Berufsmusiker in verschiedenen Formationen \u2014 unter anderem als festes Mitglied der Schweizer Band Halunke. Wir tourten durch die Deutschschweiz, spielten auf Festivals und nahmen Alben auf. Die B\u00FChne war mein Zuhause, und ich konnte mir nichts anderes vorstellen.",
    "about.p2":
      "Dann kam 2020. Als COVID die Live-Musikszene zum Stillstand brachte, fiel praktisch \u00FCber Nacht alles weg \u2014 Konzerte, Touren, Eink\u00FCnfte. Statt abzuwarten, begann ich, mich selbst\u00E4ndig in die Welt der Softwareentwicklung einzuarbeiten. Was mit Online-Tutorials und kleinen Projekten anfing, wurde schnell zu einer echten Leidenschaft.",
    "about.p3":
      "Zusammen mit einem Partner gr\u00FCndete ich Morntag, eine Webentwicklungs-Agentur. Wir realisierten Websites und digitale Produkte f\u00FCr Unternehmen aller Gr\u00F6ssen. Durch die Arbeit mit verschiedenen Kunden lernte ich nicht nur das Handwerk, sondern auch, wie man Ideen in funktionierende Produkte verwandelt.",
    "about.p4":
      "Aus meiner eigenen Erfahrung als Musiklehrer heraus entstand Eleno \u2014 eine SaaS-Plattform, die Musiklehrpersonen bei der Unterrichtsplanung und -verwaltung unterst\u00FCtzt. Was als pers\u00F6nliches Problem begann, wurde zu einem Produkt, das heute von Lehrpersonen in der ganzen Schweiz genutzt wird.",
    "about.p5":
      "Heute bewege ich mich an der Schnittstelle von Technologie und Kreativit\u00E4t. Ob bei Morntag, Eleno oder mit Nebenprojekten wie Pressdify \u2014 ich baue Dinge, die Menschen im Alltag helfen. Die Musik bleibt ein Teil von mir, aber Code ist meine neue B\u00FChne.",

    // Phase 3: Footer additions
    "footer.email.label": "E-Mail",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.menu": "Menu",
    "theme.toggle": "Toggle theme",
    "lang.switch": "Switch language",
    "site.title": "Brian Boy",
    "site.description": "Tech entrepreneur and musician",
    "hero.greeting": "Hi, I'm",
    "hero.tagline": "Tech Entrepreneur & Musician",
    "footer.rights": "All rights reserved.",

    // Phase 3: Hero section
    "hero.intro":
      "Tech entrepreneur and former professional musician from Switzerland. I build digital products that make people's lives easier \u2014 from web applications to SaaS platforms.",
    "hero.cta": "Get in touch",

    // Phase 3: Work section
    "work.title": "Work",
    "work.morntag.name": "Morntag",
    "work.morntag.role": "Co-Owner",
    "work.morntag.description":
      "Web development agency crafting custom digital products and websites for businesses.",
    "work.morntag.url": "https://morntag.com",
    "work.eleno.name": "Eleno",
    "work.eleno.role": "Founder",
    "work.eleno.description":
      "Music education platform that helps teachers plan, manage, and run their lessons.",
    "work.eleno.url": "https://eleno.app",
    "work.pressdify.name": "Pressdify",
    "work.pressdify.role": "Project",
    "work.pressdify.description":
      "Tool that transforms WordPress sites into fast, secure static pages.",
    "work.pressdify.url": "https://pressdify.com",

    // Phase 3: About page
    "about.title": "About",
    "about.meta":
      "Brian Boy \u2014 from professional musician to tech entrepreneur. The story behind Morntag, Eleno, and Pressdify.",
    "about.p1":
      "Music was my first career and for a long time, my entire world. After studying at the conservatory, I played as a professional musician in various ensembles \u2014 including as a permanent member of the Swiss band Halunke. We toured across German-speaking Switzerland, played festivals, and recorded albums. The stage was my home, and I couldn't imagine doing anything else.",
    "about.p2":
      "Then 2020 happened. When COVID brought the live music scene to a standstill, everything vanished practically overnight \u2014 gigs, tours, income. Instead of waiting it out, I started teaching myself software development. What began with online tutorials and small projects quickly turned into a genuine passion.",
    "about.p3":
      "Together with a partner, I co-founded Morntag, a web development agency. We built websites and digital products for businesses of all sizes. Working with different clients taught me not just the craft, but how to turn ideas into working products.",
    "about.p4":
      "Drawing from my own experience as a music teacher, I created Eleno \u2014 a SaaS platform that helps music teachers plan and manage their lessons. What started as a personal problem became a product used by teachers across Switzerland today.",
    "about.p5":
      "Today I work at the intersection of technology and creativity. Whether at Morntag, Eleno, or side projects like Pressdify \u2014 I build things that help people in their daily lives. Music remains a part of who I am, but code is my new stage.",

    // Phase 3: Footer additions
    "footer.email.label": "Email",
  },
} as const;

type UiKey = keyof (typeof ui)[typeof defaultLang];

/**
 * Extract language from URL path.
 * Returns "en" if path starts with /en/, otherwise "de" (default).
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) {
    return lang as Lang;
  }
  return defaultLang;
}

/**
 * Returns a translation function for the given language.
 * Falls back to default language if key not found.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Generate localized path for a given language.
 * German (default) has no prefix, English uses /en/.
 */
export function getLocalizedPath(lang: Lang, path: string): string {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(de|en)/, "") || "/";

  if (lang === defaultLang) {
    return cleanPath;
  }

  // Add language prefix for non-default language
  return `/${lang}${cleanPath === "/" ? "" : cleanPath}`;
}
