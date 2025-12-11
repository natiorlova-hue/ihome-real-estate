import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "es", "ru"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: {
      common: (await import(`./locales/${locale}/common.json`)).default,
      home: (await import(`./locales/${locale}/home.json`)).default,
      properties: (await import(`./locales/${locale}/properties.json`)).default,
      guides: (await import(`./locales/${locale}/guides.json`)).default,
      forms: (await import(`./locales/${locale}/forms.json`)).default,
    },
  };
});
