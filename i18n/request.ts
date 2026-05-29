// i18n/request.ts

import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "./routing";

const defaultLocale = "en" satisfies Locale;

const namespaces = [
  "about",
  "common",
  "footer",
  "forms",
  "guides",
  "home",
  "navigation",
  "properties",
  "taxonomy",
  "comingSoon",
  "quiz",
  "ourWay",
  "liveYourWay",
  "services",
] as const;

type Namespace = (typeof namespaces)[number];

type MessageValue =
  | string
  | number
  | boolean
  | null
  | MessageObject
  | MessageValue[];

type MessageObject = {
  [key: string]: MessageValue;
};

type Messages = Record<Namespace, MessageObject>;

const namespaceFileMap = {
  about: "about",
  common: "common",
  footer: "footer",
  forms: "forms",
  guides: "guides",
  home: "home",
  navigation: "navigation",
  properties: "properties",
  taxonomy: "taxonomy",
  comingSoon: "coming-soon",
  quiz: "quiz",
  ourWay: "our-way",
  liveYourWay: "live-your-way",
  services: "services",
} as const satisfies Record<Namespace, string>;

function isMessageObject(value: unknown): value is MessageObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeMessages(
  defaultMessages: MessageObject,
  localeMessages: MessageObject
): MessageObject {
  const mergedMessages: MessageObject = { ...defaultMessages };

  for (const [key, localeValue] of Object.entries(localeMessages)) {
    const defaultValue = mergedMessages[key];

    if (isMessageObject(defaultValue) && isMessageObject(localeValue)) {
      mergedMessages[key] = mergeMessages(defaultValue, localeValue);
      continue;
    }

    mergedMessages[key] = localeValue;
  }

  return mergedMessages;
}

async function importMessages(
  locale: Locale,
  namespace: Namespace
): Promise<MessageObject> {
  const fileName = namespaceFileMap[namespace];

  try {
    const importedMessages = (await import(
      `./locales/${locale}/${fileName}.json`
    )) as {
      default: MessageObject;
    };

    return importedMessages.default;
  } catch {
    return {};
  }
}

async function loadNamespace(
  locale: Locale,
  namespace: Namespace
): Promise<MessageObject> {
  const defaultMessages = await importMessages(defaultLocale, namespace);

  if (locale === defaultLocale) {
    return defaultMessages;
  }

  const localeMessages = await importMessages(locale, namespace);

  return mergeMessages(defaultMessages, localeMessages);
}

async function loadMessages(locale: Locale): Promise<Messages> {
  const entries = await Promise.all(
    namespaces.map(async namespace => {
      const messages = await loadNamespace(locale, namespace);

      return [namespace, messages] as const;
    })
  );

  return Object.fromEntries(entries) as Messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: await loadMessages(locale as Locale),
  };
});
