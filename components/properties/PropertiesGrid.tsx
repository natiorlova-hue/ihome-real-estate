"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import ContentCard from "@/components/content/ContentCard";
import PropertiesFilter, {
  type TaxonomyItem,
} from "@/components/properties/PropertiesFilter";
import PropertiesPagination from "@/components/properties/PropertiesPagination.client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/routing";
import type { PropertyCardData } from "@/lib/properties";
import { cn, formatPrice } from "@/lib/utils";

type PropertiesGridProps = {
  initialProperties: PropertyCardData[];
  locations?: TaxonomyItem[];
  propertyTypes?: TaxonomyItem[];
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
] as const;

const MOBILE_MAX = 767;
const TABLET_MAX = 1279;
const PROPERTIES_PATHNAME = "/properties" as const;

function getItemsPerPage(width: number): number {
  if (width <= MOBILE_MAX) return 6;
  if (width <= TABLET_MAX) return 9;
  return 12;
}

export default function PropertiesGrid({
  initialProperties,
  locations = [],
  propertyTypes = [],
}: PropertiesGridProps) {
  const t = useTranslations("properties");
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [itemsPerPage, setItemsPerPage] = React.useState(12);

  const activeCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "recent";

  React.useEffect(() => {
    const syncItemsPerPage = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    };

    syncItemsPerPage();
    window.addEventListener("resize", syncItemsPerPage);

    return () => {
      window.removeEventListener("resize", syncItemsPerPage);
    };
  }, []);

  const buildHref = React.useCallback(
    (
      updater: (params: URLSearchParams) => void,
      options?: { resetPage?: boolean }
    ) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      updater(params);

      if (options?.resetPage) {
        params.delete("page");
      }

      const queryEntries = Array.from(params.entries());

      return queryEntries.length > 0
        ? {
            pathname: PROPERTIES_PATHNAME,
            query: Object.fromEntries(queryEntries),
          }
        : {
            pathname: PROPERTIES_PATHNAME,
          };
    },
    [searchParams]
  );

  const filteredProperties = React.useMemo(() => {
    return initialProperties.filter(item => {
      if (
        activeCategory === "newDevelopments" &&
        !item.listingTypes?.includes("new_development")
      ) {
        return false;
      }

      if (
        activeCategory === "privateListings" &&
        !item.listingTypes?.includes("private_listing")
      ) {
        return false;
      }

      if (
        activeCategory === "investment" &&
        !item.listingTypes?.includes("investment")
      ) {
        return false;
      }

      if (activeCategory === "featured" && !item.isFeatured) {
        return false;
      }

      const typeParam = searchParams.get("type");
      if (typeParam) {
        if (typeParam === "sale" || typeParam === "rent") {
          if (!item.listingTypes?.includes(typeParam)) {
            return false;
          }
        } else if (item.propertyType !== typeParam) {
          return false;
        }
      }

      const bedsParam = searchParams.get("beds");
      if (bedsParam) {
        const value = Number(bedsParam);
        if (value < 5) {
          if (item.beds !== value) {
            return false;
          }
        } else if (item.beds < 5) {
          return false;
        }
      }

      const bathsParam = searchParams.get("baths");
      if (bathsParam) {
        const value = Number(bathsParam);
        if (value < 5) {
          if (item.baths !== value) {
            return false;
          }
        } else if (item.baths < 5) {
          return false;
        }
      }

      const areaParam = searchParams.get("totalArea");
      if (areaParam) {
        const [min, maxStr] = areaParam.split("-");
        const maxValue = maxStr === "plus" ? Infinity : Number(maxStr);

        if (item.totalArea < Number(min) || item.totalArea > maxValue) {
          return false;
        }
      }

      const budgetParam = searchParams.get("budget");
      if (budgetParam && item.price) {
        const [min, maxStr] = budgetParam.split("-");
        const maxValue = maxStr === "plus" ? Infinity : Number(maxStr);

        if (item.price < Number(min) || item.price > maxValue) {
          return false;
        }
      }

      if (searchParams.get("luxury") === "true") {
        if (
          !item.categories?.some(
            category => category === "luxury" || category === "premium"
          )
        ) {
          return false;
        }
      }

      const locationParam = searchParams.get("location");
      if (locationParam && item.location !== locationParam) {
        return false;
      }

      const checkMulti = (key: string, itemValues: string[]) => {
        const value = searchParams.get(key);

        if (!value || !itemValues) {
          return true;
        }

        return value
          .split(",")
          .every(selected => itemValues.includes(selected));
      };

      if (!checkMulti("amenities", item.amenities)) return false;
      if (!checkMulti("views", item.views)) return false;
      if (!checkMulti("features", item.features)) return false;
      if (!checkMulti("lifestyle", item.lifestyles)) return false;

      return true;
    });
  }, [activeCategory, initialProperties, searchParams]);

  const sortedProperties = React.useMemo(() => {
    const items = [...filteredProperties];

    if (currentSort === "price_asc") {
      return items.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    if (currentSort === "price_desc") {
      return items.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return items;
  }, [currentSort, filteredProperties]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProperties.length / itemsPerPage)
  );

  const requestedPage = Number(searchParams.get("page") || "1");
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);

  const paginatedProperties = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, sortedProperties]);

  const getFilterLabel = (key: string, value: string): string => {
    if (key === "location") {
      return (
        locations.find(location => location.slug === value)?.title || value
      );
    }

    if (key === "type") {
      return propertyTypes.find(type => type.slug === value)?.title || value;
    }

    if (key === "budget" || key === "totalArea") {
      return value;
    }

    if (key === "beds" || key === "baths") {
      return value;
    }

    if (key === "luxury") {
      return t("filters.labels.luxury");
    }

    if (key === "views") {
      return t(`filters.views.${value}`);
    }

    if (key === "condition") {
      return t(`filters.condition.${value}`);
    }

    if (key === "features") {
      return t(`filters.features.${value}`);
    }

    if (key === "amenities") {
      return t(`filters.amenities.${value}`);
    }

    return value;
  };

  const activeFilters: Array<{
    key: string;
    value: string;
    label: string;
  }> = [];

  FILTER_KEYS.forEach(key => {
    const value = searchParams.get(key);

    if (!value) {
      return;
    }

    value.split(",").forEach(item => {
      activeFilters.push({
        key,
        value: item,
        label: getFilterLabel(key, item),
      });
    });
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-black/10 pb-4">
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-full flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-6">
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  router.replace(
                    buildHref(
                      params => {
                        if (category === "all") {
                          params.delete("category");
                        } else {
                          params.set("category", category);
                        }
                      },
                      { resetPage: true }
                    ),
                    { scroll: false }
                  );
                }}
                className={cn(
                  "min-h-11 border-b-2 pb-3 text-left text-sm font-medium transition-colors",
                  activeCategory === category
                    ? "border-terracotta-500 text-terracotta-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900"
                )}
              >
                {t(`filters.categories.${category}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2 xl:flex-row xl:items-start xl:justify-between">
          <div className="relative flex flex-1 flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(prev => !prev)}
              className={cn(
                "min-h-11 border-gray-200 bg-white px-4 text-gray-700",
                isFilterOpen && "ring-4 ring-brandBlue-100"
              )}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {t("filters.title")}
            </Button>

            <PropertiesFilter
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              locations={locations}
              propertyTypes={propertyTypes}
            />

            {activeFilters.map(filter => (
              <button
                key={`${filter.key}-${filter.value}`}
                type="button"
                onClick={() => {
                  router.replace(
                    buildHref(
                      params => {
                        const nextValues =
                          params
                            .get(filter.key)
                            ?.split(",")
                            .filter(item => item !== filter.value) || [];

                        if (nextValues.length > 0) {
                          params.set(filter.key, nextValues.join(","));
                        } else {
                          params.delete(filter.key);
                        }
                      },
                      { resetPage: true }
                    ),
                    { scroll: false }
                  );
                }}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-blue-light-200 bg-blue-light-50 px-3 py-2 text-sm font-medium text-blue-light-700"
              >
                <span>{filter.label}</span>
                <X className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-h-11 min-w-[180px] justify-between border-gray-200 bg-white px-4 text-gray-700"
                >
                  {currentSort === "recent"
                    ? "Most recent"
                    : currentSort === "price_asc"
                      ? "Price: Low to High"
                      : "Price: High to Low"}
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="border-gray-200 bg-white"
              >
                <DropdownMenuItem
                  onClick={() => {
                    router.replace(
                      buildHref(
                        params => {
                          params.set("sort", "recent");
                        },
                        { resetPage: true }
                      ),
                      { scroll: false }
                    );
                  }}
                >
                  Most recent
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    router.replace(
                      buildHref(
                        params => {
                          params.set("sort", "price_asc");
                        },
                        { resetPage: true }
                      ),
                      { scroll: false }
                    );
                  }}
                >
                  Price: Low to High
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    router.replace(
                      buildHref(
                        params => {
                          params.set("sort", "price_desc");
                        },
                        { resetPage: true }
                      ),
                      { scroll: false }
                    );
                  }}
                >
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-9 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3">
        {paginatedProperties.map(property => (
          <ContentCard
            key={property.id}
            {...property}
            price={property.price ? formatPrice(property.price) : undefined}
            isLink
            href={{
              pathname: "/properties/[slug]",
              params: { slug: property.slug },
            }}
          />
        ))}
      </div>

      <PropertiesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => {
          router.replace(
            buildHref(params => {
              if (page <= 1) {
                params.delete("page");
              } else {
                params.set("page", String(page));
              }
            }),
            { scroll: false }
          );
        }}
      />
    </div>
  );
}
