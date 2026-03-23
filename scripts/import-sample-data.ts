//scripts/import-sample-data.ts
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

const propertyDocuments = [
  {
    _type: "property" as const,
    propertyId: "REF-ELBOSQUE-PINECREST",
    slug: { _type: "slug" as const, current: "villa-pine-crest-el-bosque" },
    featured: true,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Pine Crest",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Pine Crest",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue" as const,
        value: "Вилла Pine Crest",
      },
    ],
    description: {
      _type: "localeBlock" as const,
      en: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Exclusive new construction villa in the prestigious Urbanization El Bosque, Valencia. Designed for harmony with nature, featuring an aerothermal system, premium kitchen, and private pool.",
              marks: [] as string[],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Exclusiva villa de obra nueva en la prestigiosa Urbanización El Bosque, Valencia. Diseñada para estar en armonía con la naturaleza, cuenta con sistema de aerotermia, cocina premium y piscina privada.",
              marks: [] as string[],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Эксклюзивная вилла-новостройка в престижной урбанизации El Bosque, Валенсия. Спроектирована для гармонии с природой, оснащена системой аэротермии, кухней премиум-класса и частным бассейном.",
              marks: [] as string[],
            },
          ],
        },
      ],
    },
    status: "new_development" as const,
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
    _type: "property" as const,
    propertyId: "REF-ELBOSQUE-STONEHAVEN",
    slug: { _type: "slug" as const, current: "villa-stonehaven-el-bosque" },
    featured: true,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Stonehaven",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Stonehaven",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue" as const,
        value: "Вилла Stonehaven",
      },
    ],
    description: {
      _type: "localeBlock" as const,
      en: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Avant-garde luxury villa in Urbanization El Bosque, Valencia. A masterpiece of modern architecture with seamless indoor-outdoor flow, high-end finishes, and stunning views.",
              marks: [] as string[],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Villa de lujo vanguardista en la Urbanización El Bosque, Valencia. Una obra maestra de la arquitectura moderna con un flujo interior-exterior perfecto, acabados de alta gama e impresionantes vistas.",
              marks: [] as string[],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Авангардная роскошная вилла в урбанизации El Bosque, Валенсия. Шедевр современной архитектуры с плавным переходом между внутренним и внешним пространством, высококлассной отделкой и потрясающими видами.",
              marks: [] as string[],
            },
          ],
        },
      ],
    },
    status: "new_development" as const,
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
    _type: "property" as const,
    propertyId: "REF-ELBOSQUE-FORESTBAY",
    slug: { _type: "slug" as const, current: "villa-forest-bay-el-bosque" },
    featured: true,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Forest Bay",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Forest Bay",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue" as const,
        value: "Вилла Forest Bay",
      },
    ],
    description: {
      _type: "localeBlock" as const,
      en: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Magnificent new construction villa in Urbanization El Bosque, Valencia. Designed to blend seamlessly with its natural surroundings, offering premium amenities, an aerothermal system, and a private pool.",
              marks: [] as string[],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Magnífica villa de obra nueva en la Urbanización El Bosque, Valencia. Diseñada para integrarse perfectamente con su entorno natural, ofreciendo comodidades premium, sistema de aerotermia y piscina privada.",
              marks: [] as string[],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Великолепная вилла-новостройка в урбанизации El Bosque, Валенсия. Спроектирована для идеального слияния с окружающей природой, предлагает первоклассные удобства, систему аэротермии и частный бассейн.",
              marks: [] as string[],
            },
          ],
        },
      ],
    },
    status: "new_development" as const,
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
    _type: "property" as const,
    propertyId: "REF-ELBOSQUE-FORESTEDGE",
    slug: { _type: "slug" as const, current: "villa-forest-edge-el-bosque" },
    featured: false,
    title: [
      {
        _key: "en",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Forest Edge",
      },
      {
        _key: "es",
        _type: "internationalizedArrayStringValue" as const,
        value: "Villa Forest Edge",
      },
      {
        _key: "ru",
        _type: "internationalizedArrayStringValue" as const,
        value: "Вилла Forest Edge",
      },
    ],
    description: {
      _type: "localeBlock" as const,
      en: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Exclusive modern villa in Urbanization El Bosque, Valencia. Positioned to offer maximum privacy and connection with nature, featuring premium finishes, an aerothermal climate system, and a private pool.",
              marks: [] as string[],
            },
          ],
        },
      ],
      es: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Exclusiva villa moderna en la Urbanización El Bosque, Valencia. Ubicada para ofrecer la máxima privacidad y conexión con la naturaleza, con acabados de primera calidad, sistema de climatización por aerotermia y piscina privada.",
              marks: [] as string[],
            },
          ],
        },
      ],
      ru: [
        {
          _type: "block" as const,
          _key: "desc",
          style: "normal" as const,
          children: [
            {
              _type: "span" as const,
              _key: "s",
              text: "Эксклюзивная современная вилла в урбанизации El Bosque, Валенсия. Расположена так, чтобы обеспечить максимальную приватность и единение с природой, отличается первоклассной отделкой, аэротермической системой климат-контроля и частным бассейном.",
              marks: [] as string[],
            },
          ],
        },
      ],
    },
    status: "new_development" as const,
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
  // locationDocuments already carry stable _id values ("location-{slug}")
  // so createIfNotExists is safe to call on every run.
  process.stdout.write("📍 Upserting locations...\n");

  for (const loc of locationDocuments) {
    if (DRY_RUN) {
      process.stdout.write(`[DRY] Would createIfNotExists location: ${loc._id}\n`);
      locationsCreated++;
      continue;
    }

    const existing: string | null = await client.fetch(
      `*[_id == $id][0]._id`,
      { id: loc._id }
    );

    if (existing) {
      locationsSkipped++;
    } else {
      await client.createIfNotExists(loc);
      const label = loc.title.find(t => t._key === "en")?.value ?? loc._id;
      process.stdout.write(`✅ Created location: ${label}\n`);
      locationsCreated++;
    }
  }

  // ── Step 2: Upsert Properties ──────────────────────────────────
  process.stdout.write("🏠 Upserting properties...\n");

  for (const prop of propertyDocuments) {
    const docId = propertyDocId(prop.propertyId);
    const locationId = "location-valencia"; // all current properties are in Valencia

    if (DRY_RUN) {
      process.stdout.write(
        `[DRY] Would createIfNotExists property: ${docId} (location: ${locationId})\n`
      );
      propertiesCreated++;
      continue;
    }

    const existing: string | null = await client.fetch(
      `*[_id == $id][0]._id`,
      { id: docId }
    );

    if (existing) {
      const label = prop.title.find(t => t._key === "en")?.value ?? prop.propertyId;
      process.stdout.write(`⏭️ Skipped property (already exists): ${label}\n`);
      propertiesSkipped++;
      continue;
    }

    // Verify location exists before referencing it
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

    const doc = {
      ...prop,
      _id: docId,
      location: { _type: "reference" as const, _ref: locationId },
    };

    await client.createIfNotExists(doc);
    const label = prop.title.find(t => t._key === "en")?.value ?? prop.propertyId;
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
  process.stdout.write("⚠️  NOTE: Images must be added manually in Sanity Studio.\n");
  process.stdout.write(
    DRY_RUN
      ? "🔍 DRY RUN complete — no data was written.\n"
      : "🎉 Import complete.\n"
  );
}

// Run the import if this script is executed directly
if (require.main === module) {
  importSampleData().catch(err => {
    process.stderr.write(`Fatal error: ${String(err)}\n`);
    process.exit(1);
  });
}

export { importSampleData };
