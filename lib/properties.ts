// lib/properties.ts

import { CardBadge } from "@/components/content/ContentCard";
import { I18nText, Property, PropertyStatus } from "@/lib/types/property";
import { client } from "@/sanity/lib/client";

export interface PropertyCardData {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  price: number | null;
  priceOnRequest: boolean;
  beds: number;
  baths: number;
  totalArea: number;
  isFeatured: boolean;

  // === КЛЮЧІ ДЛЯ ФІЛЬТРАЦІЇ ===
  categories: string[];
  location: string;
  propertyType: string;
  lifestyles: string[];
  features: string[];
  amenities: string[];
  views: string[];
  condition: string;
  status: PropertyStatus;
  listingTypes: string[];

  topBadge?: CardBadge;
  bottomBadge?: CardBadge;
}

const statusTranslations: Record<
  PropertyStatus,
  { text: string; variant: "pink" | "yellow" | "red" }
> = {
  new_development: { text: "New Build", variant: "yellow" },
  resale: { text: "Resale", variant: "pink" },
  for_rent: { text: "For Rent", variant: "pink" },
  sold: { text: "Sold", variant: "red" },
};

export function mapToCard(prop: Property, locale: string): PropertyCardData {
  const lang = (locale as keyof I18nText) || "en";

  return {
    id: prop.id,
    slug: prop.slug,
    // Безпечне отримання тексту, якщо раптом його не заповнили в адмінці
    title: prop.title?.[lang] || prop.title?.en || "Untitled",
    isFeatured: prop.featured || false,
    description: prop.description?.[lang] || prop.description?.en || "",
    image: prop.images?.[0] || "/placeholder.png",
    images: prop.images || [],
    price: prop.price,
    priceOnRequest: prop.priceOnRequest || false,
    beds: prop.bedrooms || 0,
    baths: prop.bathrooms || 0,
    totalArea: prop.totalArea || 0,

    categories: prop.categories || [],
    location: prop.location || "",
    propertyType: prop.propertyType || "",
    lifestyles: prop.lifestyles || [],
    features: prop.features || [],
    amenities: prop.amenities || [],
    views: prop.views || [],
    condition: prop.condition || "new",
    status: prop.status || "resale",
    listingTypes: prop.listingTypes || [],

    topBadge: prop.status
      ? {
          text: statusTranslations[prop.status]?.text || prop.status,
          variant: statusTranslations[prop.status]?.variant || "pink",
        }
      : undefined,
    bottomBadge: {
      text: `${prop.totalArea || 0} m²`,
      variant: "area",
    },
  };
}

export async function getFeaturedProperties(
  locale: string
): Promise<PropertyCardData[]> {
  // GROQ запит до бази даних Sanity
  // Ми відразу форматуємо title та description у зручний об'єкт {en, es, ru}
  // pt::text() використовується для витягування простого тексту з блоків PortableText (якщо description є блоком)
  const query = `*[_type == "property"] | order(_createdAt desc) {
    "id": _id,
    propertyId,
    "slug": slug.current,
    featured,
    "title": {
      "en": coalesce(title[_key == "en"][0].value, ""),
      "es": coalesce(title[_key == "es"][0].value, ""),
      "ru": coalesce(title[_key == "ru"][0].value, "")
    },
    "description": {
      "en": coalesce(pt::text(description[_key == "en"][0].value), ""),
      "es": coalesce(pt::text(description[_key == "es"][0].value), ""),
      "ru": coalesce(pt::text(description[_key == "ru"][0].value), "")
    },
    status,
    price,
    priceOnRequest,
    categories,
    "location": location->slug.current,
    propertyType,
    listingTypes,
    condition,
    views,
    bedrooms,
    bathrooms,
    totalArea,
    features,
    amenities,
    lifestyles,
    "images": images[].asset->url
  }`;

  const sanityProperties = await client.fetch<Property[]>(
    query,
    {},
    {
      // Вказуємо next.js кешувати чи ревалідувати дані (наприклад, кожні 30 секунд)
      next: { revalidate: 30 },
    }
  );

  return sanityProperties.map(p => mapToCard(p, locale));
}

// Хардкод (масив featuredPropertiesData) повністю видалено.
// Функція getFeaturedProperties тепер використовує client.fetch() для виклику GROQ-запиту.
// Запит дістає всі опубліковані об'єкти типу "property", витягує URL-адреси картинок та коректно розпаковує мультимовні поля (title та description) у формат, який очікує ваша функція mapToCard.
// Додано базову ревалідацію Next.js (revalidate: 30), щоб сайт оновлювався майже одразу після публікації об'єкта в адмінці.
