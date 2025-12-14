// lib/locale-path.ts
export type Locale = "en" | "es" | "ru";

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

/**
 * Prefixes internal href with "/{locale}".
 * - "" or "/" => "/{locale}"
 * - "/guides" => "/{locale}/guides"
 * - "guides" => "/{locale}/guides"
 * - external href stays unchanged
 */
export function withLocale(locale: Locale, href: string): string {
  if (!href) return `/${locale}`;
  if (isExternalHref(href)) return href;

  const normalized = href.startsWith("/") ? href : `/${href}`;
  if (normalized === "/") return `/${locale}`;

  return `/${locale}${normalized}`;
}
