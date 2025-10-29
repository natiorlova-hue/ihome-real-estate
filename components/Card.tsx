import BadgeComponent from "@/components/Badge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BadgeProps {
  text: string;
  variant: "pink" | "yellow" | "red" | "area";
}

const Card = (props: {
  title: string;
  subtitle?: string;
  description: string;
  link: string;
  image: string;
  topBadge?: BadgeProps;
  bottomBadge?: BadgeProps;
  price?: string;
  isLink?: boolean;
}) => {
  const {
    title,
    subtitle,
    description,
    link,
    image,
    topBadge,
    bottomBadge,
    price,
    isLink = false,
  } = props;

  return (
    <Link href={link} className="group bg-white duration-300 relative">
      <div className="aspect-video bg-gray-200 overflow-hidden rounded-lg">
        {image ? (
          <Image
            width={400}
            height={225}
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{title}</span>
          </div>
        )}
      </div>

      <div className="pt-4 flex items-start flex-col gap-1">
        {topBadge ? (
          <BadgeComponent text={topBadge.text} variant={topBadge.variant} />
        ) : null}
        {subtitle ? (
          <h5 className="font-sans text-sm font-semibold text-terracotta-500">
            {subtitle}
          </h5>
        ) : null}
        <div className="relative w-full">
          <h4 className="font-sans text-lg font-semibold text-primary-900 flex items-center gap-2 pr-7">
            {title}
          </h4>
          {isLink ? (
            <ArrowUpRight className="text-[24px] text-[#A4A7AE] absolute right-0 bottom-0 group-hover:text-black transition-colors duration-300" />
          ) : null}
        </div>
        {description ? (
          <p className="text-sm text-tertiary-600 line-clamp-2">
            {description}
          </p>
        ) : null}
        {(bottomBadge ?? price) ? (
          <div className="flex items-center w-full gap-2 mt-5">
            {bottomBadge ? (
              <BadgeComponent
                text={bottomBadge.text}
                variant={bottomBadge.variant}
              />
            ) : null}
            {price ? (
              <span className="text-serifSm font-semibold ml-auto">
                {price}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default Card;
