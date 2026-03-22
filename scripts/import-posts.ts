// scripts/import-posts.ts
// Responsibility: imports blog posts (type "post") and their categories ONLY.
// Does NOT touch properties, locations, or any other content type.
//
// Safety model:
//   - Stable _id derived from slug (e.g. "post.buying-property-in-spain")
//   - createIfNotExists → no duplicates on re-run
//   - Categories use stable _id derived from categoryKey
//   - Dry-run mode: DRY_RUN=true npx tsx scripts/import-posts.ts
//
// Run:
//   npx tsx scripts/import-posts.ts
// Dry run:
//   DRY_RUN=true npx tsx scripts/import-posts.ts

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "true";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-03-10",
});

// ─────────────────────────────────────────────
// Article data (posts only)
// ─────────────────────────────────────────────
const MOCK_ARTICLES = [
  {
    categoryKey: "market",
    categoryLabel: "Market News",
    title: "Everything you need to know about buying property in Spain",
    excerpt:
      "A comprehensive guide covering legal requirements, taxes, and the step-by-step process for international buyers.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    slug: "buying-property-in-spain",
  },
  {
    categoryKey: "lifestyle",
    categoryLabel: "Lifestyle",
    title: "The best international schools on the Costa del Sol",
    excerpt:
      "Discover top-rated educational institutions for expat families relocating to southern Spain.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    slug: "international-schools",
  },
  {
    categoryKey: "investment",
    categoryLabel: "Investment Guides",
    title: "Maximizing ROI: Short-term vs Long-term rentals",
    excerpt:
      "An analytical deep dive into rental yields across different property types in Marbella and Estepona.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    slug: "maximizing-roi",
  },
  {
    categoryKey: "market",
    categoryLabel: "Market News",
    title: "Real Estate Market Trends Q1 2024",
    excerpt:
      "Analysis of the latest property price movements and demand shifts in the Mediterranean coast.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    slug: "market-trends-q1-2024",
  },
  {
    categoryKey: "lifestyle",
    categoryLabel: "Lifestyle",
    title: "Top 5 Emerging Neighborhoods in Estepona",
    excerpt:
      "Explore the up-and-coming areas offering the perfect blend of authentic charm and modern amenities.",
    image:
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=800&auto=format&fit=crop",
    slug: "emerging-neighborhoods-estepona",
  },
  {
    categoryKey: "buyers",
    categoryLabel: "Buyer's Resources",
    title: "Navigating the Golden Visa process in 2024",
    excerpt:
      "Essential updates and requirements for non-EU investors seeking residency through property acquisition.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    slug: "golden-visa-2024",
  },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Stable deterministic _id for a post, safe to use with createIfNotExists */
const postId = (slug: string) =>
  `post.${slug.replace(/[^a-z0-9-]/gi, "-")}`;

/** Stable deterministic _id for a category */
const categoryId = (key: string) =>
  `category.${key.replace(/[^a-z0-9-]/gi, "-")}`;

/** Minimal random key for PortableText block _key fields */
const blockKey = () => Math.random().toString(36).substring(2, 9);

function toPortableText(text: string) {
  return [
    {
      _type: "block" as const,
      _key: blockKey(),
      style: "normal" as const,
      children: [
        {
          _type: "span" as const,
          _key: blockKey(),
          text,
          marks: [] as string[],
        },
      ],
    },
  ];
}

async function uploadImageFromUrl(
  url: string,
  slug: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | null> {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const asset = await client.assets.upload("image", buffer, {
      filename: `blog-${slug}.jpg`,
    });

    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (error) {
    process.stderr.write(`Failed to upload image for ${slug}: ${String(error)}\n`);
    return null;
  }
}

// ─────────────────────────────────────────────
// Import function
// ─────────────────────────────────────────────

async function importPosts() {
  process.stdout.write(
    DRY_RUN
      ? "🔍 DRY RUN — no data will be written\n"
      : "🚀 Starting blog post import...\n"
  );

  let created = 0;
  let skipped = 0;

  // ── Step 1: Upsert categories ──────────────────────────────────
  const seenCategoryKeys = new Set<string>();
  const categoryIdMap = new Map<string, string>();

  for (const article of MOCK_ARTICLES) {
    if (seenCategoryKeys.has(article.categoryKey)) {
      categoryIdMap.set(article.categoryKey, categoryId(article.categoryKey));
      continue;
    }
    seenCategoryKeys.add(article.categoryKey);

    const catId = categoryId(article.categoryKey);
    categoryIdMap.set(article.categoryKey, catId);

    const categoryDoc = {
      _id: catId,
      _type: "category" as const,
      title: [
        {
          _key: "en",
          _type: "internationalizedArrayStringValue" as const,
          value: article.categoryLabel,
        },
        {
          _key: "es",
          _type: "internationalizedArrayStringValue" as const,
          value: article.categoryLabel,
        },
        {
          _key: "ru",
          _type: "internationalizedArrayStringValue" as const,
          value: article.categoryLabel,
        },
      ],
      slug: { _type: "slug" as const, current: article.categoryKey },
    };

    if (DRY_RUN) {
      process.stdout.write(`[DRY] Would createIfNotExists category: ${catId}\n`);
    } else {
      const result = await client.createIfNotExists(categoryDoc);
      if (result._createdAt === result._updatedAt) {
        process.stdout.write(`✅ Created category: ${catId}\n`);
      } else {
        process.stdout.write(`⏭️ Skipped category (already exists): ${catId}\n`);
      }
    }
  }

  // ── Step 2: Upsert posts ───────────────────────────────────────
  for (const article of MOCK_ARTICLES) {
    const pid = postId(article.slug);
    const catRef = categoryIdMap.get(article.categoryKey);

    if (!catRef) {
      process.stderr.write(`❌ No category ref found for: ${article.categoryKey}\n`);
      continue;
    }

    // Check whether post already exists
    const existingId: string | null = await client.fetch(
      `*[_id == $id][0]._id`,
      { id: pid }
    );

    if (existingId) {
      process.stdout.write(`⏭️ Skipped post (already exists): ${pid}\n`);
      skipped++;
      continue;
    }

    let imageObj: { _type: "image"; asset: { _type: "reference"; _ref: string } } | null = null;

    if (!DRY_RUN) {
      imageObj = await uploadImageFromUrl(article.image, article.slug);
    } else {
      process.stdout.write(`[DRY] Would upload image for: ${article.slug}\n`);
    }

    const contentBlocks = toPortableText(article.excerpt + " Full content goes here...");

    const postDoc = {
      _id: pid,
      _type: "post" as const,
      title: [
        {
          _key: "en",
          _type: "internationalizedArrayStringValue" as const,
          value: article.title,
        },
        {
          _key: "es",
          _type: "internationalizedArrayStringValue" as const,
          value: article.title,
        },
        {
          _key: "ru",
          _type: "internationalizedArrayStringValue" as const,
          value: article.title,
        },
      ],
      slug: { _type: "slug" as const, current: article.slug },
      description: [
        {
          _key: "en",
          _type: "internationalizedArrayTextValue" as const,
          value: article.excerpt,
        },
        {
          _key: "es",
          _type: "internationalizedArrayTextValue" as const,
          value: article.excerpt,
        },
        {
          _key: "ru",
          _type: "internationalizedArrayTextValue" as const,
          value: article.excerpt,
        },
      ],
      content: {
        _type: "localeBlock" as const,
        en: contentBlocks,
        es: contentBlocks,
        ru: contentBlocks,
      },
      categories: [
        {
          _key: blockKey(),
          _type: "reference" as const,
          _ref: catRef,
        },
      ],
      ...(imageObj && { image: imageObj }),
      publishedAt: new Date().toISOString(),
      featured: true,
    };

    if (DRY_RUN) {
      process.stdout.write(`[DRY] Would createIfNotExists post: ${pid}\n`);
      created++;
    } else {
      try {
        await client.createIfNotExists(postDoc);
        process.stdout.write(`✅ Created post: ${pid}\n`);
        created++;
      } catch (error) {
        process.stderr.write(`❌ Failed to create post ${pid}: ${String(error)}\n`);
      }
    }
  }

  process.stdout.write("\n📊 Summary:\n");
  process.stdout.write(`   Created: ${created}\n`);
  process.stdout.write(`   Skipped: ${skipped}\n`);
  process.stdout.write(
    DRY_RUN ? "🔍 DRY RUN complete — no data was written.\n" : "🎉 Blog import complete.\n"
  );
}

importPosts().catch(err => {
  process.stderr.write(`Fatal error: ${String(err)}\n`);
  process.exit(1);
});
