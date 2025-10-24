// components/layout/Footer.tsx
"use client";

import LanguageSwitcher from "./LanguageSwitcher";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-500">
          © {currentYear} iHome Realty. All rights reserved.
        </p>
        {/* Language Switcher */}
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </footer>
  );
}
