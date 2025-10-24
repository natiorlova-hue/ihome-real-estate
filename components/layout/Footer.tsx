import LanguageSwitcher from "./LanguageSwitcher";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#13151B]">
      <div className="container">
        <div className="flex items-center justify-between py-18">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} iHome Realty. All rights reserved.
            </p>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}
