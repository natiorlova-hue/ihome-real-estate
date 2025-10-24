// app/[locale]/layout.tsx
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/header";
import type { Metadata } from "next";
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

  return (
    <html
      lang={locale}
      className={`${notoSerif.variable} ${notoSans.variable}`}
    >
      <body className="font-sans antialiased">
        {/* БЕЗ NextIntlClientProvider! */}
        <Header locale={locale} />
        <main className="min-h-screen">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
