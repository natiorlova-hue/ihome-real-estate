// @/lib/types/property.ts

/** * Виносимо статус в окремий тип, щоб TypeScript його бачив
 */
export type PropertyStatus = "resale" | "new_development" | "for_rent" | "sold";

/**
 * Варіанти стану об'єкта
 */
export type ConditionSlug = "new" | "excellent" | "renovation" | (string & {});

export type ListingType =
  | "sale"
  | "rent"
  | "new_development"
  | "private_listing"
  | "investment";

/**
 * Тип для мультимовних полів (як у нашому JSON та Sanity)
 */
export interface I18nText {
  en: string;
  es: string;
  ru: string;
}

export interface Property {
  id: string;
  propertyId: string;
  slug: string;
  featured: boolean;

  title: I18nText;
  description: I18nText;

  status: PropertyStatus;
  price: number | null;
  priceOnRequest: boolean;

  categories: ("luxury" | "premium" | string)[];

  location: string;
  urbanizacion?: string;
  propertyType: string;
  listingTypes: ListingType[];

  condition: ConditionSlug;
  views: string[];

  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  livingArea?: number;
  plotArea?: number;
  terraceArea?: number;
  floor?: string;
  yearBuilt?: number;

  features: string[];
  amenities: string[];
  lifestyles: string[];

  images: string[];
}

export type PropertySeedDoc = {
  _id?: string;
  _type: "property";
  propertyId: string;
  slug: { _type: "slug"; current: string };
  featured: boolean;

  /**
   * На рівні seed-масиву зберігаємо slug локації.
   * Під час імпорту він конвертується у reference.
   * Приклади: "valencia", "mijas", "guadalmansa"
   */
  location?: string;
  urbanizacion?: string;

  title: {
    _key: string;
    _type: "internationalizedArrayStringValue";
    value: string;
  }[];

  description: unknown;

  status: PropertyStatus;
  priceOnRequest: boolean;
  price?: number;

  categories: readonly string[];
  listingTypes: readonly ListingType[];

  propertyType: string;
  condition: ConditionSlug;
  views: readonly string[];

  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  livingArea?: number;
  plotArea?: number;
  terraceArea?: number;
  floor?: string;
  yearBuilt?: number;

  features: readonly string[];
  amenities: readonly string[];
  lifestyles: readonly string[];
};
