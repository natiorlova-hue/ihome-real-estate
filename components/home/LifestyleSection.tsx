// components/home/LifestyleSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
import { lifestyleItems } from "@/lib/lifestyle";
import { lifestyleToTaxonomyKey } from "@/lib/lifestyle-mapping";
import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";

export default async function LifestyleSection({ locale }: { locale: Locale }) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tTax = await getTranslations({ locale, namespace: "taxonomy" });

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:mb-16">
          <Reveal delay="delay-400">
            <h2>{tHome("lifestyle.title")}</h2>
          </Reveal>

          <Reveal delay="delay-600">
            <p className="max-w-[640px] text-tertiary-600">
              {tHome("lifestyle.description")}
            </p>
          </Reveal>
        </div>

        {/* Cards (premium column-wave stagger, starts only when in viewport) */}
        <RevealGroup>
          <GridContainer
            className={[
              // base hidden state
              "[&>*]:opacity-0 [&>*]:translate-y-3 [&>*]:will-change-transform",

              // reveal trigger
              "[[data-reveal=on]_&]:[&>*]:animate-slideUp",

              // a11y
              "motion-reduce:[&>*]:opacity-100 motion-reduce:[&>*]:translate-y-0 motion-reduce:[&>*]:animate-none",

              // MOBILE (1 col): 1..6 stagger
              "[[data-reveal=on]_&]:[&>*:nth-child(1)]:[animation-delay:0ms]",
              "[[data-reveal=on]_&]:[&>*:nth-child(2)]:[animation-delay:120ms]",
              "[[data-reveal=on]_&]:[&>*:nth-child(3)]:[animation-delay:240ms]",
              "[[data-reveal=on]_&]:[&>*:nth-child(4)]:[animation-delay:360ms]",
              "[[data-reveal=on]_&]:[&>*:nth-child(5)]:[animation-delay:480ms]",
              "[[data-reveal=on]_&]:[&>*:nth-child(6)]:[animation-delay:600ms]",

              // MD (2 cols): left -> right wave
              "md:[[data-reveal=on]_&]:[&>*:nth-child(2n+1)]:[animation-delay:0ms]",
              "md:[[data-reveal=on]_&]:[&>*:nth-child(2n+2)]:[animation-delay:220ms]",

              // LG (3 cols): column wave (left -> mid -> right)
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+1)]:[animation-delay:0ms]",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+2)]:[animation-delay:260ms]",
              "lg:[[data-reveal=on]_&]:[&>*:nth-child(3n+3)]:[animation-delay:520ms]",
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
                  href={
                    (item.status === "comingSoon"
                      ? "/coming-soon"
                      : `/${item.path || ""}`) as any
                  }
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
