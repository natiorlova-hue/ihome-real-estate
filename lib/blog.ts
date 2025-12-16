import { client } from "@/sanity/lib/client";

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
  content?: unknown;
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

  return client.fetch(query, { limit });
}

// (існуючі функції — лишаємо)
export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
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

  return await client.fetch(query);
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
      image {
        asset-> {
          _id,
          _ref,
          url
        },
        alt,
        caption
      },
      content,
      categories[]-> {
        _ref,
        title
      }
    }
  `;

  return await client.fetch(query, { slug });
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

  return await client.fetch(query);
}
