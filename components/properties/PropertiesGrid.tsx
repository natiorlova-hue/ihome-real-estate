"use client";

import ContentCard from "@/components/content/ContentCard";
import PropertiesFilter, {
  type TaxonomyItem,
} from "@/components/properties/PropertiesFilter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PropertyCardData } from "@/lib/properties";
import { cn, formatPrice } from "@/lib/utils";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

type PropertiesGridProps = {
  initialProperties: PropertyCardData[];
  locations?: TaxonomyItem[];
  propertyTypes?: TaxonomyItem[];
  lifestyles?: TaxonomyItem[];
};

const CATEGORIES = [
  "all",
  "featured",
  "newDevelopments",
  "privateListings",
  "investment",
] as const;

const FILTER_KEYS = [
  "budget",
  "beds",
  "baths",
  "lifestyle",
  "location",
  "type",
  "views",
  "condition",
  "features",
  "amenities",
  "totalArea",
  "luxury",
];

export default function PropertiesGrid({
  initialProperties,
  locations = [],
  propertyTypes = [],
  lifestyles = [],
}: PropertiesGridProps) {
  // Використовуємо неймспейс "properties", щоб мати доступ до t("filters...") та t("card...")
  const t = useTranslations("properties");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const activeCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "recent";

  // --- 1. ЛОГІКА ФІЛЬТРАЦІЇ ---
  const filteredProperties = React.useMemo(() => {
    return initialProperties.filter(item => {
      // --- ЛОГІКА ВКЛАДОК (TABS) ---
      if (
        activeCategory === "newDevelopments" &&
        !item.listingTypes?.includes("new_development")
      )
        return false;
      if (
        activeCategory === "privateListings" &&
        !item.listingTypes?.includes("private_listing")
      )
        return false;
      if (
        activeCategory === "investment" &&
        !item.listingTypes?.includes("investment")
      )
        return false;
      if (activeCategory === "featured" && !item.isFeatured) return false;

      // --- ЛОГІКА Sale / Rent ТА ТИПУ ОБ'ЄКТА (Villa/Apartment) ---
      const typeParam = searchParams.get("type");
      if (typeParam) {
        if (typeParam === "sale" || typeParam === "rent") {
          // Якщо це тип угоди - шукаємо в масиві
          if (!item.listingTypes?.includes(typeParam)) return false;
        } else {
          // Якщо це вілли та інше - порівнюємо з типом об'єкта
          if (item.propertyType !== typeParam) return false;
        }
      }

      // Кімнати та ванні (1-4: суворо, 5: мінімум)
      const bedsParam = searchParams.get("beds");
      if (bedsParam) {
        const val = Number(bedsParam);
        val < 5 ? item.beds !== val && val !== 0 : item.beds < 5 && val !== 0;
        if (val < 5) {
          if (item.beds !== val) return false;
        } else {
          if (item.beds < 5) return false;
        }
      }

      const bathsParam = searchParams.get("baths");
      if (bathsParam) {
        const val = Number(bathsParam);
        if (val < 5) {
          if (item.baths !== val) return false;
        } else {
          if (item.baths < 5) return false;
        }
      }

      // Фільтр Площі
      const areaParam = searchParams.get("totalArea");
      if (areaParam) {
        const [min, maxStr] = areaParam.split("-");
        const maxVal = maxStr === "plus" ? Infinity : Number(maxStr);
        if (item.totalArea < Number(min) || item.totalArea > maxVal)
          return false;
      }

      // Бюджет
      const budgetParam = searchParams.get("budget");
      if (budgetParam && item.price) {
        const [min, maxStr] = budgetParam.split("-");
        const maxVal = maxStr === "plus" ? Infinity : Number(maxStr);
        if (item.price < Number(min) || item.price > maxVal) return false;
      }

      // Luxury Toggle
      if (searchParams.get("luxury") === "true") {
        if (!item.categories?.some(c => c === "luxury" || c === "premium"))
          return false;
      }

      const loc = searchParams.get("location");
      if (loc && item.location !== loc) return false;

      // ТУТ БУВ ДУБЛЬ "type", ЯКИЙ Я ВИДАЛИВ, ЩОБ НЕ БУЛО "ПУСТО"

      const checkMulti = (key: string, itemArr: string[]) => {
        const p = searchParams.get(key);
        if (!p || !itemArr) return true;
        return p.split(",").every(val => itemArr.includes(val));
      };

      if (!checkMulti("amenities", item.amenities)) return false;
      if (!checkMulti("views", item.views)) return false;
      if (!checkMulti("features", item.features)) return false;

      return true;
    });
  }, [initialProperties, searchParams, activeCategory]);
  // --- 2. СОРТУВАННЯ ---
  const sortedProperties = React.useMemo(() => {
    const res = [...filteredProperties];
    if (currentSort === "price_asc")
      return res.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (currentSort === "price_desc")
      return res.sort((a, b) => (b.price || 0) - (a.price || 0));
    return res;
  }, [filteredProperties, currentSort]);

  // --- 3. ГЕНЕРАЦІЯ МІТОК ЧІПСІВ (ПРАВИЛЬНІ КЛЮЧІ З JSON) ---
  const getFilterLabel = (key: string, value: string) => {
    if (key === "location")
      return locations.find(l => l.slug === value)?.title || value;

    if (key === "type") {
      if (value === "sale") return "For Sale";
      if (value === "rent") return "For Rent";
      return propertyTypes.find(p => p.slug === value)?.title || value;
    }

    if (key === "budget") {
      const budgets: Record<string, string> = {
        "0-500000": "Up to €500K",
        "500000-1000000": "€500K – €1M",
        "1000000-2000000": "€1M – €2M",
        "2000000-5000000": "€2M – €5M",
        "5000000-plus": "Over €5M",
      };
      return budgets[value] || value;
    }

    if (key === "totalArea") {
      const areas: Record<string, string> = {
        "0-100": "Up to 100 m²",
        "100-250": "100 - 250 m²",
        "250-500": "250 - 500 m²",
        "500-plus": "Over 500 m²",
      };
      return areas[value] || value;
    }

    if (key === "beds") {
      const val = Number(value);
      return val >= 5
        ? `5+ ${t("card.bedrooms")}`
        : `${val} ${t("card.bedrooms")}`;
    }
    if (key === "baths") {
      const val = Number(value);
      return val >= 5
        ? `5+ ${t("card.bathrooms")}`
        : `${val} ${t("card.bathrooms")}`;
    }

    if (key === "luxury") return t("filters.labels.luxury");
    if (key === "views")
      return t(`filters.views.${value}`, { fallback: value });
    if (key === "condition")
      return t(`filters.condition.${value}`, { fallback: value });
    if (key === "features")
      return t(`filters.features.${value}`, { fallback: value });
    if (key === "amenities")
      return t(`filters.amenities.${value}`, { fallback: value });

    return value;
  };

  const activeFilters: { key: string; value: string; label: string }[] = [];
  FILTER_KEYS.forEach(key => {
    const paramValue = searchParams.get(key);
    if (paramValue) {
      paramValue.split(",").forEach(val => {
        activeFilters.push({
          key,
          value: val,
          label: getFilterLabel(key, val),
        });
      });
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl text-gray-900 md:text-4xl">
          {t("filters.title")}
        </h2>
      </div>

      <div className="space-y-4 border-b border-gray-200 pb-4">
        <div className="flex overflow-x-auto pb-2 no-scrollbar">
          <div className="flex w-max items-center gap-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  const cur = new URLSearchParams(
                    Array.from(searchParams.entries())
                  );
                  cat === "all"
                    ? cur.delete("category")
                    : cur.set("category", cat);
                  router.replace(`${pathname}?${cur.toString()}`, {
                    scroll: false,
                  });
                }}
                className={cn(
                  "border-b-2 pb-3 text-sm font-medium transition-colors whitespace-nowrap",
                  activeCategory === cat
                    ? "border-terracotta-500 text-terracotta-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900"
                )}
              >
                {t(`filters.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-between gap-4 pt-2">
          <div className="flex flex-1 flex-wrap items-center gap-3 relative">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "h-10 border-gray-200 bg-white px-4 text-gray-700",
                isFilterOpen && "ring-4 ring-brandBlue-100"
              )}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />{" "}
              {t("filters.title")}
            </Button>

            <PropertiesFilter
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              locations={locations}
              propertyTypes={propertyTypes}
              lifestyles={lifestyles}
            />

            {activeFilters.map(filter => (
              <span
                key={`${filter.key}-${filter.value}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-blue-light-200 bg-blue-light-50 px-3 py-1.5 text-sm font-medium text-blue-light-700"
              >
                {filter.label}
                <X
                  className="h-3.5 w-3.5 cursor-pointer"
                  onClick={() => {
                    const cur = new URLSearchParams(
                      Array.from(searchParams.entries())
                    );
                    const vals =
                      cur
                        .get(filter.key)
                        ?.split(",")
                        .filter(v => v !== filter.value) || [];
                    vals.length > 0
                      ? cur.set(filter.key, vals.join(","))
                      : cur.delete(filter.key);
                    router.replace(`${pathname}?${cur.toString()}`, {
                      scroll: false,
                    });
                  }}
                />
              </span>
            ))}
          </div>

          <div className="shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 min-w-[140px] justify-between bg-white px-4 text-gray-700"
                >
                  {currentSort === "recent"
                    ? "Most recent"
                    : currentSort === "price_asc"
                      ? "Price: Low to High"
                      : "Price: High to Low"}
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem
                  onClick={() => router.replace(`${pathname}?sort=recent`)}
                >
                  Most recent
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.replace(`${pathname}?sort=price_asc`)}
                >
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.replace(`${pathname}?sort=price_desc`)}
                >
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {sortedProperties.length > 0 ? (
          sortedProperties.map(prop => (
            <ContentCard
              key={prop.id}
              {...prop}
              price={prop.price ? formatPrice(prop.price) : undefined}
              isLink
              href={`/properties/${prop.slug}`}
            />
          ))
        ) : (
          <div className="col-span-full py-24 text-center text-gray-500 text-xl">
            No properties match your current filters.
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
        <Button variant="outline" className="bg-white text-gray-600">
          Previous
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-sm font-medium text-gray-900">
          1
        </div>
        <Button variant="outline" className="bg-white text-gray-600">
          Next
        </Button>
      </div>
    </div>
  );
}
