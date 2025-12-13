// components/home/Categories.tsx
import { categories as categoriesData } from "@/lib/categories";
import { getTranslations } from "next-intl/server";
import Card from "../Card";
import GridContainer from "../GridContainer";

export default async function Categories({ locale }: { locale: string }) {
  const tax = await getTranslations({ locale, namespace: "taxonomy" });

  return (
    <div className="py-8 md:py-16">
      <div className="container">
        <div className="flex flex-col gap-6 items-center text-center mb-12 md:mb-16">
          <h2>Live your way on the Costa del Sol.</h2>
          <p className="text-tertiary-600 max-w-[640px]">
            Every lifestyle has its perfect place. Choose yours — and we’ll show
            you the neighborhoods, stories, and homes that fit.
          </p>
        </div>

        <GridContainer>
          {categoriesData.map(item => {
            // title/desc з taxonomy.categoryLifestyle
            const title = tax(`categoryLifestyle.${item.key}.title`);
            const description = tax(`categoryLifestyle.${item.key}.desc`);

            // subtitle з taxonomy.lifestyle.tags + taxonomy.lifestyle.cards[KEY].tagKeys
            const tagKeys = tax.raw(`lifestyle.cards.${item.key}.tagKeys`) as
              | string[]
              | undefined;

            const subtitle = tagKeys?.length
              ? tagKeys.map(k => tax(`lifestyle.tags.${k}`)).join(" · ")
              : undefined;

            return (
              <Card
                key={item.key}
                title={title}
                subtitle={subtitle}
                description={description}
                link={`/${locale}/${item.path}`}
                image={item.image}
                imageAlt={title}
              />
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
}
