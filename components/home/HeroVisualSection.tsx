import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroVisualSection() {
  const t = useTranslations("home");

  return (
    <div className="container">
      <div className="py-20 gap-12 flex flex-col text-center md:text-left">
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

        <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
          <Button size="lg">{t("hero.cta.explore")}</Button>
          <Button variant="outline" size="lg">
            {t("hero.cta.book")}
          </Button>
        </div>

        <div className="mt-8">
          <Image
            src="/hero-marbella.jpg"
            alt={t("hero.imageAlt")}
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
