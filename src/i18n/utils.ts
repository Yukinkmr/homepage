import { ja } from './ja';
import { en } from './en';

export type Lang = 'ja' | 'en';

export const translations = {
  ja,
  en,
};

export function getLangFromUrl(url: URL): Lang {
  const pathname = url.pathname;
  if (pathname.includes('/en/') || pathname.endsWith('/en')) {
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

/** base 付きの絶対パスを返す（GitHub Pages などサブパスデプロイ用） */
export function withBase(base: string, path: string): string {
  const p = path.startsWith('/') ? path.slice(1) : path;
  return base.replace(/\/$/, '') + '/' + p;
}

export function getAlternateUrl(currentUrl: URL, lang: Lang, base = ''): string {
  const pathname = currentUrl.pathname;
  const currentLang = getLangFromUrl(currentUrl);
  if (currentLang === lang) return pathname;
  const baseNorm = base.replace(/\/$/, '');
  const from = baseNorm ? `${baseNorm}/${currentLang}` : `/${currentLang}`;
  const to = baseNorm ? `${baseNorm}/${lang}` : `/${lang}`;
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const next = pathname.replace(new RegExp(`^${escaped}`), to);
  return next || (baseNorm ? `${baseNorm}/${lang}/` : `/${lang}/`);
}
