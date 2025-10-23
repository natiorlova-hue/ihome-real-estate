import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getBlogPosts, getLocalizedText, getLocalizedRichText } from '@/lib/blog'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Get localized content
  const title = getLocalizedText(post.title, locale)
  const description = getLocalizedText(post.description, locale)
  const content = getLocalizedRichText(post.content, locale)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href={`/${locale}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Home
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {post.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {getLocalizedText(category.title, locale) || 'Category'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Image
            src={urlFor(post.image).width(800).height(400).url()}
            alt={title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-lg max-w-none">
          {content && content.length > 0 && (
            <PortableText
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={content as any}
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="my-8">
                      <Image
                        src={urlFor(value).width(800).height(400).url()}
                        alt={value.alt || title}
                        width={800}
                        height={400}
                        className="rounded-lg shadow-lg w-full h-auto"
                      />
                      {value.caption && (
                        <p className="text-sm text-gray-600 mt-2 text-center italic">
                          {value.caption}
                        </p>
                      )}
                    </div>
                  ),
                },
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {children}
                    </a>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="text-gray-700">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="text-gray-700">{children}</li>
                  ),
                },
              }}
            />
          )}
        </div>
      </div>

      {/* Related Posts CTA */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Read More?
          </h2>
          <p className="text-gray-600 mb-6">
            Discover more insights about life in Spain and real estate tips.
          </p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}
