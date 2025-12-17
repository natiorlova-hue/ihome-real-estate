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
      about: (await import(`./locales/${locale}/about.json`)).default,
      common: (await import(`./locales/${locale}/common.json`)).default,
      footer: (await import(`./locales/${locale}/footer.json`)).default,
      forms: (await import(`./locales/${locale}/forms.json`)).default,
      guides: (await import(`./locales/${locale}/guides.json`)).default,
      home: (await import(`./locales/${locale}/home.json`)).default,
      navigation: (await import(`./locales/${locale}/navigation.json`)).default,
      properties: (await import(`./locales/${locale}/properties.json`)).default,
      taxonomy: (await import(`./locales/${locale}/taxonomy.json`)).default,
      comingSoon: (await import(`./locales/${locale}/coming-soon.json`))
        .default,
      quiz: (await import(`./locales/${locale}/quiz.json`)).default,
    },
  };
});
