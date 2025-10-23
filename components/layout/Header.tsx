// components/layout/Header.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  locale: string
}

const translations: Record<string, {
  home: string
  properties: string
  services: string
  guides: string
  ourWay: string
  letsTalk: string
}> = {
  en: {
    home: "Home",
    properties: "Properties",
    services: "Services",
    guides: "Guides & Stories",
    ourWay: "Our Way",
    letsTalk: "Let's talk!",
  },
  es: {
    home: "Inicio",
    properties: "Propiedades",
    services: "Servicios",
    guides: "Guías",
    ourWay: "Nuestro Método",
    letsTalk: "¡Hablemos!",
  },
  ru: {
    home: "Главная",
    properties: "Недвижимость",
    services: "Услуги",
    guides: "Руководства",
    ourWay: "Наш Подход",
    letsTalk: "Поговорим!",
  },
}

export default function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = translations[locale] || translations.en

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  console.log("Header rendered, locale:", locale)
  console.log("Current pathname:", pathname)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-md" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-2 z-10"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-terracotta-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">iH</span>
              </div>
              <span className="text-lg md:text-xl font-serif font-bold text-gray-900">iHome</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link
                href={`/${locale}`}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(`/${locale}`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
                }`}
              >
                {t.home}
              </Link>

              <Link
                href={`/${locale}/properties`}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(`/${locale}/properties`)
                    ? "text-terracotta-500"
                    : "text-gray-700 hover:text-terracotta-500"
                }`}
              >
                {t.properties}
              </Link>

              <Link
                href={`/${locale}/services`}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(`/${locale}/services`)
                    ? "text-terracotta-500"
                    : "text-gray-700 hover:text-terracotta-500"
                }`}
              >
                {t.services}
              </Link>

              <Link
                href={`/${locale}/guides`}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(`/${locale}/guides`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
                }`}
              >
                {t.guides}
              </Link>

              <Link
                href={`/${locale}/our-way`}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(`/${locale}/our-way`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
                }`}
              >
                {t.ourWay}
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Desktop CTA */}
              <Link
                href={`/${locale}/contact`}
                className="hidden md:inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-medium transition-colors"
              >
                {t.letsTalk}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full py-8 px-6 space-y-6 overflow-y-auto">
          <Link
            href={`/${locale}`}
            className={`text-lg font-medium transition-colors ${
              isActiveLink(`/${locale}`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t.home}
          </Link>

          <Link
            href={`/${locale}/properties`}
            className={`text-lg font-medium transition-colors ${
              isActiveLink(`/${locale}/properties`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t.properties}
          </Link>

          <Link
            href={`/${locale}/services`}
            className={`text-lg font-medium transition-colors ${
              isActiveLink(`/${locale}/services`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t.services}
          </Link>

          <Link
            href={`/${locale}/guides`}
            className={`text-lg font-medium transition-colors ${
              isActiveLink(`/${locale}/guides`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t.guides}
          </Link>

          <Link
            href={`/${locale}/our-way`}
            className={`text-lg font-medium transition-colors ${
              isActiveLink(`/${locale}/our-way`) ? "text-terracotta-500" : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t.ourWay}
          </Link>

          <div className="border-t border-gray-200 my-4" />

          <Link
            href={`/${locale}/contact`}
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors"
          >
            {t.letsTalk}
          </Link>
        </nav>
      </div>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  )
}
