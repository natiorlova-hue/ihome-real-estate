import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import RevealGroup from "@/components/motion/RevealGroup";
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
        <Reveal delay="delay-400">
          <h2 id="benefits-heading" className="font-serif text-seriflg">
            {t.rich("benefits.titleRich", {
              primary: chunks => (
                <span className="text-gray-950">{chunks}</span>
              ),
              muted: chunks => <span className="text-gray-500">{chunks}</span>,
              br: () => <br />,
            })}
          </h2>
        </Reveal>

        <RevealGroup threshold={0.2}>
          <ul
            className={[
              "mt-16 grid grid-cols-1 gap-y-16 md:mt-12 md:grid-cols-2 md:gap-x-14 md:gap-y-12 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-0",
              // base hidden for direct children
              "[&>*]:opacity-0 [&>*]:translate-y-3 [&>*]:will-change-transform",
              // reveal
              "[[data-reveal=on]_&]:[&>*]:animate-slideUp",
              "[[data-reveal=on]_&]:[&>*]:[animation-fill-mode:both]",
              "motion-reduce:[&>*]:opacity-100 motion-reduce:[&>*]:translate-y-0 motion-reduce:[&>*]:animate-none",

              // MOBILE (1 col): 1..4
              "[[data-reveal=on]_&]:[&>*:nth-child(1)]:delay-0",
              "[[data-reveal=on]_&]:[&>*:nth-child(2)]:delay-150",
              "[[data-reveal=on]_&]:[&>*:nth-child(3)]:delay-300",
              "[[data-reveal=on]_&]:[&>*:nth-child(4)]:delay-450",

              // MD (2 cols): left -> right
              "md:[[data-reveal=on]_&]:[&>*:nth-child(odd)]:delay-0",
              "md:[[data-reveal=on]_&]:[&>*:nth-child(even)]:delay-200",

              // XL (4 cols): 1 -> 2 -> 3 -> 4
              "xl:[[data-reveal=on]_&]:[&>*:nth-child(1)]:delay-0",
              "xl:[[data-reveal=on]_&]:[&>*:nth-child(2)]:delay-200",
              "xl:[[data-reveal=on]_&]:[&>*:nth-child(3)]:delay-400",
              "xl:[[data-reveal=on]_&]:[&>*:nth-child(4)]:delay-600",
            ].join(" ")}
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
        </RevealGroup>
      </div>
    </Section>
  );
}
