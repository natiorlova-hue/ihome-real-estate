// components/home/LifestyleSection.tsx

import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import { lifestyleItems } from "@/lib/lifestyle";
import { lifestyleToTaxonomyKey } from "@/lib/lifestyle-mapping";
import { type Locale } from "@/lib/locale-path";
import { resolveNavHref } from "@/lib/nav-href";
import { getTranslations } from "next-intl/server";

export default async function LifestyleSection({ locale }: { locale: Locale }) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tTax = await getTranslations({ locale, namespace: "taxonomy" });

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:mb-16">
          <Reveal>
            <h2>{tHome("lifestyle.title")}</h2>
          </Reveal>

          <Reveal delay="delay-200">
            <p className="max-w-[640px] text-tertiary-600">
              {tHome("lifestyle.description")}
            </p>
          </Reveal>
        </div>

        {/* Cards (premium column-wave stagger, starts only when in viewport) */}
        <RevealGroup>
          <GridContainer
            className={[
              // base state for children
              "[&>*]:opacity-0 [&>*]:translate-y-3 [&>*]:will-change-transform",

              // reveal trigger from ancestor (RevealGroup)
              "[[data-reveal=on]_&]:[&>*]:animate-slideUp",
              "motion-reduce:[&>*]:opacity-100 motion-reduce:[&>*]:translate-y-0 motion-reduce:[&>*]:animate-none",

              // MOBILE stagger 1..6
              "[[data-reveal=on]_&]:[&>*:nth-child(1)]:delay-0",
              "[[data-reveal=on]_&]:[&>*:nth-child(2)]:delay-100",
              "[[data-reveal=on]_&]:[&>*:nth-child(3)]:delay-200",
              "[[data-reveal=on]_&]:[&>*:nth-child(4)]:delay-300",
              "[[data-reveal=on]_&]:[&>*:nth-child(5)]:delay-400",
              "[[data-reveal=on]_&]:[&>*:nth-child(6)]:delay-500",

              // MD 2 cols wave
              "md:[[data-reveal=on]_&]:[&>*:nth-child(2n+1)]:delay-0",
              "md:[[data-reveal=on]_&]:[&>*:nth-child(2n+2)]:delay-200",

              // LG 3 cols wave
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+1)]:delay-0",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+2)]:delay-400",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+3)]:delay-800",
            ].join(" ")}
          >
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
        </RevealGroup>
      </div>
    </section>
  );
}
