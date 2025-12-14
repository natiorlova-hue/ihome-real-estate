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

  const items: RegionMapItem[] = regionsConfig.map(r => ({
    key: r.key,
    label: tTax(`regions.${r.key}`),
    center: r.center,
  }));

  const headingId = "visual-guide-regions-heading";

  return (
    <Section ariaLabelledby={headingId} className="bg-white">
      <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
        <h2 id={headingId}>{tHome("regionsGuide.title")}</h2>
        <p className="max-w-[720px] text-tertiary-600">
          {tHome("regionsGuide.subtitle")}
        </p>
      </div>

      <RegionsMapClient
        locale={locale}
        items={items}
        a11y={{
          tabsLabel: tHome("regionsGuide.a11y.tabsLabel"),
          mapLabel: tHome("regionsGuide.a11y.mapLabel"),
        }}
      />
    </Section>
  );
}
