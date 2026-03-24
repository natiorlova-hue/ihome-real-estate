// Responsibility: imports properties and locations ONLY.
// Does NOT touch posts, categories, or any other content type.
//
// Safety model:
//   - Locations: stable _id "location-{slug}" (from locationDocuments)
//   - Properties: stable _id "property.{propertyId}"
//   - createIfNotExists → no deletions, no overwrites, safe to re-run
//   - Dry-run mode: DRY_RUN=true npm run import-sample
//
// Run:
//   npm run import-sample
// Dry run:
//   DRY_RUN=true node --env-file=.env.local node_modules/.bin/tsx scripts/import-sample-data.ts

import { PropertySeedDoc } from "@/lib/types/property";
import { locationDocuments } from "@/sanity/lib/locations";
import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "true";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

// ─────────────────────────────────────────────
// Property seed data
// Images must be added manually via Sanity Studio.
// ─────────────────────────────────────────────

/** Stable deterministic Sanity _id for a property */
const propertyDocId = (propertyId: string) =>
  `property.${propertyId.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;

/**
 * Convert seed location slug to Sanity location document _id.
 * Legacy records without explicit location fall back to Valencia.
 */
const resolveLocationId = (locationSlug?: string): string => {
  const safeSlug = locationSlug?.trim() || "valencia";
  return `location-${safeSlug}`;
};

type PropertyCreateDoc = Omit<PropertySeedDoc, "location"> & {
  _id: string;
  location: {
    _type: "reference";
    _ref: string;
  };
};

const propertyDocuments: PropertySeedDoc[] = [
  {
    _type: "property",
    propertyId: "REF-ELBOSQUE-PINECREST",
    slug: { _type: "slug", current: "villa-pine-crest-el-bosque" },
    featured: true,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa Pine Crest",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa Pine Crest",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла Pine Crest",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Exclusive new construction villa in the prestigious Urbanization El Bosque, Valencia. Designed for harmony with nature, featuring an aerothermal system, premium kitchen, and private pool.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Exclusiva villa de obra nueva en la prestigiosa Urbanización El Bosque, Valencia. Diseñada para estar en armonía con la naturaleza, cuenta con sistema de aerotermia, cocina premium y piscina privada.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Эксклюзивная вилла-новостройка в престижной урбанизации El Bosque, Валенсия. Спроектирована для гармонии с природой, оснащена системой аэротермии, кухней премиум-класса и частным бассейном.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 1000000,
    priceOnRequest: false,
    categories: ["luxury", "newDevelopments"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 315,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
  },
  {
    _type: "property",
    propertyId: "REF-ELBOSQUE-STONEHAVEN",
    slug: { _type: "slug", current: "villa-stonehaven-el-bosque" },
    featured: true,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa Stonehaven",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa Stonehaven",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла Stonehaven",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Avant-garde luxury villa in Urbanization El Bosque, Valencia. A masterpiece of modern architecture with seamless indoor-outdoor flow, high-end finishes, and stunning views.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Villa de lujo vanguardista en la Urbanización El Bosque, Valencia. Una obra maestra de la arquitectura moderna con un flujo interior-exterior perfecto, acabados de alta gama e impresionantes vistas.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Авангардная роскошная вилла в урбанизации El Bosque, Валенсия. Шедевр современной архитектуры с плавным переходом между внутренним и внешним пространством, высококлассной отделкой и потрясающими видами.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 500000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development", "investment"],
    propertyType: "villa",
    condition: "new",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 297,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
  },
  {
    _type: "property",
    propertyId: "REF-ELBOSQUE-FORESTBAY",
    slug: { _type: "slug", current: "villa-forest-bay-el-bosque" },
    featured: true,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa Forest Bay",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa Forest Bay",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла Forest Bay",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Magnificent new construction villa in Urbanization El Bosque, Valencia. Designed to blend seamlessly with its natural surroundings, offering premium amenities, an aerothermal system, and a private pool.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Magnífica villa de obra nueva en la Urbanización El Bosque, Valencia. Diseñada para integrarse perfectamente con su entorno natural, ofreciendo comodidades premium, sistema de aerotermia y piscina privada.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Великолепная вилла-новостройка в урбанизации El Bosque, Валенсия. Спроектирована для идеального слияния с окружающей природой, предлагает первоклассные удобства, систему аэротермии и частный бассейн.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 500000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "private_listing"],
    propertyType: "villa",
    condition: "renovation",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 297,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
  },
  {
    _type: "property",
    propertyId: "REF-ELBOSQUE-FORESTEDGE",
    slug: { _type: "slug", current: "villa-forest-edge-el-bosque" },
    featured: false,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa Forest Edge",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa Forest Edge",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла Forest Edge",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Exclusive modern villa in Urbanization El Bosque, Valencia. Positioned to offer maximum privacy and connection with nature, featuring premium finishes, an aerothermal climate system, and a private pool.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Exclusiva villa moderna en la Urbanización El Bosque, Valencia. Ubicada para ofrecer la máxima privacidad y conexión con la naturaleza, con acabados de primera calidad, sistema de climatización por aerotermia y piscina privada.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s",
              text: "Эксклюзивная современная вилла в урбанизации El Bosque, Валенсия. Расположена так, чтобы обеспечить максимальную приватность и единение с природой, отличается первоклассной отделкой, аэротермической системой климат-контроля и частным бассейном.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 500000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["golf", "mountains"],
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 297,
    features: ["terrace", "parking", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["golf"],
  },

  // Essence Residence
  {
    _type: "property",
    propertyId: "REF-ESSENCE-2BR",
    slug: {
      _type: "slug",
      current: "essence-residence-2-bedroom-apartment",
    },
    featured: true,
    location: "guadalmansa",
    urbanizacion: "New Golden Mile",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "2 bedroom apartment in Essence Residence",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Apartamento de 2 dormitorios en Essence Residence",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Апартаменты с 2 спальнями в Essence Residence",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-2br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-2br",
              text: "Premium 2 bedroom apartment in Essence Residence on the New Golden Mile. A gated new development designed for calm Mediterranean living, with contemporary architecture, generous terraces, landscaped gardens, wellness facilities, concierge service, and 24/7 security.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-2br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-2br",
              text: "Apartamento premium de 2 dormitorios en Essence Residence, en la New Golden Mile. Una promoción de obra nueva cerrada, diseñada para un estilo de vida mediterráneo sereno, con arquitectura contemporánea, amplias terrazas, jardines paisajísticos, zonas wellness, servicio de conserjería y seguridad 24/7.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-2br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-2br",
              text: "Премиальные апартаменты с 2 спальнями в Essence Residence на New Golden Mile. Закрытый новый жилой комплекс, созданный для спокойного средиземноморского образа жизни: современная архитектура, просторные террасы, ландшафтные сады, wellness-зоны, консьерж-сервис и круглосуточная охрана.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 1000000,
    priceOnRequest: false,
    categories: ["premium"],
    listingTypes: ["sale", "new_development"],
    propertyType: "apartment",
    condition: "new",
    views: ["sea", "mountains", "garden", "panoramic"],
    bedrooms: 2,
    bathrooms: 0,
    totalArea: 0,
    features: ["terrace", "closet", "storage", "parking", "ac", "elevator"],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "coworking",
      "lounge",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golden", "golf"],
  },
  {
    _type: "property",
    propertyId: "REF-ESSENCE-3BR",
    slug: {
      _type: "slug",
      current: "essence-residence-3-bedroom-apartment",
    },
    featured: true,
    location: "guadalmansa",
    urbanizacion: "New Golden Mile",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "3 bedroom apartment in Essence Residence",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Apartamento de 3 dormitorios en Essence Residence",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Апартаменты с 3 спальнями в Essence Residence",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-3br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-3br",
              text: "Premium 3 bedroom apartment in Essence Residence on the New Golden Mile. This gated contemporary development combines elegant architecture, spacious terraces, landscaped surroundings, wellness amenities, concierge service, and 24/7 security for a refined Mediterranean lifestyle.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-3br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-3br",
              text: "Apartamento premium de 3 dormitorios en Essence Residence, en la New Golden Mile. Esta promoción contemporánea y cerrada combina arquitectura elegante, amplias terrazas, entorno ajardinado, zonas wellness, servicio de conserjería y seguridad 24/7 para un estilo de vida mediterráneo refinado.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-3br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-3br",
              text: "Премиальные апартаменты с 3 спальнями в Essence Residence на New Golden Mile. Этот современный закрытый комплекс сочетает элегантную архитектуру, просторные террасы, ландшафтное окружение, wellness-инфраструктуру, консьерж-сервис и круглосуточную охрану для утончённого средиземноморского образа жизни.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 2000000,
    priceOnRequest: false,
    categories: ["premium"],
    listingTypes: ["sale", "new_development"],
    propertyType: "apartment",
    condition: "new",
    views: ["sea", "mountains", "garden", "panoramic"],
    bedrooms: 3,
    bathrooms: 0,
    totalArea: 0,
    features: ["terrace", "closet", "storage", "parking", "ac", "elevator"],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "coworking",
      "lounge",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golden", "golf"],
  },
  {
    _type: "property",
    propertyId: "REF-ESSENCE-4BR",
    slug: {
      _type: "slug",
      current: "essence-residence-4-bedroom-apartment",
    },
    featured: true,
    location: "guadalmansa",
    urbanizacion: "New Golden Mile",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "4 bedroom apartment in Essence Residence",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Apartamento de 4 dormitorios en Essence Residence",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Апартаменты с 4 спальнями в Essence Residence",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-4br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-4br",
              text: "Premium 4 bedroom apartment in Essence Residence on the New Golden Mile. Created for a more spacious Mediterranean lifestyle, the development offers contemporary design, generous terraces, landscaped gardens, wellness facilities, concierge service, and 24/7 gated security.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-4br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-4br",
              text: "Apartamento premium de 4 dormitorios en Essence Residence, en la New Golden Mile. Creado para un estilo de vida mediterráneo más amplio, el proyecto ofrece diseño contemporáneo, amplias terrazas, jardines paisajísticos, instalaciones wellness, servicio de conserjería y seguridad 24/7 en comunidad cerrada.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-4br",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-4br",
              text: "Премиальные апартаменты с 4 спальнями в Essence Residence на New Golden Mile. Проект создан для более просторного средиземноморского образа жизни и предлагает современный дизайн, большие террасы, ландшафтные сады, wellness-инфраструктуру, консьерж-сервис и круглосуточную охрану на закрытой территории.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 500000,
    priceOnRequest: false,
    categories: ["premium"],
    listingTypes: ["sale", "new_development"],
    propertyType: "apartment",
    condition: "new",
    views: ["sea", "mountains", "garden", "panoramic"],
    bedrooms: 4,
    bathrooms: 0,
    totalArea: 0,
    features: ["terrace", "closet", "storage", "parking", "ac", "elevator"],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "coworking",
      "lounge",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golden", "golf"],
  },

  // Emerald View
  {
    _type: "property",
    propertyId: "REF-EV-3A02",
    slug: {
      _type: "slug",
      current: "emerald-view-2-bedroom-garden-apartment-3a02",
    },
    featured: true,
    location: "mijas",
    urbanizacion: "Buenavista",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "2 bedroom garden apartment in Emerald View",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Apartamento con jardín de 2 dormitorios en Emerald View",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Апартаменты с садом и 2 спальнями в Emerald View",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-ev-3a02",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-ev-3a02",
              text: "Elegant 2 bedroom garden apartment in Emerald View Club Residences, a new luxury development in Buenavista, Mijas. Designed for calm Mediterranean living with sea-facing terraces, smart home comfort, landscaped surroundings, wellness amenities, and gated security.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-ev-3a02",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-ev-3a02",
              text: "Elegante apartamento con jardín de 2 dormitorios en Emerald View Club Residences, una nueva promoción de lujo en Buenavista, Mijas. Diseñado para un estilo de vida mediterráneo sereno, con terrazas orientadas al mar, confort smart home, entorno ajardinado, zonas wellness y seguridad en comunidad cerrada.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-ev-3a02",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-ev-3a02",
              text: "Элегантные апартаменты с садом и 2 спальнями в Emerald View Club Residences — новом люксовом комплексе в Buenavista, Mijas. Пространство создано для спокойного средиземноморского образа жизни: террасы с морскими видами, smart home, ландшафтная территория, wellness-инфраструктура и охраняемая закрытая урбанизация.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 855000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "apartment",
    condition: "new",
    views: ["sea", "mountains", "panoramic", "garden"],
    bedrooms: 3,
    bathrooms: 2,
    totalArea: 198.1,
    features: [
      "terrace",
      "closet",
      "storage",
      "parking",
      "smart_home",
      "ac",
      "elevator",
    ],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "padel",
      "coworking",
      "lounge",
      "playground",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golf", "families"],
  },
  {
    _type: "property",
    propertyId: "REF-EV-3B02",
    slug: {
      _type: "slug",
      current: "emerald-view-3-bedroom-garden-apartment-3b02",
    },
    featured: true,
    location: "mijas",
    urbanizacion: "Buenavista",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "3 bedroom garden apartment in Emerald View",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Apartamento con jardín de 3 dormitorios en Emerald View",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Апартаменты с садом и 3 спальнями в Emerald View",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-ev-3b02",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-ev-3b02",
              text: "Spacious 3 bedroom garden apartment in Emerald View Club Residences with generous indoor-outdoor living, landscaped privacy, and refined Mediterranean design. Residents enjoy panoramic community views, wellness spaces, social club facilities, and a secure gated setting in Buenavista, Mijas.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-ev-3b02",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-ev-3b02",
              text: "Amplio apartamento con jardín de 3 dormitorios en Emerald View Club Residences, con generosa vida interior-exterior, privacidad ajardinada y un refinado diseño mediterráneo. Los residentes disfrutan de vistas panorámicas del complejo, zonas wellness, social club y una comunidad cerrada y segura en Buenavista, Mijas.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-ev-3b02",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-ev-3b02",
              text: "Просторные апартаменты с садом и 3 спальнями в Emerald View Club Residences с выразительной indoor-outdoor планировкой, приватным ландшафтным окружением и утончённой средиземноморской архитектурой. Жителям доступны wellness-зоны, social club и безопасная закрытая территория в Buenavista, Mijas.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 935000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "apartment",
    condition: "new",
    views: ["sea", "mountains", "panoramic", "garden"],
    bedrooms: 4,
    bathrooms: 3,
    totalArea: 354.98,
    features: [
      "terrace",
      "closet",
      "storage",
      "parking",
      "smart_home",
      "ac",
      "elevator",
    ],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "padel",
      "coworking",
      "lounge",
      "playground",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golf", "families"],
  },
  {
    _type: "property",
    propertyId: "REF-EV-3A31",
    slug: {
      _type: "slug",
      current: "emerald-view-3-bedroom-penthouse-3a31",
    },
    featured: true,
    location: "mijas",
    urbanizacion: "Buenavista",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "3 bedroom penthouse in Emerald View",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Ático de 3 dormitorios en Emerald View",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Пентхаус с 3 спальнями в Emerald View",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-ev-3a31",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-ev-3a31",
              text: "Sophisticated 3 bedroom penthouse in Emerald View Club Residences with expansive terraces, far-reaching Mediterranean views, and elevated privacy. The home combines refined finishes, underfloor heating, smart home technology, and access to premium wellness, coworking, and concierge amenities.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-ev-3a31",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-ev-3a31",
              text: "Sofisticado ático de 3 dormitorios en Emerald View Club Residences con amplias terrazas, vistas abiertas al Mediterráneo y una elevada sensación de privacidad. La vivienda combina acabados refinados, suelo radiante, tecnología smart home y acceso a amenities premium de wellness, coworking y concierge.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-ev-3a31",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-ev-3a31",
              text: "Утончённый пентхаус с 3 спальнями в Emerald View Club Residences с большими террасами, открытыми видами на Средиземное море и повышенным уровнем приватности. В резиденции — качественная отделка, тёплые полы, smart home и доступ к премиальным wellness, coworking и concierge пространствам.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 1415200,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "penthouse",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 3,
    bathrooms: 2,
    totalArea: 235.24,
    features: [
      "terrace",
      "closet",
      "storage",
      "parking",
      "smart_home",
      "ac",
      "elevator",
    ],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "padel",
      "coworking",
      "lounge",
      "bbq",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golf", "golden"],
  },
  {
    _type: "property",
    propertyId: "REF-EV-1001",
    slug: { _type: "slug", current: "emerald-view-garden-villa-1001" },
    featured: true,
    location: "mijas",
    urbanizacion: "Buenavista",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Garden Villa in Emerald View",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Garden Villa en Emerald View",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Garden Villa в Emerald View",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-ev-1001",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-ev-1001",
              text: "Exclusive Garden Villa in Emerald View Club Residences with expansive interior volume, large private garden, generous terraces, and a sanctuary-like atmosphere. This residence blends privacy, contemporary Mediterranean elegance, smart home systems, and access to the full wellness and social club program of the community.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-ev-1001",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-ev-1001",
              text: "Exclusiva Garden Villa en Emerald View Club Residences con gran volumen interior, amplio jardín privado, generosas terrazas y una atmósfera de refugio. Esta residencia une privacidad, elegancia mediterránea contemporánea, sistemas smart home y acceso al programa completo de wellness y social club de la comunidad.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-ev-1001",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-ev-1001",
              text: "Эксклюзивная Garden Villa в Emerald View Club Residences с большим внутренним пространством, просторным приватным садом, крупными террасами и атмосферой частного оазиса. Резиденция сочетает приватность, современную средиземноморскую эстетику, smart home и доступ ко всей wellness и social club инфраструктуре комплекса.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 1695800,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic", "garden"],
    bedrooms: 4,
    bathrooms: 5,
    totalArea: 395.79,
    features: ["terrace", "closet", "storage", "parking", "smart_home", "ac"],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "padel",
      "coworking",
      "lounge",
      "bbq",
      "playground",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golf", "families", "golden"],
  },
  {
    _type: "property",
    propertyId: "REF-EV-1012",
    slug: { _type: "slug", current: "emerald-view-sky-villa-1012" },
    featured: true,
    location: "mijas",
    urbanizacion: "Buenavista",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Sky Villa in Emerald View",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Sky Villa en Emerald View",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Sky Villa в Emerald View",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-ev-1012",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-ev-1012",
              text: "Refined Sky Villa in Emerald View Club Residences with elevated privacy, broad terraces, and open Mediterranean views. Created for a premium lifestyle above the coastline, it offers smart climate control, underfloor heating, security technology, and access to spa, fitness, coworking, concierge, and resort-style leisure spaces.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-ev-1012",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-ev-1012",
              text: "Refinada Sky Villa en Emerald View Club Residences con privacidad elevada, amplias terrazas y vistas abiertas al Mediterráneo. Creada para un estilo de vida premium sobre la costa, ofrece climatización inteligente, suelo radiante, tecnología de seguridad y acceso a spa, fitness, coworking, concierge y espacios de ocio tipo resort.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-ev-1012",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-ev-1012",
              text: "Утончённая Sky Villa в Emerald View Club Residences с повышенной приватностью, широкими террасами и открытыми средиземноморскими видами. Резиденция создана для премиального образа жизни над побережьем и предлагает интеллектуальный климат-контроль, тёплые полы, системы безопасности и доступ к spa, fitness, coworking, concierge и resort-инфраструктуре.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 1542000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 3,
    bathrooms: 5,
    totalArea: 304.08,
    features: ["terrace", "closet", "storage", "parking", "smart_home", "ac"],
    amenities: [
      "pool",
      "indoor_pool",
      "spa",
      "gym",
      "padel",
      "coworking",
      "lounge",
      "bbq",
      "garden",
      "security",
      "gated",
      "concierge",
    ],
    lifestyles: ["sea", "golf", "golden"],
  },

  // Seven Pearls
  {
    _type: "property",
    propertyId: "VILLA-1",
    slug: { _type: "slug", current: "seven-pearls-villa-1" },
    featured: true,
    location: "mijas",
    urbanizacion: "Mijas",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa 1 in Seven Pearls",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa 1 en Seven Pearls",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла 1 в Seven Pearls",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-sp-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-sp-1",
              text: "Exclusive 4-bedroom villa with panoramic sea views, private pool, and underfloor heating throughout.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-sp-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-sp-1",
              text: "Exclusiva villa de 4 dormitorios con vistas panorámicas al mar, piscina privada y suelo radiante.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-sp-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-sp-1",
              text: "Эксклюзивная вилла с 4 спальнями, панорамным видом на море, частным бассейном и подогревом полов.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 2250000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 219.0,
    livingArea: 150.15,
    plotArea: 580.15,
    features: ["terrace", "closet", "parking", "smart_home", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["sea", "golf", "golden"],
  },
  {
    _type: "property",
    propertyId: "VILLA-2",
    slug: { _type: "slug", current: "seven-pearls-villa-2" },
    featured: true,
    location: "mijas",
    urbanizacion: "Mijas",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa 2 in Seven Pearls",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa 2 en Seven Pearls",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла 2 в Seven Pearls",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-sp-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-sp-2",
              text: "Contemporary 4-bedroom residence offering Mediterranean elegance and smart home technology.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-sp-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-sp-2",
              text: "Residencia contemporánea de 4 dormitorios que ofrece elegancia mediterránea y tecnología inteligente.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-sp-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-sp-2",
              text: "Современная резиденция с 4 спальнями, предлагающая средиземноморскую элегантность и технологии умного дома.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 2125000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 243.3,
    livingArea: 151.15,
    plotArea: 538.85,
    features: ["terrace", "closet", "parking", "smart_home", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["sea", "golf", "golden"],
  },
  {
    _type: "property",
    propertyId: "VILLA-3",
    slug: { _type: "slug", current: "seven-pearls-villa-3" },
    featured: true,
    location: "mijas",
    urbanizacion: "Mijas",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa 3 in Seven Pearls",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa 3 en Seven Pearls",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла 3 в Seven Pearls",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-sp-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-sp-3",
              text: "Stunning villa on a large plot of nearly 900m², perfectly blending modern comfort with natural beauty.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-sp-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-sp-3",
              text: "Impresionante villa en una gran parcela de casi 900m², combinando confort moderno y belleza natural.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-sp-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-sp-3",
              text: "Потрясающая вилла на большом участке площадью почти 900 м², сочетающая современный комфорт и природную красоту.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 2125000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 221.05,
    livingArea: 148.5,
    plotArea: 898.75,
    features: ["terrace", "closet", "parking", "smart_home", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["sea", "golf", "golden"],
  },
  {
    _type: "property",
    propertyId: "VILLA-4",
    slug: { _type: "slug", current: "seven-pearls-villa-4" },
    featured: true,
    location: "mijas",
    urbanizacion: "Mijas",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa 4 in Seven Pearls",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa 4 en Seven Pearls",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла 4 в Seven Pearls",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-sp-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-sp-4",
              text: "The largest plot in the collection (945m²), offering maximum space and breathtaking Mediterranean views.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-sp-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-sp-4",
              text: "La parcela más grande de la colección (945m²), ofreciendo máximo espacio y vistas al Mediterráneo.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-sp-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-sp-4",
              text: "Самый большой участок в коллекции (945 м²), предлагающий максимум пространства и виды на Средиземное море.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 1975000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 267.7,
    livingArea: 176.84,
    plotArea: 945.7,
    features: ["terrace", "closet", "parking", "smart_home", "ac"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["sea", "golf", "golden"],
  },
  {
    _type: "property",
    propertyId: "VILLA-5",
    slug: { _type: "slug", current: "seven-pearls-villa-5" },
    featured: true,
    location: "mijas",
    urbanizacion: "Mijas",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa 5 in Seven Pearls (with Elevator)",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa 5 en Seven Pearls (con Ascensor)",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла 5 в Seven Pearls (с лифтом)",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-sp-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-sp-5",
              text: "Premium villa featuring a private elevator, high-end Siemens appliances, and superior finishes.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-sp-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-sp-5",
              text: "Villa premium con ascensor privado, electrodomésticos Siemens de alta gama y acabados superiores.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-sp-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-sp-5",
              text: "Вилла премиум-класса с частным лифтом, бытовой техникой Siemens и отделкой высшего качества.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 2300000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 247.95,
    livingArea: 151.05,
    plotArea: 660.8,
    features: ["terrace", "closet", "parking", "smart_home", "ac", "elevator"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["sea", "golf", "golden"],
  },
  {
    _type: "property",
    propertyId: "VILLA-6",
    slug: { _type: "slug", current: "seven-pearls-villa-6" },
    featured: true,
    location: "mijas",
    urbanizacion: "Mijas",
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue",
        value: "Villa 6 in Seven Pearls (with Elevator)",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue",
        value: "Villa 6 en Seven Pearls (con Ascensor)",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue",
        value: "Вилла 6 в Seven Pearls (с лифтом)",
      },
    ],
    description: {
      _type: "localeBlock",
      en: [
        {
          _type: "block",
          _key: "desc-en-sp-6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-en-sp-6",
              text: "Exquisite residence with private elevator and seamless indoor-outdoor living flow.",
              marks: [],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block",
          _key: "desc-es-sp-6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-es-sp-6",
              text: "Exquisita residencia con ascensor privado y un flujo perfecto entre el interior y el exterior.",
              marks: [],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block",
          _key: "desc-ru-sp-6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s-ru-sp-6",
              text: "Изысканная резиденция с частным лифтом и безупречным переходом между внутренним и внешним пространством.",
              marks: [],
            },
          ],
        },
      ],
    },
    status: "new_development",
    price: 2250000,
    priceOnRequest: false,
    categories: ["luxury"],
    listingTypes: ["sale", "new_development"],
    propertyType: "villa",
    condition: "new",
    views: ["sea", "mountains", "panoramic"],
    bedrooms: 4,
    bathrooms: 4,
    totalArea: 247.95,
    livingArea: 154.99,
    plotArea: 815.4,
    features: ["terrace", "closet", "parking", "smart_home", "ac", "elevator"],
    amenities: ["pool", "garden", "security", "gated"],
    lifestyles: ["sea", "golf", "golden"],
  },
];

// ─────────────────────────────────────────────
// Import function
// ─────────────────────────────────────────────

async function importSampleData() {
  process.stdout.write(
    DRY_RUN
      ? "🔍 DRY RUN — no data will be written\n"
      : "🚀 Starting properties & locations import...\n"
  );

  let locationsCreated = 0;
  let locationsSkipped = 0;
  let propertiesCreated = 0;
  let propertiesSkipped = 0;

  // ── Step 1: Upsert Locations ───────────────────────────────────
  process.stdout.write("📍 Upserting locations...\n");

  for (const loc of locationDocuments) {
    if (DRY_RUN) {
      process.stdout.write(
        `[DRY] Would createIfNotExists location: ${loc._id}\n`
      );
      locationsCreated++;
      continue;
    }

    const existing: string | null = await client.fetch(`*[_id == $id][0]._id`, {
      id: loc._id,
    });

    if (existing) {
      locationsSkipped++;
      continue;
    }

    await client.createIfNotExists(loc);
    const label = loc.title.find(t => t._key === "en")?.value ?? loc._id;
    process.stdout.write(`✅ Created location: ${label}\n`);
    locationsCreated++;
  }

  // ── Step 2: Upsert Properties ──────────────────────────────────
  process.stdout.write("🏠 Upserting properties...\n");

  for (const prop of propertyDocuments) {
    const docId = propertyDocId(prop.propertyId);
    const locationId = resolveLocationId(prop.location);

    if (DRY_RUN) {
      process.stdout.write(
        `[DRY] Would createIfNotExists property: ${docId} (location: ${locationId})\n`
      );
      propertiesCreated++;
      continue;
    }

    const existing: string | null = await client.fetch(`*[_id == $id][0]._id`, {
      id: docId,
    });

    if (existing) {
      const label =
        prop.title.find(t => t._key === "en")?.value ?? prop.propertyId;
      process.stdout.write(`⏭️ Skipped property (already exists): ${label}\n`);
      propertiesSkipped++;
      continue;
    }

    const locationExists: string | null = await client.fetch(
      `*[_id == $id][0]._id`,
      { id: locationId }
    );

    if (!locationExists) {
      process.stderr.write(
        `❌ Location '${locationId}' not found — skipping ${prop.propertyId}\n`
      );
      continue;
    }

    const doc: PropertyCreateDoc = {
      ...prop,
      _id: docId,
      location: { _type: "reference", _ref: locationId },
    };

    await client.createIfNotExists(doc);

    const label =
      prop.title.find(t => t._key === "en")?.value ?? prop.propertyId;
    process.stdout.write(`✅ Created property: ${label}\n`);
    propertiesCreated++;
  }

  // ── Summary ───────────────────────────────────────────────────
  process.stdout.write("\n📊 Summary:\n");
  process.stdout.write(
    `   Locations  — created: ${locationsCreated}, skipped: ${locationsSkipped}\n`
  );
  process.stdout.write(
    `   Properties — created: ${propertiesCreated}, skipped: ${propertiesSkipped}\n`
  );
  process.stdout.write(
    "⚠️ NOTE: Images must be added manually in Sanity Studio.\n"
  );
  process.stdout.write(
    DRY_RUN
      ? "🔍 DRY RUN complete — no data was written.\n"
      : "🎉 Import complete.\n"
  );
}

if (require.main === module) {
  importSampleData().catch(err => {
    process.stderr.write(`Fatal error: ${String(err)}\n`);
    process.exit(1);
  });
}

export { importSampleData };
