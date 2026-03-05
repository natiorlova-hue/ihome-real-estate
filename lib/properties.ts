import { CardBadge } from "@/components/content/ContentCard";
import { I18nText, Property, PropertyStatus } from "@/lib/types/property";

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

  // === КЛЮЧІ ДЛЯ ФІЛЬТРАЦІЇ (ОБОВ'ЯЗКОВО) ===
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
    title: prop.title[lang] || prop.title.en,
    isFeatured: prop.featured,
    description: prop.description[lang] || prop.description.en,
    image: prop.images[0] || "/placeholder.png",
    images: prop.images,
    price: prop.price,
    priceOnRequest: prop.priceOnRequest,
    beds: prop.bedrooms,
    baths: prop.bathrooms,
    totalArea: prop.totalArea,

    // Прокидаємо дані для фільтрів
    categories: prop.categories || [],
    location: prop.location,
    propertyType: prop.propertyType,
    lifestyles: prop.lifestyles || [],
    features: prop.features || [],
    amenities: prop.amenities || [],
    views: prop.views || [],
    condition: prop.condition,
    status: prop.status,
    listingTypes: prop.listingTypes || [],

    topBadge: {
      text: statusTranslations[prop.status].text,
      variant: statusTranslations[prop.status].variant,
    },
    bottomBadge: {
      text: `${prop.totalArea} m²`,
      variant: "area",
    },
  };
}

