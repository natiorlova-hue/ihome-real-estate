// app/[locale]/blog/[slug]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PortableText,
  type PortableTextReactComponents,
} from "@portabletext/react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

import Cta from "@/components/Cta/Cta";
import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import {
  getBlogPost,
  getBlogPosts,
  getLocalizedRichText,
  getLocalizedText,
  getRelatedPosts,
} from "@/lib/blog";
import { withLocale, type Locale } from "@/lib/locale-path";
import { urlFor } from "@/sanity/lib/image";

type BlogPostPageProps = {
  params: Promise<{ slug: string; locale: Locale }>;
};

function getOriginFromHeaders(h: Headers) {
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return null;
  return `${proto}://${host}`;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const post = await getBlogPost(slug);
  if (!post) return {};

  const origin = getOriginFromHeaders(await headers());
  const url = origin ? new URL(`/${locale}/blog/${slug}`, origin) : undefined;

  const title = getLocalizedText(post.title, locale);
  const description = getLocalizedText(post.description, locale);

  const metaTitle = getLocalizedText(post.seo?.metaTitle, locale) || title;
  const metaDescription =
    getLocalizedText(post.seo?.metaDescription, locale) || description;

  const canonical =
    typeof post.seo?.canonical === "string" && post.seo.canonical.length
      ? post.seo.canonical
      : url?.toString();

  const ogImageSource = (post.seo?.ogImage as unknown) ?? post.image;
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).url()
    : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "article",
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const title = getLocalizedText(post.title, locale);
  const description = getLocalizedText(post.description, locale);
  const content = getLocalizedRichText(post.content, locale);

  const featuredImageUrl = post.image
    ? urlFor(post.image).width(1200).height(900).url()
    : null;

  const firstCategoryId = post.categories?.[0]?._ref;
  const relatedPosts = await getRelatedPosts(slug, firstCategoryId, 3);

  // 1. Програмно відокремлюємо callout від основного тексту
  const mainContent = content.filter(
    block => (block as any)._type !== "callout"
  );
  const calloutBlocks = content.filter(
    block => (block as any)._type === "callout"
  );

  // 2. Виносимо компоненти в окрему константу, щоб перевикористати
  const ptComponents: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: any) => {
        const src = value ? urlFor(value).width(1200).height(675).url() : null;
        if (!src) return null;
        return (
          <figure className="my-12">
            <div className="overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={src}
                alt={value.alt || title}
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                loading="lazy"
              />
            </div>
            {value.caption ? (
              <figcaption className="mt-4 text-center text-sm text-tertiary-600">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      callout: ({ value }: any) => (
        <div className="my-12 rounded-2xl bg-gray-50 p-8 md:p-10">
          {value.title ? (
            <h4 className="mb-4 font-sans text-xl font-semibold text-gray-900">
              {value.title}
            </h4>
          ) : null}
          <div className="text-gray-700">{value.text}</div>
        </div>
      ),
    },
    block: {
      h1: ({ children }: any) => (
        <h2 className="mt-12 mb-6 font-serif text-3xl text-gray-900 md:text-4xl">
          {children}
        </h2>
      ),
      h2: ({ children }: any) => (
        <h2 className="mt-12 mb-6 font-serif text-3xl text-gray-900 md:text-4xl">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="mt-8 mb-4 font-serif text-2xl text-gray-900 md:text-3xl">
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote
          className="my-16
        font-serif text-2xl font-medium italic leading-relaxed text-gray-900 md:text-3xl"
        >
          &ldquo;{children}&rdquo;
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-900">
          {children}
        </code>
      ),
      link: ({ children, value }: any) => {
        const href = typeof value?.href === "string" ? value.href : "#";
        const isExternal =
          href.startsWith("http://") || href.startsWith("https://");
        return (
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-terracotta-500 underline underline-offset-4 transition-colors hover:text-terracotta-600"
          >
            {children}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="my-8 list-disc space-y-2 pl-6">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="my-8 list-decimal space-y-2 pl-6">{children}</ol>
      ),
    },
  };

  return (
    <article className="bg-white">
      {/* Шапка статті: Split Layout (Image Left / Text Right) */}
      <header className="w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:min-h-[600px] lg:min-h-[700px]">
          {/* Ліва частина: Зображення від краю до центру */}
          {featuredImageUrl ? (
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:w-1/2">
              <Image
                src={featuredImageUrl}
                alt={post.image?.alt ?? title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="hidden md:block md:w-1/2 bg-gray-50" />
          )}

          {/* Права частина: Текст з великим відступом */}
          <div className="flex flex-col justify-center py-12 px-6 md:w-1/2 md:pl-16 lg:pl-24">
            <div className="max-w-[560px]">
              <h1 className="font-serif text-4xl leading-tight text-gray-900 md:text-5xl lg:text-serifxl mb-6">
                {title}
              </h1>
              <p className="text-lg text-tertiary-600 md:text-xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Контент статті */}
      <section className="container">
        <div className="mx-auto max-w-[800px] py-10 md:py-20">
          <div className="text-base text-gray-700 leading-relaxed md:text-lg">
            {mainContent.length > 0 && (
              <PortableText value={mainContent} components={ptComponents} />
            )}

            {calloutBlocks.length > 0 && (
              <div className="mt-16">
                <PortableText value={calloutBlocks} components={ptComponents} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-100 py-16 md:py-24">
          <div className="container">
            <h2 className="mb-10 font-serif text-3xl text-gray-900 md:text-4xl">
              Related Articles
            </h2>
            <GridContainer>
              {relatedPosts.map(relatedPost => {
                const rTitle = getLocalizedText(relatedPost.title, locale);
                const rCategory = relatedPost.categories?.[0]?.title
                  ? getLocalizedText(relatedPost.categories[0].title, locale)
                  : undefined;

                return (
                  <ContentCard
                    key={relatedPost._id}
                    title={rTitle}
                    subtitle={rCategory}
                    href={withLocale(
                      locale,
                      `blog/${relatedPost.slug.current}`
                    )}
                    image={
                      relatedPost.image
                        ? urlFor(relatedPost.image).width(400).height(225).url()
                        : ""
                    }
                    isLink
                  />
                );
              })}
            </GridContainer>
          </div>
        </section>
      )}

      {/* CTA */}
      <Cta
        locale={locale}
        namespace="common"
        layout="simple"
        variant="default"
        keys={{
          title: "ctaRow.title",
          button: "ctaRow.contactBtn",
        }}
        className="border-t border-gray-100 py-12 md:py-20"
      />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug.current }));
}
