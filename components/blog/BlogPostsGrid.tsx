import { getLocalizedText } from "@/lib/blog";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="py-8 md:py-16">
      <div className="container">
        <div className="flex flex-col gap-6 items-center text-center mb-12 md:mb-16">
          <h2>Live your way on the Costa del Sol.</h2>
          <p className="text-tertiary-600 max-w-[640px]">
            Very lifestyle has its perfect place. Choose yours — and we’ll show
            you the neighborhoods, stories, and homes that fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {posts.map(post => {
            const title = getLocalizedText(post.title, locale);

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group bg-white duration-300 relative"
              >
                <div className="aspect-video bg-gray-200 overflow-hidden rounded-lg">
                  {post.image ? (
                    <Image
                      width={400}
                      height={225}
                      src={urlFor(post.image).width(400).height(225).url()}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col gap-1">
                  {post.categories.slice(0, 2).map((category, index) => (
                    <h5
                      key={index}
                      className="font-sans text-sm font-semibold text-terracotta-500"
                    >
                      {getLocalizedText(category.title, locale) || "Category"}
                    </h5>
                  ))}
                  <h4 className="font-sans text-lg font-semibold text-primary-900 flex items-center gap-2 pr-7">
                    {title}
                  </h4>
                  <ArrowUpRight className="text-[24px] text-[#A4A7AE] absolute right-0 bottom-0 group-hover:text-black transition-colors duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
