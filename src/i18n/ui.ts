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
    "theme.toggle": "Farbschema wechseln",
    "lang.switch": "Sprache wechseln",
    "site.title": "Brian Boy",
    "site.description": "Tech-Unternehmer und Musiker",
    "hero.greeting": "Hallo, ich bin",
    "hero.tagline": "Tech-Unternehmer & Musiker",
    "footer.rights": "Alle Rechte vorbehalten.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "theme.toggle": "Toggle theme",
    "lang.switch": "Switch language",
    "site.title": "Brian Boy",
    "site.description": "Tech entrepreneur and musician",
    "hero.greeting": "Hi, I'm",
    "hero.tagline": "Tech Entrepreneur & Musician",
    "footer.rights": "All rights reserved.",
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
