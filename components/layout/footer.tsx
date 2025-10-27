import { MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#13151B] text-gray-500">
      <div className="container">
        <div className="flex items-center justify-between py-18">
          <div className="flex flex-col items-end gap-4 ml-auto">
            <div className="flex items-center gap-4">
              <span>+ 34 645 961 747</span>
              <a
                href="https://wa.me/34645961747"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/ihome_realty"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/cookie-policy">Cookies Policy</Link>
              <Link href="/terms-conditions">Terms & Conditions</Link>
            </div>
            <LanguageSwitcher currentLocale={locale} />
            <p className="text-sm text-gray-500">
              © {currentYear} iHome. Website by Prakhova Studios
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
