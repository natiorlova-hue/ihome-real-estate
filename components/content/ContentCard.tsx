import BadgeComponent from "@/components/Badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export type CardBadgeVariant = "pink" | "yellow" | "red" | "area";

export interface CardBadge {
  text: string;
  variant: CardBadgeVariant;
}

export interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  image: string;
  imageAlt?: string;
  topBadge?: CardBadge;
  bottomBadge?: CardBadge;
  price?: string;
  isLink?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function ContentCard({
  title,
  subtitle,
  description,
  href,
  image,
  imageAlt,
  topBadge,
  bottomBadge,
  price,
  isLink = false,
  className,
  icon,
}: CardProps) {
  return (
    <Link href={href} className={cn("group relative bg-white", className)}>
      <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
        {image ? (
          <Image
            width={400}
            height={225}
            src={image}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-light-400 to-purple-500">
            <span className="text-2xl font-bold text-white">{title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-1 pt-4">
        {/* Render Icon if present */}
        {icon && <div className="mb-2 text-primary-500">{icon}</div>}

        {topBadge ? (
          <BadgeComponent text={topBadge.text} variant={topBadge.variant} />
        ) : null}

        {subtitle ? (
          <h5 className="font-sans text-sm font-semibold text-terracotta-500">
            {subtitle}
          </h5>
        ) : null}

        <div className="relative w-full">
          <h4 className="flex items-center gap-2 pr-7 font-sans text-lg font-semibold text-gray-900">
            {title}
          </h4>

          {isLink ? (
            <ArrowUpRight className="absolute bottom-0 right-0 size-6 text-gray-400 transition-colors duration-300 group-hover:text-gray-900" />
          ) : null}
        </div>

        {description ? (
          <p className="line-clamp-2 text-sm text-tertiary-600">
            {description}
          </p>
        ) : null}

        {bottomBadge || price ? (
          <div className="mt-5 flex w-full items-center gap-2">
            {bottomBadge ? (
              <BadgeComponent
                text={bottomBadge.text}
                variant={bottomBadge.variant}
              />
            ) : null}

            {price ? (
              <span className="ml-auto font-semibold text-gray-900 text-serifsm">
                {price}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
