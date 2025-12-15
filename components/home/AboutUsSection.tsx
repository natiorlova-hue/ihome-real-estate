// components/home/AboutUsSection.tsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import Section from "@/components/layout/Section";
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
          <h2
            id="about-us-heading"
            className="font-serif text-3xl text-gray-900 md:text-5xl"
          >
            {t("about.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
            {t("about.intro.line1")}
            <br />
            {t("about.intro.line2")}
          </p>
        </header>

        <div className="mt-10 grid items-center gap-10 md:mt-14 md:grid-cols-2 md:gap-12">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[999px]">
              <Image
                src="/images-team/about-main.png"
                alt={t("about.title")}
                width={900}
                height={520}
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl text-gray-900 md:text-3xl">
              {t("approach.title")}
            </h3>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 md:text-base">
              <p>{t("approach.desc1")}</p>
              <p>{t("approach.desc2")}</p>
            </div>

            <div className="mt-8">
              <Button asChild variant="default" size="lg">
                <Link href={`/${locale}/coming-soon`}>{t("approach.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
