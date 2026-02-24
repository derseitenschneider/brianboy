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
    "site.description": "Software Developer & Musiker aus der Schweiz. Mitinhaber von morntag, Gruender von Eleno.",
    "hero.greeting": "Hallo, ich bin",
    "hero.tagline": "Software Developer & Musiker",
    "footer.rights": "Alle Rechte vorbehalten.",

    // Phase 3: Hero section
    "hero.intro":
      "Software Developer und Musiker aus der Schweiz. Ich baue digitale Produkte, die Menschen im Alltag helfen \u2014 von Webanwendungen bis hin zu SaaS-Plattformen.",
    "hero.cta": "Kontakt aufnehmen",

    // Phase 3: Work section
    "work.title": "Arbeit",
    "work.morntag.name": "morntag",
    "work.morntag.role": "Mitinhaber",
    "work.morntag.description":
      "Content-First-Agentur f\u00FCr Publisher und Unternehmen \u2014 WordPress-L\u00F6sungen, Webshops und Multi-Channel-Publishing.",
    "work.morntag.url": "https://morntag.com",
    "work.eleno.name": "Eleno",
    "work.eleno.role": "Gr\u00FCnder",
    "work.eleno.description":
      "Musikunterrichts-Plattform, die Lehrpersonen bei der Planung, Verwaltung und Durchf\u00FChrung ihres Unterrichts unterst\u00FCtzt.",
    "work.eleno.url": "https://eleno.net",
    "work.pressdify.name": "pressdify",
    "work.pressdify.role": "morntag-Projekt",
    "work.pressdify.description":
      "WordPress-Plugin, das Blogbeiträge und Custom Post Types in professionelle PDFs verwandelt — mit PrintCSS, in Sekunden.",
    "work.pressdify.url": "https://pressdify.com",

    // Phase 3: About page
    "about.title": "\u00DCber mich",
    "about.meta":
      "Brian Boy \u2014 Musiker und Software Developer. Die Geschichte hinter morntag, Eleno und pressdify.",
    "about.p1":
      "Angefangen hat alles mit der Musik \u2014 Jazzgitarre-Bachelorstudium und Master in Musikp\u00E4dagogik an der ZHdK, dann Jahre als Berufsmusiker in verschiedenen Formationen. Seit 2023 spiele ich bei der Schweizer Band Halunke, daneben bei weiteren Projekten, Ch\u00F6ren und als Sideman.",
    "about.p2":
      "Dann kam 2020. Als COVID die Live-Musikszene zum Stillstand brachte, fiel praktisch \u00FCber Nacht alles weg \u2014 Konzerte, Touren, Eink\u00FCnfte. Statt abzuwarten, begann ich, mich selbst\u00E4ndig in die Welt der Softwareentwicklung einzuarbeiten. Was mit Online-Tutorials und kleinen Projekten anfing, wurde schnell zu einer echten Leidenschaft.",
    "about.p3":
      "Seit 2022 bin ich Mitinhaber von morntag, einer Content-First-Agentur aus Brugg. Wir helfen Publishern und Unternehmen mit WordPress-L\u00F6sungen, Webshops und Multi-Channel-Publishing \u2014 damit die richtigen Inhalte zur richtigen Zeit im richtigen Kanal ankommen.",
    "about.p4":
      "Aus meiner eigenen Erfahrung als Musiklehrer heraus entstand Eleno \u2014 eine SaaS-Plattform, die Musiklehrpersonen bei der Unterrichtsplanung und -verwaltung unterst\u00FCtzt. Was als pers\u00F6nliches Problem begann, wurde zu einem Produkt, das heute von Lehrpersonen in der ganzen Schweiz genutzt wird.",
    "about.p5":
      "Heute bewege ich mich zwischen Code und Musik, zwischen Agenturalltag und B\u00FChne. Ich baue digitale Produkte, die Menschen im Alltag helfen \u2014 und stehe abends auch mal auf der B\u00FChne.",

    // Phase 3: Footer additions
    "footer.email.label": "E-Mail",

    // Phase 4: SEO metadata
    "seo.home.title": "Brian Boy | Software Developer & Musiker",
    "seo.about.title": "Uber mich — Brian Boy | Software Developer & Musiker",
    "seo.about.description": "Vom Musiker zum Software Developer — die Geschichte hinter morntag, Eleno und pressdify.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.menu": "Menu",
    "theme.toggle": "Toggle theme",
    "lang.switch": "Switch language",
    "site.title": "Brian Boy",
    "site.description": "Software Developer & Musician from Switzerland. Co-owner of morntag, founder of Eleno.",
    "hero.greeting": "Hi, I'm",
    "hero.tagline": "Software Developer & Musician",
    "footer.rights": "All rights reserved.",

    // Phase 3: Hero section
    "hero.intro":
      "Software developer and musician from Switzerland. I build digital products that make people's lives easier \u2014 from web applications to SaaS platforms.",
    "hero.cta": "Get in touch",

    // Phase 3: Work section
    "work.title": "Work",
    "work.morntag.name": "morntag",
    "work.morntag.role": "Co-Owner",
    "work.morntag.description":
      "Content-first agency for publishers and businesses \u2014 WordPress solutions, webshops, and multi-channel publishing.",
    "work.morntag.url": "https://morntag.com",
    "work.eleno.name": "Eleno",
    "work.eleno.role": "Founder",
    "work.eleno.description":
      "Music education platform that helps teachers plan, manage, and run their lessons.",
    "work.eleno.url": "https://eleno.net",
    "work.pressdify.name": "pressdify",
    "work.pressdify.role": "morntag Project",
    "work.pressdify.description":
      "WordPress plugin that turns blog posts and custom post types into professional PDFs — powered by PrintCSS, in seconds.",
    "work.pressdify.url": "https://pressdify.com",

    // Phase 3: About page
    "about.title": "About",
    "about.meta":
      "Brian Boy \u2014 musician and software developer. The story behind morntag, Eleno, and pressdify.",
    "about.p1":
      "I started out as a musician \u2014 Jazz Guitar bachelor\u2019s and Music Pedagogy master\u2019s at ZHdK, then years of playing in various ensembles. Since 2023, I\u2019ve been with the Swiss band Halunke, alongside other projects, choirs, and sideman gigs.",
    "about.p2":
      "Then 2020 happened. When COVID brought the live music scene to a standstill, everything vanished practically overnight \u2014 gigs, tours, income. Instead of waiting it out, I started teaching myself software development. What began with online tutorials and small projects quickly turned into a genuine passion.",
    "about.p3":
      "Since 2022, I\u2019ve been a co-owner of morntag, a content-first agency based in Brugg. We help publishers and businesses with WordPress solutions, webshops, and multi-channel publishing \u2014 getting the right content to the right audience at the right time.",
    "about.p4":
      "Drawing from my own experience as a music teacher, I created Eleno \u2014 a SaaS platform that helps music teachers plan and manage their lessons. What started as a personal problem became a product used by teachers across Switzerland today.",
    "about.p5":
      "Today I split my time between code and music, between agency work and the stage. I build digital products that help people in their daily lives \u2014 and still play gigs in the evenings.",

    // Phase 3: Footer additions
    "footer.email.label": "Email",

    // Phase 4: SEO metadata
    "seo.home.title": "Brian Boy | Software Developer & Musician",
    "seo.about.title": "About — Brian Boy | Software Developer & Musician",
    "seo.about.description": "From musician to software developer — the story behind morntag, Eleno, and pressdify.",
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
