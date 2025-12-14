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
    <section className="py-12 md:py-20" aria-labelledby="benefits-heading">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2
            id="benefits-heading"
            className="max-w-3xl font-serif text-gray-900"
          >
            {t("benefits.title")}
          </h2>

          <ul
            className="mt-10 grid w-full grid-cols-2 gap-8 md:mt-14 md:grid-cols-4 md:gap-10"
            role="list"
          >
            {items.map(key => (
              <li key={key} className="flex flex-col items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <Image
                    src={ICONS[key]}
                    alt=""
                    width={24}
                    height={24}
                    className="text-terracotta-500"
                  />
                </span>

                <h3 className="text-sm font-medium text-gray-900 md:text-base">
                  {t(`benefits.items.${key}.title`)}
                </h3>

                <p className="max-w-[240px] text-xs leading-relaxed text-gray-500 md:text-sm">
                  {t(`benefits.items.${key}.desc`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
