import { withLocale, type Locale } from "@/lib/locale-path";

// Експортуємо константу, щоб використовувати її в інших місцях при потребі
export const COMING_SOON_PATH = "coming-soon";

type NavStatus = "active" | "comingSoon";
type NavLike = { href: string; status?: NavStatus | string }; // string added for wider compatibility

function normalizeHref(href: string) {
  if (!href) return "/";
  // Прибираємо подвійні слеші, якщо вони раптом з'являться
  const cleanHref = href.startsWith("/") ? href.slice(1) : href;
  return `/${cleanHref}`;
}

export function resolveNavHref(locale: Locale, item: NavLike) {
  // Якщо статус comingSoon - переписуємо шлях
  const targetHref =
    item.status === "comingSoon" ? COMING_SOON_PATH : item.href;

  return withLocale(locale, normalizeHref(targetHref));
}
