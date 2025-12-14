import Section from "@/components/layout/Section";
import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type BenefitsSectionProps = {
  locale: Locale;
};

type BenefitKey = "climate" | "safety" | "schools" | "culture";

const ICONS: Record<BenefitKey, string> = {
  climate: "/icons/benefits/climate.svg",
  safety: "/icons/benefits/safety.svg",
  schools: "/icons/benefits/schools.svg",
  culture: "/icons/benefits/culture.svg",
};

export default async function BenefitsSection({
  locale,
}: BenefitsSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  const items: BenefitKey[] = ["climate", "safety", "schools", "culture"];

  return (
    <Section ariaLabelledby="benefits-heading">
      <div className="mx-auto max-w-benefits text-center">
        <h2 id="benefits-heading" className="font-serif text-seriflg">
          {t.rich("benefits.titleRich", {
            primary: chunks => <span className="text-gray-950">{chunks}</span>,
            muted: chunks => <span className="text-gray-500">{chunks}</span>,
            br: () => <br />,
          })}
        </h2>

        <ul
          className="mt-16 grid grid-cols-1 gap-y-16 md:mt-12 md:grid-cols-2 md:gap-x-14 md:gap-y-12 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-0"
          role="list"
        >
          {items.map(key => (
            <li key={key} className="flex flex-col items-center">
              <span aria-hidden="true" className="mb-3 inline-flex">
                <Image
                  src={ICONS[key]}
                  alt=""
                  width={48}
                  height={48}
                  sizes="48px"
                  className="h-12 w-12"
                />
              </span>

              <h3 className="benefits-card-title text-center font-medium text-gray-950 [min-inline-size:max-content]">
                {t(`benefits.items.${key}.title`)}
              </h3>

              <p className="mt-2 max-w-[260px] text-center benefits-card-desc text-gray-600">
                {t(`benefits.items.${key}.desc`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
