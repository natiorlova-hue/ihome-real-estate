// app/[locale]/layout.tsx
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import CookieConsentBanner from "@/components/legal/CookieConsentBanner";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-sans",
  display: "swap",
});

const locales = ["en", "es", "ru"] as const;
type Locale = (typeof locales)[number];

export const cookies = {
  name: "cookieConsent",
  options: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  },
};

export const metadata: Metadata = {
  title: "iHome Realty - Premium Costa del Sol Properties",
  description:
    "Discover lifestyle-focused real estate on the Costa del Sol. Homes for families, nomads, retirees, and investors.",
  icons: {
    icon: "/favicon.ico", // Path relative to public directory
  },
};

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${notoSerif.variable} ${notoSans.variable} h-full`}
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <main className="min-h-screen flex flex-col pt-16 md:pt-20">
            <Header locale={locale} />
            <div className="flex-grow">{children}</div>
            <Footer locale={locale} />
          </main>
          <CookieConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
