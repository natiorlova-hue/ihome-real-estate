"use client";

import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { withLocale, type Locale } from "@/lib/locale-path";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

type HeaderLabels = {
  brand: string;
  home: string;
  forYou: string;
  properties: string;
  guides: string;
  ourWay: string;
  method: string;
  talk: string;

  openMenu: string;
  closeMenu: string;
  homeAria: string;
};

type DropdownItem = {
  key: string;
  title: string;
  desc: string;
  path?: string; // For you
  href?: string; // Properties
};

type HeaderClientProps = {
  locale: Locale;
  labels: HeaderLabels;
  dropdownForYou: Array<
    Required<Pick<DropdownItem, "key" | "title" | "desc" | "path">>
  >;
  dropdownProperties: Array<
    Required<Pick<DropdownItem, "key" | "title" | "desc" | "href">>
  >;
};

export default function HeaderClient({
  locale,
  labels,
  dropdownForYou,
  dropdownProperties,
}: HeaderClientProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-gray-50/90 backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          {/* Brand */}
          <Logo
            locale={locale}
            ariaLabel={labels.homeAria}
            wordmark={labels.brand}
            className="shrink-0"
          />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 font-semibold xl:flex">
            <Link
              href={withLocale(locale, "")}
              className="text-gray-700 transition-colors hover:text-terracotta-500"
            >
              {labels.home}
            </Link>

            {/* For dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 text-gray-700 transition-colors hover:text-terracotta-500"
                >
                  {labels.forYou}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[344px]">
                {dropdownForYou.map(item => (
                  <DropdownMenuItem key={item.key} className="px-4 py-2">
                    <Link
                      href={withLocale(locale, item.path)}
                      className="flex w-full gap-3"
                    >
                      <div className="flex flex-col">
                        <span className="text-md font-semibold">
                          {item.title}
                        </span>
                        <span className="text-sm text-tertiary-600">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Properties dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 text-gray-700 transition-colors hover:text-terracotta-500"
                >
                  {labels.properties}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[344px]">
                {dropdownProperties.map(item => (
                  <DropdownMenuItem key={item.key} className="px-4 py-2">
                    <Link href={item.href} className="flex w-full gap-3">
                      <div className="flex flex-col">
                        <span className="text-md font-semibold">
                          {item.title}
                        </span>
                        <span className="text-sm text-tertiary-600">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href={withLocale(locale, "guides")}
              className="text-gray-700 transition-colors hover:text-terracotta-500"
            >
              {labels.guides}
            </Link>

            <Link
              href={withLocale(locale, "our-way")}
              className="text-gray-700 transition-colors hover:text-terracotta-500"
            >
              {labels.ourWay}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-4 xl:flex">
            <Button asChild variant="outline">
              <Link href={withLocale(locale, "contact")}>{labels.method}</Link>
            </Button>

            <Button asChild>
              <Link href={withLocale(locale, "contact")}>{labels.talk}</Link>
            </Button>
          </div>

          <MobileMenu
            locale={locale}
            labels={labels}
            dropdownForYou={dropdownForYou}
            dropdownProperties={dropdownProperties}
          />
        </div>
      </div>
    </header>
  );
}
