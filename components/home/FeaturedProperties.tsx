// components/home/FeaturedProperties.tsx
import GridContainer from "@/components/GridContainer";
import ContentCard, { type CardBadge } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/lib/locale-path";
import {
  getFeaturedProperties,
  type PropertyBadgeData,
} from "@/lib/properties";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function FeaturedProperties({
  locale,
}: {
  locale: Locale;
}) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tProps = await getTranslations({ locale, namespace: "properties" });

  const properties = await getFeaturedProperties();

  const formatPrice = (price?: number) => {
    if (typeof price !== "number") return undefined;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toCardBadge = (badge?: PropertyBadgeData): CardBadge | undefined => {
    if (!badge) return undefined;

    switch (badge.type) {
      case "roi":
        return {
          variant: badge.variant,
          text: tProps("badges.roi", { value: badge.value }),
        };
      case "new":
        return { variant: badge.variant, text: tProps("badges.new") };
      case "featured":
        return { variant: badge.variant, text: tProps("badges.featured") };
      case "area":
        return {
          variant: badge.variant,
          text: `${badge.value} ${tProps("units.sqm")}`,
        };
      default:
        return undefined;
    }
  };

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:mb-16">
          <h2>{tHome("featuredHomes.title")}</h2>
          <p className="max-w-[640px] text-tertiary-600">
            {tHome("featuredHomes.description")}
          </p>
        </div>

        <GridContainer>
          {properties.map(item => {
            const title = tProps(`featured.items.${item.id}.title`);
            const description = tProps(`featured.items.${item.id}.description`);

            return (
              <ContentCard
                key={item.id}
                title={title}
                description={description}
                href={withLocale(locale, `properties/${item.slug}`)}
                image={item.image}
                imageAlt={title}
                topBadge={toCardBadge(item.topBadge)}
                bottomBadge={toCardBadge(item.bottomBadge)}
                price={formatPrice(item.price)}
                isLink
              />
            );
          })}
        </GridContainer>

        <div className="mt-4 flex md:mt-8">
          <Button asChild variant="link" className="group ml-auto px-0 py-0">
            <Link href={withLocale(locale, "properties")}>
              {tCommon("viewAll")}
              <ArrowRight className="ml-2 text-[#A4A7AE] transition-colors duration-300 group-hover:text-black" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
