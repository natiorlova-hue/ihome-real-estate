// components/home/AboutUsSection.tsx
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/locale-path";

type AboutUsSectionProps = {
  locale: Locale;
};

export default async function AboutUsSection({ locale }: AboutUsSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <Section ariaLabelledby="about-us-heading" className="py-10 md:py-16">
      <div className="mx-auto max-w-[1192px]">
        <header className="text-center">
          <Reveal animation="slideUp" delay="delay-0">
            <h2
              id="about-us-heading"
              className="font-serif text-3xl text-gray-900 md:text-5xl"
            >
              {t("about.title")}
            </h2>
          </Reveal>

          <Reveal animation="fadeIn" delay="delay-200">
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
              {t("about.intro.line1")}
              <br />
              {t("about.intro.line2")}
            </p>
          </Reveal>
        </header>

        <div className="mt-10 grid items-center gap-10 md:mt-14 md:grid-cols-2 md:gap-12">
          {/* Image */}
          <Reveal animation="slideUp" delay="delay-200">
            <div className="relative flex justify-center md:justify-start">
              <Image
                src="/images-team/about-main.png"
                alt={t("about.title")}
                width={680}
                height={460}
                sizes="(min-width: 1024px) 680px, (min-width: 768px) 620px, 100vw"
                className="h-auto w-full max-w-[680px]"
              />
            </div>
          </Reveal>

          {/* Copy */}
          <div className="text-center md:text-left">
            <Reveal animation="slideUp" delay="delay-0">
              <h3 className="font-serif text-2xl text-gray-900 md:text-3xl">
                {t("approach.title")}
              </h3>
            </Reveal>

            <Reveal animation="fadeIn" delay="delay-200">
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 md:text-base">
                <p>{t("approach.desc1")}</p>
                <p>{t("approach.desc2")}</p>
              </div>
            </Reveal>

            <Reveal animation="fadeIn" delay="delay-300">
              <div className="mt-8">
                <Button asChild variant="default" size="lg">
                  <Link href="/coming-soon">{t("approach.cta")}</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
