// components/layout/LanguageSwitcher.tsx
"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const locales = [
  { code: "en", name: "Eng" },
  { code: "es", name: "Spa" },
  { code: "ru", name: "Rus" },
];

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Replace current locale in pathname
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex ">
      {locales.map(locale => (
        <Button
          variant="link"
          key={locale.code}
          onClick={() => handleLanguageChange(locale.code)}
          size="sm"
        >
          <span
            className={
              currentLocale === locale.code ? "text-white" : "text-gray-700"
            }
          >
            {locale.name}
          </span>
        </Button>
      ))}
    </div>
  );
}
