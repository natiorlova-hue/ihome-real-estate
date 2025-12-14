// components/layout/MegaMenu.tsx
"use client";

import {
  Building2,
  Home,
  Laptop,
  MapPin,
  Sunset,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface MegaMenuProps {
  type: "lifestyle" | "properties";
  locale: string;
}

const lifestyleCategories = [
  {
    id: "families",
    icon: Users,
    color: "text-mediterranean-500",
    bgColor: "bg-mediterranean-50",
  },
  {
    id: "nomads",
    icon: Laptop,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "golden",
    icon: Sunset,
    color: "text-warning-500",
    bgColor: "bg-warning-50",
  },
  {
    id: "golf",
    icon: Target,
    color: "text-success-500",
    bgColor: "bg-success-50",
  },
  {
    id: "sea",
    icon: Home,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    id: "investment",
    icon: TrendingUp,
    color: "text-terracotta-500",
    bgColor: "bg-terracotta-50",
  },
];

const propertyTypes = [
  { id: "villa", count: 45 },
  { id: "apartment", count: 89 },
  { id: "penthouse", count: 23 },
  { id: "townhouse", count: 34 },
  { id: "plot", count: 12 },
];

const regions = [
  { id: "marbella", count: 67 },
  { id: "estepona", count: 45 },
  { id: "benahavis", count: 28 },
  { id: "mijas", count: 41 },
  { id: "fuengirola", count: 33 },
  { id: "sotogrande", count: 19 },
];

export default function MegaMenu({ type, locale }: MegaMenuProps) {
  const t = useTranslations("megaMenu");

  if (type === "lifestyle") {
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] animate-slideDown">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            {t("chooseLifestyle")}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {lifestyleCategories.map(category => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/${locale}/live-your-way/${category.id}`}
                  className="group flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div
                    className={`${category.bgColor} ${category.color} p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-terracotta-500 transition-colors duration-200">
                      {t(`lifestyle.${category.id}`)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t(`lifestyle.${category.id}Tagline`)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              href={`/${locale}/lifestyle-quiz`}
              className="text-sm font-medium text-terracotta-500 hover:text-terracotta-600 transition-colors duration-200"
            >
              {t("notSure")} →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Properties Mega Menu
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] animate-slideDown">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Property Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-terracotta-500" />
              {t("propertyTypes")}
            </h3>
            <ul className="space-y-2">
              {propertyTypes.map(type => (
                <li key={type.id}>
                  <Link
                    href={`/${locale}/properties?type=${type.id}`}
                    className="group flex items-center justify-between text-sm text-gray-700 hover:text-terracotta-500 transition-colors duration-200"
                  >
                    <span>{t(`types.${type.id}`)}</span>
                    <span className="text-xs text-gray-500 group-hover:text-terracotta-400">
                      {type.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-mediterranean-500" />
              {t("regions")}
            </h3>
            <ul className="space-y-2">
              {regions.map(region => (
                <li key={region.id}>
                  <Link
                    href={`/${locale}/properties?region=${region.id}`}
                    className="group flex items-center justify-between text-sm text-gray-700 hover:text-mediterranean-500 transition-colors duration-200"
                  >
                    <span>{t(`regions.${region.id}`)}</span>
                    <span className="text-xs text-gray-500 group-hover:text-mediterranean-400">
                      {region.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            href={`/${locale}/properties`}
            className="text-sm font-medium text-terracotta-500 hover:text-terracotta-600 transition-colors duration-200"
          >
            {t("viewAll")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
