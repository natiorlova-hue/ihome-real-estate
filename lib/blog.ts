//lib/blog.ts

import type { Locale } from "@/lib/locale-path";
import { serverClient } from "@/sanity/lib/client";
import type { PortableTextBlock } from "@portabletext/types";

// Helper function to get localized text
export function getLocalizedText(
  localizedArray:
    | Array<{ _key: string; _type: string; value: string }>
    | string
    | undefined,
  locale: string = "en"
): string {
  if (typeof localizedArray === "string") return localizedArray;

  if (
    !localizedArray ||
    !Array.isArray(localizedArray) ||
    localizedArray.length === 0
  ) {
    return "";
  }

  const localizedItem = localizedArray.find(item => item._key === locale);
  if (localizedItem) return localizedItem.value;

  return localizedArray[0]?.value || "";
}

export type LocaleBlock = Partial<Record<Locale, PortableTextBlock[]>>;

// Helper function to get localized rich text content from localeBlock
export function getLocalizedRichText(
  localeBlock: LocaleBlock | undefined,
  locale: Locale = "en"
): PortableTextBlock[] {
  if (!localeBlock) return [];

  const localized = localeBlock[locale];
  if (Array.isArray(localized)) return localized;

  const fallbackEn = localeBlock.en;
  if (Array.isArray(fallbackEn)) return fallbackEn;

  const anyAvailable = Object.values(localeBlock).find(Array.isArray);
  return Array.isArray(anyAvailable) ? anyAvailable : [];
}

export interface BlogPost {
  _id: string;
  title:
    | Array<{
        _key: string;
        _type: string;
        value: string;
      }>
    | string;
  description:
    | Array<{
        _key: string;
        _type: string;
        value: string;
      }>
    | string;
  slug: {
    current: string;
  };
  publishedAt: string;
  featured: boolean;
  image?: {
    asset: {
      _id?: string;
      _ref: string;
      url?: string;
    };
    alt?: string;
    caption?: string;
  };
  categories: Array<{
    _ref: string;
    title?:
      | Array<{
          _key: string;
          _type: string;
          value: string;
        }>
      | string;
  }>;
  content?: LocaleBlock;

  seo?: {
    metaTitle?: Array<{ _key: string; _type: string; value: string }> | string;
    metaDescription?:
      | Array<{ _key: string; _type: string; value: string }>
      | string;
    ogImage?: unknown;
    canonical?: string;
  };
}

export async function getRecentPosts(limit: number = 6): Promise<BlogPost[]> {
  const query = `
    *[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      description,
      slug,
      publishedAt,
      featured,
      image {
        asset-> { _ref, url },
        alt,
        caption
      },
      categories[]-> { _ref, title }
    }
  `;

  return serverClient.fetch(query, { limit });
}

export async function getLatestPostsByCategory(
  limit: number = 6
): Promise<BlogPost[]> {
  const query = `
    *[_type == "category"] | order(title[0].value asc)[0...$limit] {
      _id,
      "latestPost": *[
        _type == "post" &&
        references(^._id) &&
        defined(slug.current)
      ] | order(publishedAt desc)[0] {
        _id,
        title,
        description,
        slug,
        publishedAt,
        featured,
        image { asset-> { _id, _ref, url }, alt, caption },
        categories[]-> { _ref, title },
        content,
        seo
      }
    }.latestPost
  `;

  const posts = await serverClient.fetch<(BlogPost | null)[]>(query, { limit });

  return posts.filter((post): post is BlogPost => Boolean(post?._id));
}

export async function getRelatedPosts(
  currentSlug: string,
  categoryId?: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const categoryFilter = categoryId
    ? `&& $categoryId in categories[]._ref`
    : ``;

  const query = `
    *[_type == "post" && slug.current != $currentSlug ${categoryFilter}] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      description,
      slug,
      publishedAt,
      featured,
      image { asset-> { _id, _ref, url }, alt, caption },
      categories[]-> { _ref, title }
    }
  `;

  return await serverClient.fetch(query, { currentSlug, categoryId, limit });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    description,
    slug,
    publishedAt,
    featured,
    image { asset-> { _id, _ref, url }, alt, caption },
    categories[]-> { _ref, title },
    content,
    seo
  }
`;
  return await serverClient.fetch(query);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    description,
    slug,
    publishedAt,
    featured,
    image { asset-> { _id, _ref, url }, alt, caption },
    content,
    categories[]-> { _ref, title },
    seo
  }
`;

  return await serverClient.fetch(query, { slug });
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      description,
      slug,
      publishedAt,
      featured,
      image {
        asset-> {
          _id,
          _ref,
          url
        },
        alt,
        caption
      },
      categories[]-> {
        _ref,
        title
      },
      content
    }
  `;

  return await serverClient.fetch(query);
}
