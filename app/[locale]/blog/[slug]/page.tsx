import {
  getBlogPost,
  getBlogPosts,
  getLocalizedRichText,
  getLocalizedText,
} from "@/lib/blog";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get localized content
  const title = getLocalizedText(post.title, locale);
  const description = getLocalizedText(post.description, locale);
  const content = getLocalizedRichText(post.content, locale);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row">
        {/* Featured Image */}
        {post.image && (
          <div className="w-1/2">
            {(() => {
              try {
                const imageUrl = urlFor(post.image)
                  .width(800)
                  .height(400)
                  .url();
                return (
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={800}
                    height={400}
                    className="w-full object-cover"
                    style={{ height: "calc(100vh - 80px)" }}
                  />
                );
              } catch (error) {
                console.error(
                  "Error generating image URL:",
                  error,
                  "Image data:",
                  post.image
                );
                return (
                  <div
                    className="w-full bg-gray-200 rounded-lg shadow-lg flex items-center justify-center"
                    style={{ height: "calc(100vh - 80px)" }}
                  >
                    <p className="text-gray-500">Image not available</p>
                  </div>
                );
              }
            })()}
          </div>
        )}
        <div className="w-1/2 py-16 px-16 flex flex-col gap-4">
          <h1 className="h2">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-lg max-w-none">
          {content && content.length > 0 && (
            <PortableText
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={content as any}
              components={{
                types: {
                  image: ({ value }) => {
                    try {
                      const imageUrl = urlFor(value)
                        .width(800)
                        .height(400)
                        ?.url();
                      return (
                        <div className="my-8">
                          <Image
                            src={imageUrl}
                            alt={value.alt || title}
                            width={800}
                            height={400}
                            className="rounded-lg shadow-lg w-full h-auto mb-4"
                          />
                          {value.caption && <p>{value.caption}</p>}
                        </div>
                      );
                    } catch (error) {
                      console.error(
                        "Error generating image URL in content:",
                        error,
                        "Image data:",
                        value
                      );
                      return (
                        <div className="my-8 w-full h-48 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                          <p className="text-gray-500">Image not available</p>
                        </div>
                      );
                    }
                  },
                },
                block: {
                  h1: ({ children }) => <h1 className="h2">{children}</h1>,
                  h2: ({ children }) => <h2>{children}</h2>,
                  h3: ({ children }) => <h3>{children}</h3>,
                  normal: ({ children }) => <p className="mb-4">{children}</p>,
                  blockquote: ({ children }) => (
                    <blockquote className="font-semibold text-serifsm font-italic">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
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
      </div>{" "}
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map(post => ({
    slug: post.slug.current,
  }));
}
