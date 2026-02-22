import { getTranslations } from "next-intl/server";
import Image from "next/image";

import HeroQuizBadge from "@/components/home/HeroQuizBadge";
import ScrollToContactButton from "@/components/layout/header/ScrollToContactButton";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/routing";

type HeroProps = {
  locale: Locale;
};

export default async function HeroVisualSection({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section aria-labelledby="hero-heading">
      <div className="container">
        <div className="flex flex-col gap-10 py-16 text-center md:gap-12 md:py-20 md:text-left">
          <div className="flex justify-center md:justify-start">
            <HeroQuizBadge
              locale={locale}
              label={t("hero.quizBadge.label")}
              text={t("hero.quizBadge.text")}
            />
          </div>

          <h1 id="hero-heading" className="leading-[1.1]">
            {t("hero.titleBefore")}{" "}
            <u className="decoration-terracotta-200 decoration-5">
              {t("hero.titleHighlight")}
            </u>
            <br />
            {t("hero.titleAfter")}
          </h1>

          <p>
            {t("hero.subtitleLine1")}
            <br />
            {t("hero.subtitleLine2")}
          </p>

          <div className="flex justify-center gap-3 md:justify-start md:gap-4">
            <Button asChild size="lg">
              <Link href="/coming-soon">{t("hero.cta.explore")}</Link>
            </Button>

            <ScrollToContactButton
              locale={locale}
              variant="outline"
              size="lg"
              label={t("hero.cta.book")}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Image
          src="/hero-marbella.jpg"
          alt={t("hero.imageAlt")}
          width={3840}
          height={2160}
          priority
          sizes="100vw"
          className="h-[240px] w-full object-cover md:h-[420px] xl:h-[560px]"
        />
      </div>
    </section>
  );
}
