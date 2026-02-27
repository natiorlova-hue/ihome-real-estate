import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface ProcessSectionProps {
  locale: Locale;
  namespace?: string;
  className?: string;
}

export default async function ProcessSection({
  locale,
  namespace = "services",
  className = "py-24 md:py-32",
}: ProcessSectionProps) {
  const t = await getTranslations({ locale, namespace });

  return (
    <Section className={className}>
      <div className="mx-auto max-w-[1192px]">
        <Reveal animation="slideUp" className="mb-16 text-center md:mb-24">
          <h2 className="font-sans text-2xl font-semibold text-gray-900 md:text-dmd">
            {t("work.title")}
          </h2>
        </Reveal>

        <div className="relative flex flex-col items-start justify-between gap-12 md:flex-row md:gap-4">
          {[1, 2, 3, 4, 5].map((step, idx) => {
            const delays = [
              "delay-0",
              "delay-100",
              "delay-200",
              "delay-300",
              "delay-400",
            ] as const;
            return (
              <div
                key={step}
                className="relative flex w-full flex-1 flex-col items-center text-center"
              >
                <Reveal
                  animation="slideUp"
                  delay={delays[idx]}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-8 flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-terracotta-100/60 font-serif text-5xl font-medium text-terracotta-500 md:h-28 md:w-28 md:text-6xl">
                      {step}
                    </div>
                    {idx < 4 && (
                      <div className="absolute top-1/2 -right-6 z-10 hidden -translate-y-1/2 translate-x-1/2 transform lg:flex">
                        <svg
                          width="40"
                          height="24"
                          viewBox="0 0 40 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 12H36M36 12L28 4M36 12L28 20"
                            stroke="#EF651A"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h4 className="mb-3 max-w-[160px] text-base font-bold leading-tight text-gray-900 md:text-lg">
                    {t(`work.steps.${step}.title`)}
                  </h4>
                  <p className="max-w-[200px] text-xs leading-relaxed text-gray-500 md:text-sm">
                    {t(`work.steps.${step}.desc`)}
                  </p>
                </Reveal>
              </div>
            );
          })}
        </div>

        {t.has("work.disclaimer") && (
          <Reveal
            animation="fadeIn"
            delay="delay-1500"
            className="mt-20 text-center md:mt-32"
          >
            <p className="mx-auto max-w-2xl text-sm font-medium italic text-gray-500 md:text-base">
              {t("work.disclaimer")}
            </p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
