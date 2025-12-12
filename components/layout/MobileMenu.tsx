"use client";

import { cn } from "@/lib/utils";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment, useState } from "react";

// Keys matching common.json structure
const forYouKeys = [
  "families",
  "nomads",
  "golf",
  "goldenYears",
  "secondHome",
  "investment",
];
const propertyKeys = ["sale", "rent", "sell"];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <>
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 xl:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white px-6 py-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="-m-1.5 p-1.5"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">iHome</span>
                    <span className="text-xl font-serif font-bold text-orange-600">
                      iHome
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <Link
                        href="/"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {t("header.nav.home")}
                      </Link>

                      <Disclosure as="div" className="-mx-3">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              {t("header.nav.forYou")}
                              <ChevronDown
                                className={cn(
                                  open ? "rotate-180" : "",
                                  "h-5 w-5 flex-none"
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 space-y-2">
                              {forYouKeys.map(key => (
                                <Disclosure.Button
                                  key={key}
                                  as={Link}
                                  href={`/lifestyle/${key}`}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  onClick={() => setOpen(false)}
                                >
                                  {t(`header.dropdowns.forYou.${key}.title`)}
                                </Disclosure.Button>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                      <Disclosure as="div" className="-mx-3">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              {t("header.nav.properties")}
                              <ChevronDown
                                className={cn(
                                  open ? "rotate-180" : "",
                                  "h-5 w-5 flex-none"
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 space-y-2">
                              {propertyKeys.map(key => (
                                <Disclosure.Button
                                  key={key}
                                  as={Link}
                                  href={`/properties/${key}`}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  onClick={() => setOpen(false)}
                                >
                                  {t(
                                    `header.dropdowns.properties.${key}.title`
                                  )}
                                </Disclosure.Button>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                      <Link
                        href="/guides"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {t("header.nav.guides")}
                      </Link>
                      <Link
                        href="/our-way"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {t("header.nav.ourWay")}
                      </Link>
                    </div>

                    <div className="py-6">
                      <Link
                        href="/contact"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {t("header.actions.talk")}
                      </Link>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
