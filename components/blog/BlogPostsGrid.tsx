//components/blog/BlogPostsGrid.tsx

import { getLocalizedText } from "@/lib/blog";
import { withLocale } from "@/lib/locale-path";
import { urlFor } from "@/sanity/lib/image";
import { useTranslations } from "next-intl";
import GridContainer from "../GridContainer";
import Card from "../content/ContentCard";

interface Post {
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
      _ref: string;
    };
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
}

interface BlogPostsGridProps {
  posts: Post[];
  locale: "en" | "es" | "ru";
}

export default function BlogPostsGrid({ posts, locale }: BlogPostsGridProps) {
  const t = useTranslations("guides");

  return (
    <div className="py-8 md:py-16">
      <div className="container">
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:mb-16">
          <h2>{t("grid.title")}</h2>
          <p className="max-w-[640px] text-tertiary-600">
            {t("grid.description")}
          </p>
        </div>

        <GridContainer>
          {posts.map(post => {
            const title = getLocalizedText(post.title, locale);
            const category = post.categories[0]?.title
              ? getLocalizedText(post.categories[0].title, locale)
              : undefined;

            return (
              <Card
                key={post._id}
                title={title}
                subtitle={category}
                href={withLocale(locale, `guides/${post.slug.current}`)}
                image={
                  post.image
                    ? urlFor(post.image).width(400).height(225).url()
                    : ""
                }
                isLink
              />
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
}
