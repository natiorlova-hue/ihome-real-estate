"use client";

import { withLocale, type Locale } from "@/lib/locale-path";
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
import Link from "next/link";
import { Fragment, useState } from "react";

type HeaderLabels = {
  brand: string;
  home: string;
  forYou: string;
  properties: string;
  guides: string;
  ourWay: string;
  method: string;
  talk: string;

  // a11y
  openMenu: string;
  closeMenu: string;
  homeAria: string;
};

type ForYouItem = {
  key: string;
  title: string;
  desc: string;
  path: string;
};

type PropertiesItem = {
  key: string;
  title: string;
  desc: string;
  href: string;
};

type MobileMenuProps = {
  locale: Locale;
  labels: HeaderLabels;
  dropdownForYou: ForYouItem[];
  dropdownProperties: PropertiesItem[];
};

export default function MobileMenu({
  locale,
  labels,
  dropdownForYou,
  dropdownProperties,
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
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
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
                                  isOpen ? "rotate-180" : "",
                                  "h-5 w-5 flex-none"
                                )}
                                aria-hidden="true"
                              />
                            </DisclosureButton>

                            <DisclosurePanel className="mt-2 space-y-2">
                              {dropdownForYou.map(item => (
                                <Link
                                  key={item.key}
                                  href={withLocale(locale, item.path)}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.title}
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
                                  isOpen ? "rotate-180" : "",
                                  "h-5 w-5 flex-none"
                                )}
                                aria-hidden="true"
                              />
                            </DisclosureButton>

                            <DisclosurePanel className="mt-2 space-y-2">
                              {dropdownProperties.map(item => (
                                <Link
                                  key={item.key}
                                  href={item.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>

                      <Link
                        href={withLocale(locale, "guides")}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {labels.guides}
                      </Link>

                      <Link
                        href={withLocale(locale, "our-way")}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {labels.ourWay}
                      </Link>
                    </div>

                    <div className="py-6">
                      <Link
                        href={withLocale(locale, "contact")}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {labels.talk}
                      </Link>
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
