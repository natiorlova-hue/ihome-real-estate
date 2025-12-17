// components/home/FeaturedProperties.tsx

//test
import GridContainer from "@/components/GridContainer";
import ContentCard, { type CardBadge } from "@/components/content/ContentCard";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { withLocale, type Locale } from "@/lib/locale-path";
import {
  getFeaturedProperties,
  type PropertyBadgeData,
} from "@/lib/properties";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

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
          <Reveal delay="delay-400">
            <h2>{tHome("featuredHomes.title")}</h2>
          </Reveal>
          <Reveal delay="delay-600">
            <p className="max-w-[640px] text-tertiary-600">
              {tHome("featuredHomes.description")}
            </p>
          </Reveal>
        </div>
        <RevealGroup>
          <GridContainer
            className={[
              // base hidden for direct children
              "[&>*]:opacity-0 [&>*]:translate-y-3 [&>*]:will-change-transform",
              // show only after group triggers
              "[[data-reveal=on]_&]:[&>*]:animate-slideUp",
              "[[data-reveal=on]_&]:[&>*]:[animation-fill-mode:both]",
              "motion-reduce:[&>*]:opacity-100 motion-reduce:[&>*]:translate-y-0 motion-reduce:[&>*]:animate-none",

              // stagger 1..6 (під твою кількість карток; якщо 3 — лиши 1..3)
              "[[data-reveal=on]_&]:[&>*:nth-child(1)]:delay-0",
              "[[data-reveal=on]_&]:[&>*:nth-child(2)]:delay-150",
              "[[data-reveal=on]_&]:[&>*:nth-child(3)]:delay-300",
              "[[data-reveal=on]_&]:[&>*:nth-child(4)]:delay-450",
              "[[data-reveal=on]_&]:[&>*:nth-child(5)]:delay-600",
              "[[data-reveal=on]_&]:[&>*:nth-child(6)]:delay-750",

              // desktop wave by columns (3 cols)
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+1)]:delay-0",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+2)]:delay-200",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+3)]:delay-400",
            ].join(" ")}
          >
            {properties.map(item => {
              const title = tProps(`featured.items.${item.id}.title`);
              const description = tProps(
                `featured.items.${item.id}.description`
              );

              return (
                <ContentCard
                  key={item.id}
                  title={title}
                  description={description}
                  href={withLocale(locale, `coming-soon`)}
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
        </RevealGroup>
        <div className="mt-4 flex md:mt-8">
          <Button asChild variant="link" className="group ml-auto px-0 py-0">
            <Link href="/properties">
              {tCommon("viewAll")}
              <ArrowRight className="ml-2 text-[#A4A7AE] transition-colors duration-300 group-hover:text-black" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
