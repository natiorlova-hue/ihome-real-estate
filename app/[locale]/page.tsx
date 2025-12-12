import RecentProperties from "@/components/RecentProperties";
import CTA from "@/components/cta";
import Categories from "@/components/home/Categories";
import HeroVisualSection from "@/components/home/HeroVisualSection";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 1. Initialize translation hook
  const t = useTranslations("home");

  return (
    <div>
      {/* Hero Section */}
      <div className="container">
        <div className="py-20 gap-12 flex flex-col text-center md:text-left">
          <h1 className="leading-[1.1]">
            {/* Rich Text for Title: preserves <u> styling and <br> */}
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
        </div>
      </div>

      {/* Hero Visual Section */}
      <HeroVisualSection />

      {/* Categories Section */}
      <CategoriesWrapper params={params} />

      {/* CTA Section */}
      <CTA />

      {/* Recent Properties */}
      <RecentProperties
        title={t("lifestyle.title")}
        description={t("lifestyle.description")}
      />

      {/* CTA Section */}
      <CTA />

      {/* Quiz Section */}
      <div className="bg-gray-50">
        <div className="container">
          <div className="flex flex-col justify-center items-center gap-8 py-16 md:py-28 text-center">
            <h2 className="text-brandBlue-500 max-w-xl">{t("quiz.title")}</h2>
            <p className="text-gray-700">{t("quiz.subtitle")}</p>
            <Button variant="brandBlue" size="lg">
              {t("quiz.button")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper to handle async params for client components if needed
async function CategoriesWrapper({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Categories locale={locale} />;
}
