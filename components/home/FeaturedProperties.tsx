import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/lib/locale-path";
import { getFeaturedProperties } from "@/lib/properties";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function FeaturedProperties({
  locale,
}: {
  locale: Locale;
}) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const items = await getFeaturedProperties();

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:mb-16">
          <h2>{tHome("featured.title")}</h2>
          <p className="max-w-[640px] text-tertiary-600">
            {tHome("featured.description")}
          </p>
        </div>

        <GridContainer>
          {items.map(item => (
            <ContentCard
              key={item.id}
              title={item.title}
              description={item.description}
              href={withLocale(locale, `properties/${item.slug}`)}
              image={item.image}
              imageAlt={item.title}
              topBadge={item.topBadge}
              bottomBadge={item.bottomBadge}
              price={item.price}
              isLink
            />
          ))}
        </GridContainer>

        <div className="mt-4 flex md:mt-8">
          <Button variant="link" className="group ml-auto px-0 py-0">
            {tHome("featured.viewAll")}
            <ArrowRight className="text-[#A4A7AE] transition-colors duration-300 group-hover:text-black" />
          </Button>
        </div>
      </div>
    </section>
  );
}
