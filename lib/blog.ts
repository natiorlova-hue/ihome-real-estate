import { client } from '@/sanity/lib/client'

export interface BlogPost {
  _id: string
  title: string
  description: string
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
    title?: string
  }>
  content?: any[]
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
      content,
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
