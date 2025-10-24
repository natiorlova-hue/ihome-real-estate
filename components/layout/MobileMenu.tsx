// components/layout/MobileMenu.tsx
"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { ChevronDown, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

const lifestyleCategories = [
  "families",
  "nomads",
  "golden",
  "golf",
  "secondHome",
  "investment",
];

const propertyTypes = ["villa", "apartment", "penthouse", "townhouse", "plot"];
const regions = ["marbella", "estepona", "benahavis", "mijas", "fuengirola"];

export default function MobileMenu({
  isOpen,
  onClose,
  locale,
}: MobileMenuProps) {
  const t = useTranslations("nav");
  const tMega = useTranslations("megaMenu");

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-modal lg:hidden" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
        </Transition.Child>

        {/* Menu Panel */}
        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-400"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
                <Logo className="h-8 w-auto" />
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-1">
                {/* Home */}
                <Link
                  href={`/${locale}`}
                  onClick={onClose}
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {t("home")}
                </Link>

                {/* For You - Accordion */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <span>{t("forYou")}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="pl-4 mt-1 space-y-1">
                        {lifestyleCategories.map(category => (
                          <Link
                            key={category}
                            href={`/${locale}/live-your-way/${category}`}
                            onClick={onClose}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-terracotta-500 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            {tMega(`lifestyle.${category}`)}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Properties - Accordion */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <span>{t("properties")}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="pl-4 mt-1 space-y-3">
                        {/* Property Types */}
                        <div>
                          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                            {tMega("propertyTypes")}
                          </p>
                          {propertyTypes.map(type => (
                            <Link
                              key={type}
                              href={`/${locale}/properties?type=${type}`}
                              onClick={onClose}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-terracotta-500 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                              {tMega(`types.${type}`)}
                            </Link>
                          ))}
                        </div>

                        {/* Regions */}
                        <div>
                          <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                            {tMega("regions")}
                          </p>
                          {regions.map(region => (
                            <Link
                              key={region}
                              href={`/${locale}/properties?region=${region}`}
                              onClick={onClose}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-mediterranean-500 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                              {tMega(`regions.${region}`)}
                            </Link>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Services */}
                <Link
                  href={`/${locale}/services`}
                  onClick={onClose}
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {t("services")}
                </Link>

                {/* Guides */}
                <Link
                  href={`/${locale}/guides`}
                  onClick={onClose}
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {t("guides")}
                </Link>

                {/* Our Way */}
                <Link
                  href={`/${locale}/our-way`}
                  onClick={onClose}
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {t("ourWay")}
                </Link>
              </nav>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-6 space-y-4">
                {/* Language Switcher */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {t("language")}
                  </span>
                  <LanguageSwitcher currentLocale={locale} />
                </div>

                {/* CTA Button */}
                <Link
                  href={`/${locale}/contact`}
                  onClick={onClose}
                  className="btn-primary w-full text-center"
                >
                  {t("letsTalk")}
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
