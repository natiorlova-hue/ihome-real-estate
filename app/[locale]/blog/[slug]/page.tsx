import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getBlogPost,
  getBlogPosts,
  getLocalizedRichText,
  getLocalizedText,
} from "@/lib/blog";
import { type Locale } from "@/lib/locale-path";
import { urlFor } from "@/sanity/lib/image";

type BlogPostPageProps = {
  params: Promise<{ slug: string; locale: Locale }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const title = getLocalizedText(post.title, locale);
  const description = getLocalizedText(post.description, locale);
  const content = getLocalizedRichText(post.content, locale);

  const featuredImageUrl = post.image
    ? urlFor(post.image).width(1600).height(900).url()
    : null;

  return (
    <article className="bg-white">
      <header className="border-b border-gray-100">
        <div className="container">
          <div className="grid gap-8 py-10 md:grid-cols-2 md:items-stretch md:py-14 lg:gap-12">
            {featuredImageUrl ? (
              <div className="overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={featuredImageUrl}
                  alt={post.image?.alt ?? title}
                  width={1600}
                  height={900}
                  className="h-full w-full object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
              </div>
            ) : (
              <div className="hidden md:block" aria-hidden="true" />
            )}

            <div className="flex flex-col justify-center gap-4 md:py-6">
              <h1 className="font-serif text-3xl text-gray-900 md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="max-w-prose text-base text-tertiary-600 md:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="container">
        <div className="mx-auto max-w-4xl py-10 md:py-14">
          <div className="prose prose-lg max-w-none">
            {content.length ? (
              <PortableText
                value={content}
                components={{
                  types: {
                    image: ({ value }) => {
                      const src = value
                        ? urlFor(value).width(1600).height(900).url()
                        : null;

                      if (!src) return null;

                      return (
                        <figure className="my-8">
                          <div className="overflow-hidden rounded-lg bg-gray-200">
                            <Image
                              src={src}
                              alt={value.alt || title}
                              width={1600}
                              height={900}
                              className="h-auto w-full"
                              sizes="(max-width: 768px) 100vw, 768px"
                              loading="lazy"
                            />
                          </div>
                          {value.caption ? (
                            <figcaption className="mt-3 text-sm text-tertiary-600">
                              {value.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      );
                    },
                  },
                  block: {
                    h1: ({ children }) => (
                      <h2 className="font-serif text-2xl text-gray-900 md:text-3xl">
                        {children}
                      </h2>
                    ),
                    h2: ({ children }) => (
                      <h2 className="font-serif text-2xl text-gray-900 md:text-3xl">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-serif text-xl text-gray-900 md:text-2xl">
                        {children}
                      </h3>
                    ),
                    normal: ({ children }) => (
                      <p className="text-base text-gray-700 md:text-lg">
                        {children}
                      </p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-gray-200 pl-4 font-serif text-lg text-gray-900">
                        {children}
                      </blockquote>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-900">
                        {children}
                      </code>
                    ),
                    link: ({ children, value }) => {
                      const href =
                        typeof value?.href === "string" ? value.href : "#";

                      const isExternal =
                        href.startsWith("http://") ||
                        href.startsWith("https://");

                      return (
                        <a
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="text-mediterranean-700 underline underline-offset-4 transition-colors hover:text-gray-900"
                        >
                          {children}
                        </a>
                      );
                    },
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="my-6 list-disc space-y-2 pl-6">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="my-6 list-decimal space-y-2 pl-6">
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
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map(post => ({
    slug: post.slug.current,
  }));
}
