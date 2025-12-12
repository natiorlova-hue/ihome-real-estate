"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface NavItem {
  name: string;
  path: string;
  description: string;
  icon: ReactNode;
}

interface MobileNavProps {
  locale: string;
  categories: NavItem[];
}

export default function MobileNav({ locale, categories }: MobileNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("common.header");

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const toggleForYou = () => {
    setIsForYouOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="xl:hidden p-2 rounded-lg text-gray-700 transition-colors ml-auto"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div
        className={
          "bg-white fixed transition-all duration-300 w-full max-w-[300px] py-4 " +
          "top-0 left-0 flex flex-col items-center justify-between h-screen z-50 transform " +
          `xl:hidden ${
            isMobileMenuOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
          }`
        }
      >
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col text-md items-center gap-6 font-semibold w-full px-6 pt-20 overflow-y-auto">
          <Link
            href={`/${locale}`}
            className={`transition-colors flex items-center ${
              isActiveLink(`/${locale}`)
                ? "text-terracotta-500"
                : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t("nav.home")}
          </Link>

          <div className="w-full">
            <button
              onClick={toggleForYou}
              className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              <span className="text-gray-400 text-xs font-bold uppercase">
                {t("nav.forYou")}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isForYouOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${
                isForYouOpen
                  ? "max-h-[500px] mt-4 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {categories.map(item => (
                <Link
                  key={item.path}
                  href={`/${locale}/${item.path}`}
                  className={`transition-colors flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 ${isActiveLink(`/${locale}/${item.path}`) ? "text-terracotta-500 bg-gray-50" : "text-gray-700"}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={`/${locale}/properties`}
            className={`transition-colors flex items-center ${
              isActiveLink(`/${locale}/properties`)
                ? "text-terracotta-500"
                : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t("nav.properties")}
          </Link>

          <Link
            href={`/${locale}/guides`}
            className={`transition-colors flex items-center ${
              isActiveLink(`/${locale}/guides`)
                ? "text-terracotta-500"
                : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t("nav.guides")}
          </Link>

          <Link
            href={`/${locale}/our-way`}
            className={`transition-colors flex items-center ${
              isActiveLink(`/${locale}/our-way`)
                ? "text-terracotta-500"
                : "text-gray-700 hover:text-terracotta-500"
            }`}
          >
            {t("nav.ourWay")}
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="flex flex-col gap-4 w-full px-6 pb-6 mt-auto">
          <Button asChild variant="outline" className="w-full justify-center">
            <Link href={`/${locale}/contact`}>{t("actions.method")}</Link>
          </Button>

          <Button asChild className="w-full justify-center">
            <Link href={`/${locale}/contact`}>{t("actions.talk")}</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
