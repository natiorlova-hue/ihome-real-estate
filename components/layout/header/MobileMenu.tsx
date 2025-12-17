//components/layout/header/MobileMenu.tsx

"use client";

import { withLocale, type Locale } from "@/lib/locale-path";
import { resolveNavHref } from "@/lib/nav-href";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
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

type MenuItem = {
  key: string;
  title: string;
  desc: string;
  path?: string;
  href?: string;
  status?: string;
};

type MobileMenuProps = {
  locale: Locale;
  labels: HeaderLabels;
  dropdownForYou: MenuItem[];
  dropdownProperties: MenuItem[];
  navStatuses: {
    guides: string;
    ourWay: string;
  };
};

/**
 * SVG icons for mobile menu (NO background, icon only)
 */
const MOBILE_NAV_ICONS: Record<string, `/${string}`> = {
  families: "/icons/nav/Families.svg",
  nomads: "/icons/nav/Digital.svg",
  golden: "/icons/nav/Golden.svg",
  golf: "/icons/nav/Golf.svg",
  secondHome: "/icons/nav/Second-home.svg",
  investment: "/icons/nav/Investment.svg",

  sale: "/icons/nav/For-Sale.svg",
  rent: "/icons/nav/For-Rent.svg",
  sell: "/icons/nav/Investment.svg",
};

function MobileMenuRow({ iconKey, title }: { iconKey: string; title: string }) {
  const src = MOBILE_NAV_ICONS[iconKey];

  return (
    <div className="flex items-center gap-3">
      {src ? (
        <Image
          src={src}
          alt=""
          aria-hidden
          width={18}
          height={18}
          sizes="18px"
          className="h-[18px] w-[18px]"
        />
      ) : null}

      <span>{title}</span>
    </div>
  );
}

export default function MobileMenu({
  locale,
  labels,
  dropdownForYou,
  dropdownProperties,
  navStatuses,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 xl:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">{labels.openMenu}</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <TransitionChild as={Fragment}>
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white px-6 py-6 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Link
                    href={withLocale(locale, "")}
                    aria-label={labels.homeAria}
                    className="-m-1.5 p-1.5"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">{labels.brand}</span>
                    <span className="text-xl font-serif font-bold text-terracotta-500">
                      {labels.brand}
                    </span>
                  </Link>

                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">{labels.closeMenu}</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Navigation */}
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <Link
                        href={withLocale(locale, "")}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {labels.home}
                      </Link>

                      <Disclosure as="div" className="-mx-3">
                        {({ open: isOpen }) => (
                          <>
                            <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              {labels.forYou}
                              <ChevronDown
                                className={cn(
                                  isOpen && "rotate-180",
                                  "h-5 w-5"
                                )}
                              />
                            </DisclosureButton>

                            <DisclosurePanel className="mt-2 space-y-1">
                              {dropdownForYou.map(item => (
                                <Link
                                  key={item.key}
                                  href={resolveNavHref(locale, {
                                    href: item.path || "",
                                    status: item.status,
                                  })}
                                  className="flex items-center rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                                  onClick={() => setOpen(false)}
                                >
                                  <MobileMenuRow
                                    iconKey={item.key}
                                    title={item.title}
                                  />
                                </Link>
                              ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>

                      <Disclosure as="div" className="-mx-3">
                        {({ open: isOpen }) => (
                          <>
                            <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              {labels.properties}
                              <ChevronDown
                                className={cn(
                                  isOpen && "rotate-180",
                                  "h-5 w-5"
                                )}
                              />
                            </DisclosureButton>

                            <DisclosurePanel className="mt-2 space-y-1">
                              {dropdownProperties.map(item => (
                                <Link
                                  key={item.key}
                                  href={resolveNavHref(locale, {
                                    href: item.href || "",
                                    status: item.status,
                                  })}
                                  className="flex items-center rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                                  onClick={() => setOpen(false)}
                                >
                                  <MobileMenuRow
                                    iconKey={item.key}
                                    title={item.title}
                                  />
                                </Link>
                              ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>

                      <Link
                        href={resolveNavHref(locale, {
                          href: "guides",
                          status: navStatuses.guides,
                        })}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {labels.guides}
                      </Link>

                      <Link
                        href={resolveNavHref(locale, {
                          href: "our-way",
                          status: navStatuses.ourWay,
                        })}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {labels.ourWay}
                      </Link>
                    </div>

                    <div className="py-6">
                      <ScrollToContactButton
                        locale={locale}
                        label={labels.talk}
                      />
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
