"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/categories";
import { useTranslations } from "next-intl";
import Link from "next/link";
import MobileMenu from "../MobileMenu";
import styles from "./header.module.css";

export default function HeaderClient({ locale }: { locale: string }) {
  const nav = useTranslations("navigation");
  const tax = useTranslations("taxonomy");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-50/90 backdrop-blur-md border-b border-gray-100">
      <div className="container">
        <div className="flex items-center gap-6 h-16 md:h-20 justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className={styles.logo}
            aria-label="iHome Homepage"
          >
            <span className="text-base xl:text-xl">{nav("header.brand")}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 font-semibold">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              {nav("header.nav.home")}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-terracotta-500 transition-colors">
                  {nav("header.nav.forYou")}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[344px]">
                {categories.map(cat => (
                  <DropdownMenuItem key={cat.key} className="px-4 py-2">
                    <Link
                      href={`/${locale}/${cat.path}`}
                      className="flex gap-3 w-full"
                    >
                      {/* icon — з UI-конфігу */}
                      <span className="flex-shrink-0">{cat.icon}</span>

                      <div className="flex flex-col">
                        {/* тексти — з taxonomy */}
                        <span className="text-md font-semibold">
                          {tax(`categoryLifestyle.${cat.key}.title`)}
                        </span>
                        <span className="text-tertiary-600 text-sm">
                          {tax(`categoryLifestyle.${cat.key}.desc`)}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href={`/${locale}/properties`}
              className="text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              {nav("header.nav.properties")}
            </Link>

            <Link
              href={`/${locale}/guides`}
              className="text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              {nav("header.nav.guides")}
            </Link>

            <Link
              href={`/${locale}/our-way`}
              className="text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              {nav("header.nav.ourWay")}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden xl:flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href={`/${locale}/contact`}>
                {nav("header.actions.method")}
              </Link>
            </Button>

            <Button asChild>
              <Link href={`/${locale}/contact`}>
                {nav("header.actions.talk")}
              </Link>
            </Button>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
