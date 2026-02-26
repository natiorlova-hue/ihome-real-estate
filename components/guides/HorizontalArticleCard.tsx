import { Link } from "@/i18n/routing";
import Image from "next/image";

type HorizontalArticleCardProps = {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  href: string;
};

export default function HorizontalArticleCard({
  title,
  category,
  excerpt,
  image,
  href,
}: HorizontalArticleCardProps) {
  return (
    <Link
      href={href as any}
      className="group flex flex-col sm:flex-row gap-4 md:gap-6 bg-white border border-gray-100 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] w-full sm:w-[140px] md:w-[200px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={image}
          fill
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 200px"
        />
      </div>
      <div className="flex flex-col justify-center py-1 md:py-2">
        <h4 className="text-xs md:text-sm font-semibold text-terracotta-500 mb-1.5">
          {category}
        </h4>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 transition-colors group-hover:text-brandBlue-600 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-tertiary-600 line-clamp-2 md:line-clamp-3">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
