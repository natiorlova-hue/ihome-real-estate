// components/layout/footer/Footer.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import FooterLink from "./FooterLink";

export default async function Footer({ locale }: { locale: string }) {
  const tNav = await getTranslations({
    locale,
    namespace: "navigation.header.nav",
  });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const currentYear = new Date().getFullYear();

  // СУВОРО: Тільки ці 5 пунктів, як ти просив
  const menuConfig = [
    { id: "home", href: "/" },
    { id: "forYou", href: "/live-your-way" },
    { id: "properties", href: "/properties" },
    { id: "guides", href: "/guides" },
    { id: "ourWay", href: "/our-way" },
  ] as const;

  return (
    <footer className="bg-[#13151B] text-gray-400 font-sans py-2 md:py-6">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-8">
          {/* Left: EXACT Header Duplicate Menu */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center gap-6 lg:gap-10 text-sm md:text-base">
              {menuConfig.map(item => (
                <li key={item.id}>
                  <FooterLink href={item.href} label={tNav(item.id as any)} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Contact & Legal */}
          <div className="flex flex-col items-start lg:items-end gap-1 text-sm">
            <div className="flex items-center gap-4">
              <span className="text-white font-medium text-base tracking-wide">
                + 34 645 961 747
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/34645961747"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#25D366" />
                    <path
                      d="M12.003 5.485c-3.597 0-6.518 2.921-6.518 6.518 0 1.148.301 2.224.824 3.147l-.824 3.365 3.495-.862c.903.483 1.933.766 3.023.766 3.597 0 6.517-2.921 6.517-6.517 0-3.597-2.92-6.517-6.517-6.517z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  href="https://t.me/ihome_realty"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#24A1DE" />
                    <path
                      d="M5.445 11.666c4.388-1.912 7.315-3.174 8.78-3.784 4.184-1.741 5.053-2.043 5.62-2.053.124-.002.403.028.583.175.151.124.194.292.215.409.021.116.047.38.026.586-.239 2.352-1.258 8.343-1.781 11.114-.221 1.172-.653 1.566-1.07 1.604-.91.082-1.602-.603-2.483-1.181-1.377-.903-2.154-1.466-3.491-2.347-1.544-1.018-.543-1.577.338-2.491.231-.24 4.243-3.885 4.321-4.217.01-.041.018-.197-.074-.279-.092-.082-.227-.054-.325-.031-.139.032-2.361 1.5-6.666 4.407-.631.433-1.203.645-1.718.634-.568-.012-1.657-.32-2.467-.583-.993-.323-1.783-.495-1.715-1.044.036-.286.436-.577 1.907-.919z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Legal Links (Тільки ті, що точно є в JSON) */}
            <nav
              aria-label="Legal"
              className="flex items-center gap-4 lg:gap-6 mt-2"
            >
              {["privacy", "cookies", "terms"].map(key => (
                <Link
                  key={key}
                  href={`/${key}-policy` as any}
                  className="hover:text-gray-200"
                >
                  {tFooter(`links.${key}` as any)}
                </Link>
              ))}
            </nav>

            <div className="mt-1 flex justify-end">
              <LanguageSwitcher currentLocale={locale} />
            </div>

            <p className="text-gray-600 mt-2 text-xs md:text-sm text-center lg:text-right">
              © {currentYear}{" "}
              {tFooter("rights").replace("2025", currentYear.toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
