import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"

export const locales = ["en", "es", "ru"] as const
export const defaultLocale = "en"
export type Locale = (typeof locales)[number]

export default getRequestConfig(({ locale }) => {
  // validate locale
  if (!locale || !locales.includes(locale as Locale)) notFound()

  return {
    locale,
    messages: import(`./messages/${locale}.json`).then((mod) => mod.default),
  }
})