const featuredPropertiesData: Property[] = [
  {
    id: "prop-el-bosque-pine-crest",
    propertyId: "REF-ELBOSQUE-PINECREST",
    slug: "villa-pine-crest-el-bosque",
    featured: true, // Встановлено true, щоб відображалося в Featured Homes
    title: {
      en: "Villa Pine Crest",
      es: "Villa Pine Crest",
      ru: "Вилла Pine Crest",
    },
    description: {
      en: "Exclusive new construction villa in the prestigious Urbanization El Bosque, Valencia. Designed for harmony with nature, featuring an aerothermal system, premium kitchen, and private pool.",
      es: "Exclusiva villa de obra nueva en la prestigiosa Urbanización El Bosque, Valencia. Diseñada para estar en armonía con la naturaleza, cuenta con sistema de aerotermia, cocina premium y piscina privada.",
      ru: "Эксклюзивная вилла-новостройка в престижной урбанизации El Bosque, Валенсия. Спроектирована для гармонии с природой, оснащена системой аэротермии, кухней премиум-класса и частным бассейном.",
    },
    status: "new_development",
    price: 1000000,
    priceOnRequest: false,
    categories: ["luxury", "newDevelopments"], // Додано технічний тег для фільтра вкладок
    location: "valencia",
    propertyType: "villa",
    listingTypes: ["sale", "new_development"],
    condition: "new",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 315,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
    images: [
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_1.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_2.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_3.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_4.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_5.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_6.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_7.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_8.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_9.jpg",
      "/images-property/villa-pine-crest/Pine_Crest_BSQII_10.jpg",
    ],
  },
  {
    id: "prop-el-bosque-stonehaven",
    propertyId: "REF-ELBOSQUE-STONEHAVEN",
    slug: "villa-stonehaven-el-bosque",
    featured: true,
    title: {
      en: "Villa Stonehaven",
      es: "Villa Stonehaven",
      ru: "Вилла Stonehaven",
    },
    description: {
      en: "Avant-garde luxury villa in Urbanization El Bosque, Valencia. A masterpiece of modern architecture with seamless indoor-outdoor flow, high-end finishes, and stunning views.",
      es: "Villa de lujo vanguardista en la Urbanización El Bosque, Valencia. Una obra maestra de la arquitectura moderna con un flujo interior-exterior perfecto, acabados de alta gama e impresionantes vistas.",
      ru: "Авангардная роскошная вилла в урбанизации El Bosque, Валенсия. Шедевр современной архитектуры с плавным переходом между внутренним и внешним пространством, высококлассной отделкой и потрясающими видами.",
    },
    status: "new_development",
    price: 500000,
    priceOnRequest: false,
    categories: ["luxury"],
    location: "valencia",
    propertyType: "villa",
    listingTypes: ["sale", "new_development", "investment"],
    condition: "new",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 297,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
    images: [
      "/images-property/villa-stonehaven/Stonehaven_BSQII_1.JPG",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_2.JPG",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_3.JPG",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_4.JPG",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_5.JPG",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_6.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_7.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_8.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_9.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_10.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_11.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_12.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_13.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_14.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_15.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_16.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_17.jpg",
      "/images-property/villa-stonehaven/Stonehaven_BSQII_18.jpg",
    ],
  },
  {
    id: "prop-el-bosque-forest-bay",
    propertyId: "REF-ELBOSQUE-FORESTBAY",
    slug: "villa-forest-bay-el-bosque",
    featured: true,
    title: {
      en: "Villa Forest Bay",
      es: "Villa Forest Bay",
      ru: "Вилла Forest Bay",
    },
    description: {
      en: "Magnificent new construction villa in Urbanization El Bosque, Valencia. Designed to blend seamlessly with its natural surroundings, offering premium amenities, an aerothermal system, and a private pool.",
      es: "Magnífica villa de obra nueva en la Urbanización El Bosque, Valencia. Diseñada para integrarse perfectamente con su entorno natural, ofreciendo comodidades premium, sistema de aerotermia y piscina privada.",
      ru: "Великолепная вилла-новостройка в урбанизации El Bosque, Валенсия. Спроектирована для идеального слияния с окружающей природой, предлагает первоклассные удобства, систему аэротермии и частный бассейн.",
    },
    status: "new_development",
    price: 500000,
    priceOnRequest: false,
    categories: ["luxury"],
    location: "valencia",
    propertyType: "villa",
    listingTypes: ["sale", "private_listing"],
    condition: "renovation",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 297,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
    images: [
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_1.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_2.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_3.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_4.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_5.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_6.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_7.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_8.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_9.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_10.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_11.jpg",
      "/images-property/villa-forest-bay/Forest_Bay_BSQII_12.jpg",
    ],
  },
  {
    id: "prop-el-bosque-forest-edge",
    propertyId: "REF-ELBOSQUE-FORESTEDGE",
    slug: "villa-forest-edge-el-bosque",
    featured: false,
    title: {
      en: "Villa Forest Edge",
      es: "Villa Forest Edge",
      ru: "Вилла Forest Edge",
    },
    description: {
      en: "Exclusive modern villa in Urbanization El Bosque, Valencia. Positioned to offer maximum privacy and connection with nature, featuring premium finishes, an aerothermal climate system, and a private pool.",
      es: "Exclusiva villa moderna en la Urbanización El Bosque, Valencia. Ubicada para ofrecer la máxima privacidad y conexión con la naturaleza, con acabados de primera calidad, sistema de climatización por aerotermia y piscina privada.",
      ru: "Эксклюзивная современная вилла в урбанизации El Bosque, Валенсия. Расположена так, чтобы обеспечить максимальную приватность и единение с природой, отличается первоклассной отделкой, аэротермической системой климат-контроля и частным бассейном.",
    },
    status: "new_development",
    price: 500000,
    priceOnRequest: false,
    categories: ["luxury"],
    location: "valencia",
    propertyType: "villa",
    listingTypes: ["sale", "new_development"],
    condition: "new",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 297,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
    images: [
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_1.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_2.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_3.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_4.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_5.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_6.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_7.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_8.jpg",
      "/images-property/villa-forest-edge/Forest_Edge_BSQII_9.jpg",
    ],
  },
];

export async function getFeaturedProperties(
  locale: string
): Promise<PropertyCardData[]> {
  return featuredPropertiesData.map(p => mapToCard(p, locale));
}
