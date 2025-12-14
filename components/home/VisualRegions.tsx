import RegionsMapClient, {
  type RegionMapItem,
} from "@/components/home/RegionsMapClient";
import Section from "@/components/layout/Section";
import { type Locale } from "@/lib/locale-path";
import { regionsConfig } from "@/lib/regions";
import { getTranslations } from "next-intl/server";

type Props = {
  locale: Locale;
};

export default async function VisualGuideRegionsSection({ locale }: Props) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tTax = await getTranslations({ locale, namespace: "taxonomy" });

  const items: RegionMapItem[] = regionsConfig.map(region => ({
    key: region.key,
    label: tTax(`regions.${region.key}.title`),
    center: region.center,
  }));

  return (
    <Section ariaLabelledby="visual-guide-regions-heading" className="bg-white">
      <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
        <h2 id="visual-guide-regions-heading">{tHome("regionsGuide.title")}</h2>
        <p className="max-w-[720px] text-tertiary-600">
          {tHome("regionsGuide.subtitle")}
        </p>
      </div>

      <RegionsMapClient
        items={items}
        a11y={{
          tabsLabel: tHome("regionsGuide.a11y.tabsLabel"),
          mapLabel: tHome("regionsGuide.a11y.mapLabel"),
        }}
      />
    </Section>
  );
}
