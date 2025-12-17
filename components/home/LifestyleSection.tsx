// components/home/LifestyleSection.tsx

import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import Reveal from "@/components/motion/Reveal";
import { lifestyleItems } from "@/lib/lifestyle";
import { lifestyleToTaxonomyKey } from "@/lib/lifestyle-mapping";
import { type Locale } from "@/lib/locale-path";
import { resolveNavHref } from "@/lib/nav-href";
import { getTranslations } from "next-intl/server";

export default async function LifestyleSection({ locale }: { locale: Locale }) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tTax = await getTranslations({
    locale,
    namespace: "taxonomy",
  });

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col gap-6 items-center text-center mb-12 md:mb-16">
          <Reveal>
            <h2>{tHome("lifestyle.title")}</h2>
          </Reveal>
          <Reveal delay="delay-100">
            <p className="text-tertiary-600 max-w-[640px]">
              {tHome("lifestyle.description")}
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <GridContainer>
          {lifestyleItems.map(item => {
            const taxonomyKey = lifestyleToTaxonomyKey[item.key];

            const title = tTax(`categoryLifestyle.${taxonomyKey}.title`);
            const description = tTax(`categoryLifestyle.${taxonomyKey}.desc`);

            const tagKeys = tTax.raw(
              `lifestyle.cards.${taxonomyKey}.tagKeys`
            ) as string[] | undefined;

            const subtitle = tagKeys?.length
              ? tagKeys.map(k => tTax(`lifestyle.tags.${k}`)).join(" · ")
              : undefined;

            return (
              <ContentCard
                key={item.key}
                title={title}
                subtitle={subtitle}
                description={description}
                href={resolveNavHref(locale, {
                  href: item.path,
                  status: item.status,
                })}
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
