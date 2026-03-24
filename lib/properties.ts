import { createClient as createSanityClient } from "@sanity/client";
import { CardBadge } from "@/components/content/ContentCard";
import { I18nText, Property, PropertyStatus } from "@/lib/types/property";

const readClient = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "drafts",
});

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

  const safeImages = Array.isArray(prop.images)
    ? prop.images.filter((img): img is string => Boolean(img))
    : [];

  return {
    id: prop.id,
    slug: prop.slug,
    title: prop.title?.[lang] || prop.title?.en || "Untitled",
    isFeatured: prop.featured || false,
    description: prop.description?.[lang] || prop.description?.en || "",
    image: safeImages[0] || "/placeholder.png",
    images: safeImages,
    price: prop.price ?? null,
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
      "en": coalesce(pt::text(description.en), ""),
      "es": coalesce(pt::text(description.es), ""),
      "ru": coalesce(pt::text(description.ru), "")
    },
    status,
    price,
    priceOnRequest,
    categories,
    "location": coalesce(location->slug.current, ""),
    propertyType,
    listingTypes,
    condition,
    views,
    bedrooms,
    bathrooms,
    totalArea,
    livingArea,
    plotArea,
    terraceArea,
    floor,
    yearBuilt,
    features,
    amenities,
    lifestyles,
    "images": images[].asset->url
  }`;

  const sanityProperties = await readClient.fetch<Property[]>(query);

  console.log("🏠 readClient returned:", sanityProperties.length, "properties");

  return sanityProperties.map(p => mapToCard(p, locale));
}
