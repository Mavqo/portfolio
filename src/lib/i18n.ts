/**
 * i18n Utility Module
 * 
 * Provides type-safe translation functionality for the Astro portfolio.
 * Supports nested keys with dot notation, fallback to Italian, and
 * client-side language switching.
 */

// ============================================================================
// TYPES
// ============================================================================

export type Language = 'it' | 'de' | 'en';

export const DEFAULT_LANGUAGE: Language = 'en';
export const SUPPORTED_LANGUAGES: Language[] = ['it', 'en'];

// Translation data structure
export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    work: string;
    about: string;
    contact: string;
  };
  hero: {
    label: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    techStack: string;
  };
  problems: {
    label: string;
    headline: string;
    description: string;
    cards: {
      website: { title: string; description: string };
      time: { title: string; description: string };
      tech: { title: string; description: string };
    };
  };
  services: {
    label: string;
    headline: string;
    description: string;
    web: {
      tag: string;
      title: string;
      description: string;
      features: string[];
    };
    automation: {
      tag: string;
      title: string;
      description: string;
      features: string[];
    };
  };
  process: {
    label: string;
    headline: string;
    description: string;
    steps: {
      '1': { title: string; description: string };
      '2': { title: string; description: string };
      '3': { title: string; description: string };
    };
  };
  projects: {
    label: string;
    headline: string;
    description: string;
    items: {
      osteria: { title: string; description: string; cta: string };
      crm: { title: string; description: string };
      dashboard: { title: string; description: string };
    };
    comingSoon: string;
  };
  about: {
    headline: string;
    paragraphs: string[];
  };
  contact: {
    headline: string;
    description: string;
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      error: string;
    };
    success: {
      title: string;
      message: string;
    };
  };
  footer: {
    copyright: string;
  };
}

// ============================================================================
// STORAGE KEYS
// ============================================================================

const LANGUAGE_STORAGE_KEY = 'language';

// ============================================================================
// CACHE
// ============================================================================

const translationCache: Partial<Record<Language, Translations>> = {};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the stored language from localStorage
 * Falls back to browser language or default
 */
export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }
  
  // Try to detect from browser
  const browserLang = navigator.language.slice(0, 2) as Language;
  if (SUPPORTED_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * Store language preference in localStorage
 */
export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

/**
 * Load translations for a specific language
 * Falls back to default language if loading fails
 */
export async function loadTranslations(lang: Language): Promise<Translations> {
  // Return from cache if available
  if (translationCache[lang]) {
    return translationCache[lang]!;
  }
  
  try {
    const response = await fetch(`/i18n/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    const data = await response.json() as Translations;
    translationCache[lang] = data;
    return data;
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}, falling back to ${DEFAULT_LANGUAGE}`);
    
    // Try to load default language
    if (lang !== DEFAULT_LANGUAGE) {
      return loadTranslations(DEFAULT_LANGUAGE);
    }
    
    throw error;
  }
}

/**
 * Get a nested value from an object using dot notation
 * Example: getNestedValue(obj, 'hero.headline') => obj.hero.headline
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current === null || current === undefined) return undefined;
    return (current as Record<string, unknown>)[key];
  }, obj);
}

/**
 * Translate a key using dot notation
 * Falls back to default language if key is not found
 * Returns the key itself if no translation is found
 */
export function t(
  translations: Translations | null,
  key: string,
  fallback?: string
): string {
  if (!translations) {
    return fallback || key;
  }
  
  const value = getNestedValue(translations as Record<string, unknown>, key);
  
  if (typeof value === 'string') {
    return value;
  }
  
  return fallback || key;
}

/**
 * Get an array translation
 */
export function tArray(
  translations: Translations | null,
  key: string
): string[] {
  if (!translations) return [];
  
  const value = getNestedValue(translations as Record<string, unknown>, key);
  
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  
  return [];
}

// ============================================================================
// CLIENT-SIDE TRANSLATION APPLIER
// ============================================================================

/**
 * Apply translations to all elements with data-i18n attributes
 */
export function applyTranslations(translations: Translations): void {
  if (typeof document === 'undefined') return;
  
  // Update HTML lang attribute
  const html = document.documentElement;
  const lang = getStoredLanguage();
  html.setAttribute('lang', lang);
  
  // Apply text content translations
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translated = t(translations, key);
      if (translated !== key) {
        el.textContent = translated;
      }
    }
  });
  
  // Apply placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      const translated = t(translations, key);
      if (translated !== key) {
        (el as HTMLInputElement | HTMLTextAreaElement).placeholder = translated;
      }
    }
  });
  
  // Apply aria-label translations
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      const translated = t(translations, key);
      if (translated !== key) {
        el.setAttribute('aria-label', translated);
      }
    }
  });
  
  // Update meta tags
  updateMetaTags(translations);
}

/**
 * Update meta tags based on translations
 */
function updateMetaTags(translations: Translations): void {
  if (typeof document === 'undefined') return;
  
  const title = translations.meta?.title;
  const description = translations.meta?.description;
  
  if (title) {
    document.title = title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    ogTitle?.setAttribute('content', title);
    twitterTitle?.setAttribute('content', title);
  }
  
  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    metaDesc?.setAttribute('content', description);
    ogDesc?.setAttribute('content', description);
    twitterDesc?.setAttribute('content', description);
  }
}

/**
 * Initialize translations on page load
 * Should be called in the main layout script
 */
export async function initI18n(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const lang = getStoredLanguage();
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  
  // Dispatch event for other scripts
  window.dispatchEvent(new CustomEvent('i18n:ready', { detail: { lang, translations } }));
}

// ============================================================================
// LANGUAGE SWITCHER
// ============================================================================

/**
 * Change the current language and reapply translations
 */
export async function changeLanguage(lang: Language): Promise<void> {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.error(`Unsupported language: ${lang}`);
    return;
  }
  
  setStoredLanguage(lang);
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  
  // Dispatch event
  window.dispatchEvent(new CustomEvent('i18n:languageChanged', { detail: { lang, translations } }));
}

// ============================================================================
// TYPE DECLARATIONS FOR WINDOW
// ============================================================================

declare global {
  interface Window {
    i18n?: {
      t: (key: string, fallback?: string) => string;
      changeLanguage: (lang: Language) => Promise<void>;
      getLanguage: () => Language;
      translations: Translations | null;
      isReady: () => boolean;
    };
  }
}
