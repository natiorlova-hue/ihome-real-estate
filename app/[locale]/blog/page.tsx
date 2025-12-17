//app/[locale]/blog/page.tsx

import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import { getBlogPosts } from "@/lib/blog";
import { type Locale } from "@/lib/locale-path";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/guides`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}/guides`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const posts = await getBlogPosts();

  return (
    <section className="bg-white">
      <BlogPostsGrid posts={posts} locale={locale} />
    </section>
  );
}
