import { client } from '@/sanity/lib/client'

// Helper function to get localized text
export function getLocalizedText(
  localizedArray: Array<{ _key: string; _type: string; value: string }> | string | undefined,
  locale: string = 'en'
): string {
  // Handle case where it's already a string (old data structure)
  if (typeof localizedArray === 'string') {
    return localizedArray
  }
  
  // Handle case where it's not an array or is empty
  if (!localizedArray || !Array.isArray(localizedArray) || localizedArray.length === 0) {
    return ''
  }
  
  // Try to find the specific locale
  const localizedItem = localizedArray.find(item => item._key === locale)
  if (localizedItem) return localizedItem.value
  
  // Fallback to the first available item
  return localizedArray[0]?.value || ''
}

// Helper function to get localized content
export function getLocalizedContent(
  localizedArray: Array<{ _key: string; _type: string; value: unknown }> | undefined,
  locale: string = 'en'
): unknown {
  if (!localizedArray || !Array.isArray(localizedArray) || localizedArray.length === 0) return []
  
  // Try to find the specific locale
  const localizedItem = localizedArray.find(item => item._key === locale)
  if (localizedItem) return localizedItem.value
  
  // Fallback to the first available item
  return localizedArray[0]?.value || []
}

// Helper function to get localized rich text content from localeBlock
export function getLocalizedRichText(
  localeBlock: { en?: unknown[]; es?: unknown[]; ru?: unknown[] } | undefined,
  locale: string = 'en'
): unknown[] {
  if (!localeBlock || typeof localeBlock !== 'object') return []
  
  // Try to get the specific locale
  const content = localeBlock[locale as keyof typeof localeBlock]
  if (content && Array.isArray(content)) return content
  
  // Fallback to English
  if (localeBlock.en && Array.isArray(localeBlock.en)) return localeBlock.en
  
  // Fallback to any available content
  const availableContent = Object.values(localeBlock).find(Array.isArray)
  return Array.isArray(availableContent) ? availableContent : []
}

export interface BlogPost {
  _id: string
  title: Array<{
    _key: string
    _type: string
    value: string
  }> | string
  description: Array<{
    _key: string
    _type: string
    value: string
  }> | string
  slug: {
    current: string
  }
  publishedAt: string
  featured: boolean
  image?: {
    asset: {
      _ref: string
    }
  }
  categories: Array<{
    _ref: string
    title?: Array<{
      _key: string
      _type: string
      value: string
    }> | string
  }>
  content?: {
    _type: 'localeBlock'
    en?: Array<{
      _type: string
      _key: string
      children?: Array<{
        _type: string
        _key: string
        text?: string
        marks?: string[]
      }>
      asset?: {
        _ref: string
      }
      alt?: string
      caption?: string
    }>
    es?: Array<{
      _type: string
      _key: string
      children?: Array<{
        _type: string
        _key: string
        text?: string
        marks?: string[]
      }>
      asset?: {
        _ref: string
      }
      alt?: string
      caption?: string
    }>
    ru?: Array<{
      _type: string
      _key: string
      children?: Array<{
        _type: string
        _key: string
        text?: string
        marks?: string[]
      }>
      asset?: {
        _ref: string
      }
      alt?: string
      caption?: string
    }>
  }
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
      image,
      categories[]-> {
        _ref,
        title
      }
    }
  `
  
  return await client.fetch(query)
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
      image,
      content[] {
        ...,
        _type == "image" => {
          ...,
          asset->
        }
      },
      categories[]-> {
        _ref,
        title
      }
    }
  `
  
  return await client.fetch(query, { slug })
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
      image,
      categories[]-> {
        _ref,
        title
      }
    }
  `
  
  return await client.fetch(query)
}
