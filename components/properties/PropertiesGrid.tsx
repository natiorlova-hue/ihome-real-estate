"use client";

import ContentCard, { type CardBadge } from "@/components/content/ContentCard";
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
import type { FeaturedProperty, PropertyBadgeData } from "@/lib/properties";
import { cn, formatPrice } from "@/lib/utils";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

type PropertiesGridProps = {
  initialProperties: FeaturedProperty[];
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

// Усі ключі фільтрів, які ми відстежуємо
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
  "livingArea",
  "plotArea",
  "floor",
  "luxury",
];

const formatBadge = (badge?: PropertyBadgeData): CardBadge | undefined => {
  if (!badge) return undefined;
  switch (badge.type) {
    case "roi":
      return { text: `ROI ${badge.value}%`, variant: badge.variant };
    case "new":
      return { text: "New", variant: badge.variant };
    case "featured":
      return { text: "Featured", variant: badge.variant };
    case "area":
      return { text: `${badge.value} m²`, variant: badge.variant };
    default:
      return undefined;
  }
};

export default function PropertiesGrid({
  initialProperties,
  locations = [],
  propertyTypes = [],
  lifestyles = [],
}: PropertiesGridProps) {
  const t = useTranslations("properties.filters");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const activeCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "recent";

  const setCategory = (cat: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (cat === "all") current.delete("category");
    else current.set("category", cat);
    current.delete("page");
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

  const setSort = (sort: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (sort === "recent") current.delete("sort");
    else current.set("sort", sort);
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

  // --- ЛОГІКА ДЛЯ АКТИВНИХ ФІЛЬТРІВ (ЧІПСІВ) ---
  const removeFilter = (key: string, valueToRemove: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const values = current.get(key)?.split(",") || [];
    const newValues = values.filter(v => v !== valueToRemove);

    if (newValues.length > 0) {
      current.set(key, newValues.join(","));
    } else {
      current.delete(key);
    }

    current.delete("page");
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

  const getFilterLabel = (key: string, value: string) => {
    if (key === "location")
      return locations.find(l => l.slug === value)?.title || value;
    if (key === "type")
      return propertyTypes.find(p => p.slug === value)?.title || value;
    if (key === "lifestyle")
      return lifestyles.find(l => l.slug === value)?.title || value;

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

    if (key === "beds")
      return value === "1" ? "1 Bedroom" : `${value} Bedrooms`;
    if (key === "baths")
      return value === "1" ? "1 Bathroom" : `${value} Bathrooms`;

    if (key === "totalArea" || key === "livingArea" || key === "plotArea") {
      const areas: Record<string, string> = {
        "0-100": "Up to 100 m²",
        "100-250": "100 - 250 m²",
        "250-500": "250 - 500 m²",
        "500-plus": "Over 500 m²",
      };
      return areas[value] || value;
    }

    if (key === "luxury")
      return t("labels.luxury", { fallback: "Luxury / Premium" });
    if (key === "views") return t(`views.${value}`, { fallback: value });
    if (key === "condition")
      return t(`condition.${value}`, { fallback: value });
    if (key === "features") return t(`features.${value}`, { fallback: value });
    if (key === "amenities")
      return t(`amenities.${value}`, { fallback: value });

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
          Featured Properties
        </h2>
      </div>

      {/* Filter Bar */}
      <div className="space-y-4 border-b border-gray-200 pb-4">
        {/* ROW 1: Tabs */}
        <div className="flex overflow-x-auto pb-2 no-scrollbar">
          <div className="flex w-max items-center gap-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "border-b-2 pb-3 text-sm font-medium transition-colors whitespace-nowrap",
                  activeCategory === cat
                    ? "border-terracotta-500 text-terracotta-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900"
                )}
              >
                {t(`categories.${cat}`, { fallback: cat })}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 2: Filters Button + Active Chips (Left) & Sort Dropdown (Right) */}
        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 pt-2">
          <div className="flex flex-1 flex-wrap items-center gap-3 relative">
            {/* КНОПКА ВИКЛИКУ ФІЛЬТРА */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "h-10 rounded-md border-gray-200 bg-white px-4 text-gray-700 hover:bg-gray-50 shrink-0",
                isFilterOpen && "border-brandBlue-300 ring-4 ring-brandBlue-100" // Активний стан
              )}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {t("title", { fallback: "Filters" })}
            </Button>

            {/* Рендеримо дропдаун-фільтр прямо тут */}
            <PropertiesFilter
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              locations={locations}
              propertyTypes={propertyTypes}
              lifestyles={lifestyles}
            />

            {/* ВІДОБРАЖЕННЯ АКТИВНИХ ФІЛЬТРІВ (ЧІПСИ) */}
            {activeFilters.map(filter => (
              <span
                key={`${filter.key}-${filter.value}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-blue-light-200 bg-blue-light-50 px-3 py-1.5 text-sm font-medium text-blue-light-700 transition-colors hover:bg-blue-light-100"
              >
                {filter.label}
                <X
                  className="h-3.5 w-3.5 cursor-pointer text-blue-light-400 hover:text-blue-light-700 transition-colors"
                  onClick={() => removeFilter(filter.key, filter.value)}
                  strokeWidth={2.5}
                />
              </span>
            ))}
          </div>

          {/* СОРТУВАННЯ */}
          <div className="shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 min-w-[140px] justify-between rounded-md border-gray-200 bg-white px-4 text-gray-700 hover:bg-gray-50"
                >
                  {currentSort === "recent" && "Most recent"}
                  {currentSort === "price_asc" && "Price: Low to High"}
                  {currentSort === "price_desc" && "Price: High to Low"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="z-dropdown w-48 bg-white"
              >
                <DropdownMenuItem onClick={() => setSort("recent")}>
                  Most recent
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("price_asc")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("price_desc")}>
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {initialProperties.length > 0 ? (
          initialProperties.map(property => (
            <ContentCard
              key={property.id}
              title={property.slug
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              href={`/properties/${property.slug}`}
              image={property.image}
              topBadge={formatBadge(property.topBadge)}
              bottomBadge={formatBadge(property.bottomBadge)}
              price={property.price ? formatPrice(property.price) : undefined}
              isLink
              description={`${property.beds} Beds • ${property.baths} Baths • Beautiful luxury property located in a prime area.`}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-gray-500">
              No properties match your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {initialProperties.length > 0 && (
        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
          <Button variant="outline" className="bg-white text-gray-600">
            Previous
          </Button>
          <div className="hidden gap-1 text-sm font-medium text-gray-600 md:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-900">
              1
            </span>
            <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-gray-50">
              2
            </span>
            <span className="flex h-10 w-10 items-center justify-center">
              ...
            </span>
            <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-gray-50">
              10
            </span>
          </div>
          <Button variant="outline" className="bg-white text-gray-600">
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
