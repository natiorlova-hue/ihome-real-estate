// lib/properties.ts

export type PropertyBadgeVariant = "pink" | "yellow" | "red" | "area";

export type PropertyBadgeData =
  | { type: "roi"; value: number; variant: "pink" }
  | { type: "new"; variant: "yellow" }
  | { type: "featured"; variant: "red" }
  | { type: "area"; value: number; variant: "area" };

export type FeaturedPropertyId = "p1" | "p2" | "p3";

export interface FeaturedProperty {
  id: FeaturedPropertyId;
  slug: string;
  image: string;
  price?: number;
  beds?: number;
  baths?: number;
  topBadge?: PropertyBadgeData;
  bottomBadge?: PropertyBadgeData;
}

const featuredPropertiesData: FeaturedProperty[] = [
  {
    id: "p1",
    slug: "marbella-hillside-villa",
    image: "/images-property/marbella-hillside-villa.png",
    price: 1_250_000,
    beds: 5,
    baths: 3,
    topBadge: { type: "roi", value: 6.3, variant: "pink" },
    bottomBadge: { type: "area", value: 480, variant: "area" },
  },
  {
    id: "p2",
    slug: "sunset-infinity-villa",
    image: "/images-property/sunset-infinity-villa-new.png",
    price: 780_000,
    beds: 4,
    baths: 2,
    topBadge: { type: "new", variant: "yellow" },
    bottomBadge: { type: "area", value: 258, variant: "area" },
  },
  {
    id: "p3",
    slug: "sunset-infinity-villa-2",
    image: "/images-property/sunset-infinity-villa.png",
    price: 2_150_000,
    beds: 6,
    baths: 3,
    topBadge: { type: "featured", variant: "red" },
    bottomBadge: { type: "area", value: 557, variant: "area" },
  },
];

export async function getFeaturedProperties(): Promise<FeaturedProperty[]> {
  // later: replace with Sanity query
  return featuredPropertiesData;
}
