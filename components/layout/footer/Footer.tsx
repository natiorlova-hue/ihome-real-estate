import { MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#13151B] text-gray-500">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between py-18 gap-8 md:gap-0">
          {/* Socials & Contact */}
          <div className="flex flex-col items-center md:items-end gap-4 ml-auto w-full md:w-auto">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-medium">
                + 34 645 961 747
              </span>
              <a
                href="https://wa.me/34645961747"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/ihome_realty"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Contact us on Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>

            {/* Policies */}
            <nav
              className="flex items-center gap-4 text-sm text-gray-500"
              aria-label="Footer Navigation"
            >
              <Link
                href="/privacy-policy"
                className="hover:text-gray-300 transition-colors"
              >
                {t("links.privacy")}
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-gray-300 transition-colors"
              >
                {t("links.cookies")}
              </Link>
              <Link
                href="/terms-conditions"
                className="hover:text-gray-300 transition-colors"
              >
                {t("links.terms")}
              </Link>
            </nav>

            <LanguageSwitcher currentLocale={locale} />

            <p className="text-sm text-gray-600 mt-2 text-center md:text-right">
              {t("rights").replace("2025", currentYear.toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
