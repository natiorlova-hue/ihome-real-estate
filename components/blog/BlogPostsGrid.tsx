import { getLocalizedText } from "@/lib/blog";
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
  locale?: string;
}

export default function BlogPostsGrid({
  posts,
  locale = "en",
}: BlogPostsGridProps) {
  const t = useTranslations("blog");

  return (
    <div className="py-8 md:py-16">
      <div className="container">
        <div className="flex flex-col gap-6 items-center text-center mb-12 md:mb-16">
          <h2>{t("grid.title")}</h2>
          <p className="text-tertiary-600 max-w-[640px]">
            {t("grid.description")}
          </p>
        </div>

        <GridContainer>
          {posts.map(post => {
            const title = getLocalizedText(post.title, locale);

            return (
              <Card
                key={post._id}
                title={title}
                subtitle={getLocalizedText(post.categories[0].title, locale)}
                href={`/blog/${post.slug.current}`}
                image={
                  post.image
                    ? urlFor(post.image).width(400).height(225).url()
                    : ""
                }
                isLink={true}
              />
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
}
