// i18n/routing.ts

import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es", "ru"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];

export const pathnames = {
  "/": "/",
  "/coming-soon": "/coming-soon",
  "/lifestyle-quiz": "/lifestyle-quiz",
  "/privacy-policy": "/privacy-policy",
  "/live-your-way/[lifestyle]": "/live-your-way/[lifestyle]",
<<<<<<< HEAD
  "/guides": "/blog",
=======
  "/guides": "/guides",
>>>>>>> 4981c69... fix: post layout
  "/our-way": "/our-way",
  "/properties": "/properties",
  "/properties/[region]": "/properties/[region]",
  "/blog": "/blog",
  "/blog/[slug]": "/blog/[slug]",
  "/terms-conditions": "/terms-conditions",
  "/cookie-policy": "/cookie-policy",
<<<<<<< HEAD
  "/services": "/services",
  "/sell": "/sell",
  "/contact": "/contact",
=======
  "/sell": "/sell",
>>>>>>> 4981c69... fix: post layout
} as const;

export type AppPathname = keyof typeof pathnames;
export const localePrefix = "always" as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  pathnames,
});

// ✅ Експортуємо наші утиліти для використання в компонентах
export const { Link, redirect, permanentRedirect, usePathname, useRouter } =
  createNavigation(routing);
