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
  // 1. Ідентифікатори
  id: string;
  propertyId: string;
  slug: string;
  featured: boolean;

  // 2. Мультимовний контент (ЗМІНЕНО з string на I18nText)
  title: I18nText;
  description: I18nText;

  // 3. Статус та Ціна
  status: PropertyStatus;
  price: number | null;
  priceOnRequest: boolean;

  // 4. Категорії (ЗМІНЕНО з luxury: boolean на масив categories)
  categories: ("luxury" | "premium" | string)[];

  // 5. Локація та Тип
  location: string;
  urbanizacion?: string;
  propertyType: string;
  listingTypes: ListingType[];

  // 6. Характеристики
  condition: ConditionSlug;
  views: string[];

  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  livingArea?: number;
  plotArea?: number;
  terraceArea?: number; // Додано для відповідності JSON
  floor?: string;
  yearBuilt?: number;

  // 7. Списки таксономій
  features: string[];
  amenities: string[];
  lifestyles: string[];

  // 8. Медіа
  images: string[];
}
