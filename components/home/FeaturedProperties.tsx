// components/home/FeaturedProperties.tsx

import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { type Locale } from "@/lib/locale-path";
import { getFeaturedProperties } from "@/lib/properties";
import { formatPrice } from "@/lib/utils"; // Використовуємо універсальний форматувальник
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function FeaturedProperties({
  locale,
}: {
  locale: Locale;
}) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  // 1. Передаємо locale.
  // 2. Фільтруємо лише ті, що мають категорію 'luxury' (або 'featured') та беремо перші 3.
  const allProperties = await getFeaturedProperties(locale);
  const properties = allProperties
    .filter(p => p.isFeatured === true)
    .slice(0, 3);

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
              "[&>*]:opacity-0 [&>*]:translate-y-3 [&>*]:will-change-transform",
              "[[data-reveal=on]_&]:[&>*]:animate-slideUp",
              "[[data-reveal=on]_&]:[&>*]:[animation-fill-mode:both]",
              "motion-reduce:[&>*]:opacity-100 motion-reduce:[&>*]:translate-y-0 motion-reduce:[&>*]:animate-none",

              "[[data-reveal=on]_&]:[&>*:nth-child(1)]:delay-0",
              "[[data-reveal=on]_&]:[&>*:nth-child(2)]:delay-150",
              "[[data-reveal=on]_&]:[&>*:nth-child(3)]:delay-300",

              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+1)]:delay-0",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+2)]:delay-200",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+3)]:delay-400",
            ].join(" ")}
          >
            {properties.map(item => (
              <ContentCard
                key={item.id}
                title={item.title} // Синхронізовано: текст вже перекладений у mapToCard
                description={item.description} // Синхронізовано: перші 2 рядки опису
                href={`/properties/${item.slug}`}
                image={item.image}
                imageAlt={item.title}
                topBadge={item.topBadge} // Синхронізовано з PropertiesGrid
                bottomBadge={item.bottomBadge} // Синхронізовано з PropertiesGrid
                price={
                  item.priceOnRequest
                    ? "Price on Request"
                    : item.price
                      ? formatPrice(item.price)
                      : undefined
                }
                isLink
              />
            ))}
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
