// lib/properties.ts
import type { CardBadge } from "@/components/content/ContentCard";

export type PropertyBadge = CardBadge;

export interface FeaturedProperty {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  price?: string;
  topBadge?: PropertyBadge;
  bottomBadge?: PropertyBadge;
}

const featuredPropertiesData: FeaturedProperty[] = [
  {
    id: "marbella-hillside-villa",
    slug: "marbella-hillside-villa",
    title: "Marbella Hillside Villa",
    description:
      "Authentic style with historic charm and mountain views. A perfect blend of tradition and comfort in a quiet setting.",
    image: "/properties/villa-1.png",
    price: "€1,250,000",
    topBadge: { text: "ROI 6.3%", variant: "pink" },
    bottomBadge: { text: "480 m²", variant: "area" },
  },
  {
    id: "sunset-infinity-villa",
    slug: "sunset-infinity-villa",
    title: "Sunset Infinity Villa",
    description:
      "Modern design with sea views and a cozy terrace. A relaxing space with poolside comfort and full privacy.",
    image: "/properties/villa-2.png",
    price: "€780,000",
    topBadge: { text: "New", variant: "yellow" },
    bottomBadge: { text: "258 m²", variant: "area" },
  },
  {
    id: "sunset-infinity-villa-2",
    slug: "sunset-infinity-villa-2",
    title: "Sunset Infinity Villa 2",
    description:
      "Spacious residence with mountain panorama and private garden. Andalusian spirit combined with a touch of ...",
    image: "/properties/villa-3.png",
    price: "€2,150,000",
    topBadge: { text: "Featured", variant: "red" },
    bottomBadge: { text: "557 m²", variant: "area" },
  },
];

export async function getFeaturedProperties(): Promise<FeaturedProperty[]> {
  // later: replace with Sanity/Firebase query
  return featuredPropertiesData;
}
