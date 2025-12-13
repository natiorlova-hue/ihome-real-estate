"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import MobileMenu from "../MobileMenu";
import styles from "./header.module.css";

type HeaderLabels = {
  brand: string;
  home: string;
  forYou: string;
  properties: string;
  guides: string;
  ourWay: string;
  method: string;
  talk: string;
};

type DropdownItem = {
  key: string;
  title: string;
  desc: string;
  path?: string; // for "For you" items
  href?: string; // for "Properties" items
};

type HeaderClientProps = {
  locale: string;
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
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-50/90 backdrop-blur-md border-b border-gray-100">
      <div className="container">
        <div className="flex items-center gap-6 h-16 md:h-20 justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className={styles.logo}
            aria-label="iHome Homepage"
          >
            <span className="text-base xl:text-xl">{labels.brand}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 font-semibold">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              {labels.home}
            </Link>

            {/* For you dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-terracotta-500 transition-colors">
                  {labels.forYou}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[344px]">
                {dropdownForYou.map(item => (
                  <DropdownMenuItem key={item.key} className="px-4 py-2">
                    <Link
                      href={`/${locale}/${item.path}`}
                      className="flex gap-3 w-full"
                    >
                      <div className="flex flex-col">
                        <span className="text-md font-semibold">
                          {item.title}
                        </span>
                        <span className="text-tertiary-600 text-sm">
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
                <button className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-terracotta-500 transition-colors">
                  {labels.properties}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[344px]">
                {dropdownProperties.map(item => (
                  <DropdownMenuItem key={item.key} className="px-4 py-2">
                    <Link href={item.href} className="flex gap-3 w-full">
                      <div className="flex flex-col">
                        <span className="text-md font-semibold">
                          {item.title}
                        </span>
                        <span className="text-tertiary-600 text-sm">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href={`/${locale}/guides`}
              className="text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              {labels.guides}
            </Link>

            <Link
              href={`/${locale}/our-way`}
              className="text-gray-700 hover:text-terracotta-500 transition-colors"
            >
              {labels.ourWay}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden xl:flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href={`/${locale}/contact`}>{labels.method}</Link>
            </Button>

            <Button asChild>
              <Link href={`/${locale}/contact`}>{labels.talk}</Link>
            </Button>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
