"use client";

import ContentCard, { type CardBadge } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FeaturedProperty, PropertyBadgeData } from "@/lib/properties";
import { cn, formatPrice } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

type PropertiesGridProps = {
  initialProperties: FeaturedProperty[];
};

const CATEGORIES = [
  "all",
  "featured",
  "newDevelopments",
  "privateListings",
  "investment",
] as const;

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
}: PropertiesGridProps) {
  const t = useTranslations("properties.filters");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const properties = initialProperties;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl text-gray-900 md:text-4xl">
          {t("title")}
        </h2>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex overflow-x-auto pb-2 no-scrollbar md:pb-0">
          <div className="flex items-center gap-2 border-b border-gray-200 w-max pr-6 xl:w-auto xl:pr-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
                  activeCategory === cat
                    ? "border-terracotta-500 text-terracotta-500"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                )}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Filters (Explicitly defined for next-intl strict mode) */}
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 text-gray-700 bg-white"
              >
                {t("dropdowns.price")}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Any Price</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 text-gray-700 bg-white"
              >
                {t("dropdowns.beds")}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Any Beds</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 text-gray-700 bg-white"
              >
                {t("dropdowns.baths")}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Any Baths</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 text-gray-700 bg-white"
              >
                {t("dropdowns.sort")}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {properties.map(property => (
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
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-12">
        <Button variant="outline" className="text-gray-600">
          Previous
        </Button>
        <div className="hidden md:flex gap-1 text-sm font-medium text-gray-600">
          <span className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-900">
            1
          </span>
          <span className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-50 cursor-pointer">
            2
          </span>
          <span className="w-10 h-10 flex items-center justify-center">
            ...
          </span>
          <span className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-50 cursor-pointer">
            10
          </span>
        </div>
        <Button variant="outline" className="text-gray-600">
          Next
        </Button>
      </div>
    </div>
  );
}
