// components/home/LifestyleSection.tsx

import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import { lifestyleItems } from "@/lib/lifestyle";
import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";

export default async function LifestyleSection({ locale }: { locale: Locale }) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tTax = await getTranslations({ locale, namespace: "taxonomy" });

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col gap-6 items-center text-center mb-12 md:mb-16">
          <h2>{tHome("lifestyle.title")}</h2>
          <p className="text-tertiary-600 max-w-[640px]">
            {tHome("lifestyle.description")}
          </p>
        </div>

        {/* Cards */}
        <GridContainer>
          {lifestyleItems.map(item => {
            const title = tTax(`categoryLifestyle.${item.key}.title`);
            const description = tTax(`categoryLifestyle.${item.key}.desc`);

            const tagKeys = tTax.raw(`lifestyle.cards.${item.key}.tagKeys`) as
              | string[]
              | undefined;

            const subtitle = tagKeys?.length
              ? tagKeys.map(k => tTax(`lifestyle.tags.${k}`)).join(" · ")
              : undefined;

            return (
              <ContentCard
                key={item.key}
                title={title}
                subtitle={subtitle}
                description={description}
                href={`/${locale}/${item.path}`}
                image={item.image}
                imageAlt={title}
              />
            );
          })}
        </GridContainer>
      </div>
    </section>
  );
}
