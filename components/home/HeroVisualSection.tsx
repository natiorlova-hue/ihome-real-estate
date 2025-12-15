import ScrollToContactButton from "@/components/layout/header/ScrollToContactButton";
import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/lib/locale-path";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  locale: Locale;
};

export default function HeroVisualSection({ locale }: HeroProps) {
  const t = useTranslations("home");

  return (
    <section>
      {/* Text / CTAs stay inside container */}
      <div className="container">
        <div className="flex flex-col gap-12 py-20 text-center md:text-left">
          <h1 className="leading-[1.1]">
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
              <Link href={withLocale(locale, "coming-soon")}>
                {t("hero.cta.explore")}
              </Link>
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

      {/* Full-bleed image: ALWAYS 100vw, even on 4K */}
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
