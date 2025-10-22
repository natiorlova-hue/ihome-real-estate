// components/layout/LanguageSwitcher.tsx
"use client"

import { usePathname, useRouter } from "next/navigation"
import { Languages, Check } from "lucide-react"

const locales = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
]

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    // Replace current locale in pathname
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  const currentLanguage = locales.find((l) => l.code === currentLocale)

  return (
    <div className="relative group">
      {/* Current Language Button */}
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Languages className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700 hidden md:inline">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => handleLanguageChange(locale.code)}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                currentLocale === locale.code
                  ? "bg-terracotta-50 text-terracotta-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{locale.flag}</span>
                <span>{locale.name}</span>
              </span>
              {currentLocale === locale.code && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
