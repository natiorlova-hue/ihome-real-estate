"use client";

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
import { resolveNavHref } from "@/lib/nav-href";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import ScrollToContactButton from "./ScrollToContactButton";

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

type DropdownStatus = "active" | "comingSoon";

type DropdownItem = {
  key: string;
  title: string;
  desc: string;
  path?: string;
  href?: string;
  status?: DropdownStatus;
};

type HeaderClientProps = {
  locale: Locale;
  labels: HeaderLabels;
  dropdownForYou: Array<DropdownItem>;
  dropdownProperties: Array<DropdownItem>;
  navStatuses: {
    guides: string;
    ourWay: string;
  };
};

type SvgIconSpec = {
  src: `/${string}`;
};

const NAV_SVG_ICONS: Record<string, SvgIconSpec> = {
  // Lifestyle (For you)
  families: {
    src: "/icons/nav/Families.svg",
  }, // fallback if you don’t have Families.svg yet
  nomads: { src: "/icons/nav/Digital.svg" },
  golden: { src: "/icons/nav/Golden.svg" },
  golf: { src: "/icons/nav/Golf.svg" },
  secondHome: { src: "/icons/nav/Second-home.svg" },
  investment: {
    src: "/icons/nav/Investment.svg",
  },

  // Properties dropdown
  sale: { src: "/icons/nav/For-Sale.svg" },
  rent: { src: "/icons/nav/For-Rent.svg" },
  sell: { src: "/icons/nav/Investment.svg" }, // until you add a dedicated Sell.svg
};

function DropdownRow({
  iconKey,
  title,
  desc,
}: {
  iconKey: string;
  title: string;
  desc: string;
}) {
  const spec = NAV_SVG_ICONS[iconKey];

  return (
    <div className="flex w-full gap-3">
      {spec ? (
        <div
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          )}
        >
          <Image
            src={spec.src}
            alt=""
            aria-hidden
            width={20}
            height={20}
            sizes="20px"
            className="h-5 w-5"
          />
        </div>
      ) : null}

      <div className="flex flex-col">
        <span className="text-md font-semibold">{title}</span>
        <span className="text-sm text-tertiary-600">{desc}</span>
      </div>
    </div>
  );
}

export default function HeaderClient({
  locale,
  labels,
  dropdownForYou,
  dropdownProperties,
  navStatuses,
}: HeaderClientProps) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-gray-50/90 backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Logo
            locale={locale}
            ariaLabel={labels.homeAria}
            wordmark={labels.brand}
            className="shrink-0"
          />

          <nav className="hidden text-xl items-center gap-6 font-semibold xl:flex text-nowrap">
            <Link
              href={withLocale(locale, "")}
              className="text-gray-700 transition-colors hover:text-terracotta-500"
            >
              {labels.home}
            </Link>

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
                  <DropdownMenuItem
                    key={item.key}
                    asChild
                    className="px-4 py-2"
                  >
                    <Link
                      href={resolveNavHref(locale, {
                        href: item.path || "",
                        status: item.status,
                      })}
                      className="w-full"
                    >
                      <DropdownRow
                        iconKey={item.key}
                        title={item.title}
                        desc={item.desc}
                      />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
                  <DropdownMenuItem
                    key={item.key}
                    asChild
                    className="px-4 py-2"
                  >
                    <Link
                      href={resolveNavHref(locale, {
                        href: item.href || "",
                        status: item.status,
                      })}
                      className="w-full"
                    >
                      <DropdownRow
                        iconKey={item.key}
                        title={item.title}
                        desc={item.desc}
                      />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href={resolveNavHref(locale, {
                href: "guides",
                status: navStatuses.guides,
              })}
              className="text-gray-700 transition-colors hover:text-terracotta-500"
            >
              {labels.guides}
            </Link>

            <Link
              href={resolveNavHref(locale, {
                href: "our-way",
                status: navStatuses.ourWay,
              })}
              className="text-gray-700 transition-colors hover:text-terracotta-500"
            >
              {labels.ourWay}
            </Link>
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <Button asChild variant="outline">
              <Link href={withLocale(locale, "coming-soon")}>
                {labels.method}
              </Link>
            </Button>
            <ScrollToContactButton locale={locale} label={labels.talk} />
          </div>

          <MobileMenu
            locale={locale}
            labels={labels}
            dropdownForYou={dropdownForYou}
            dropdownProperties={dropdownProperties}
            navStatuses={navStatuses}
          />
        </div>
      </div>
    </header>
  );
}
