// components/home/LifestyleSection.tsx
import ContentCard from "@/components/content/ContentCard";
import GridContainer from "@/components/GridContainer";
import { withLocale, type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import { getLifestyleIcon } from "@/components/content/lifestyle-icons";

type LifestyleSectionProps = {
  locale: Locale;
};

export default async function LifestyleSection({
  locale,
}: LifestyleSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const tax = await getTranslations({ locale, namespace: "taxonomy" });

  return (
    <section className="py-8 md:py-16" aria-labelledby="lifestyle-heading">
      <div className="container">
        <div className="mb-12 flex flex-col items-center gap-6 text-center md:mb-16">
          <h2 id="lifestyle-heading">{t("lifestyle.title")}</h2>
          <p className="max-w-[640px] text-tertiary-600">
            {t("lifestyle.description")}
          </p>
        </div>

        <GridContainer>
          {getLifestyleIcon.map(item => {
            const title = tax(`lifestyle.${item.key}.title`);
            const description = tax(`lifestyle.${item.key}.desc`);

            const tagKeys = tax.raw(`lifestyle.${item.key}.tagKeys`) as
              | string[]
              | undefined;

            const subtitle = tagKeys?.length
              ? tagKeys.map(k => tax(`lifestyle.tags.${k}`)).join(" · ")
              : undefined;

            return (
              <ContentCard
                key={item.key}
                title={title}
                subtitle={subtitle}
                description={description}
                link={withLocale(locale, item.path)}
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
