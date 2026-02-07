import { ja } from './ja';
import { en } from './en';

export type Lang = 'ja' | 'en';

export const translations = {
  ja,
  en,
};

export function getLangFromUrl(url: URL): Lang {
  const pathname = url.pathname;
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'ja';
}

export function t(key: string, lang: Lang): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value ?? key;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'ja' ? 'en' : 'ja';
}

export function getAlternateUrl(currentUrl: URL, lang: Lang): string {
  const pathname = currentUrl.pathname;
  const currentLang = getLangFromUrl(currentUrl);
  
  if (currentLang === lang) {
    return pathname;
  }
  
  if (currentLang === 'ja') {
    return pathname.replace(/^\/ja/, '/en') || '/en/';
  } else {
    return pathname.replace(/^\/en/, '/ja') || '/ja/';
  }
}
