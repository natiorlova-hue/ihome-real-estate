import ContactSection from "@/components/contact/ContactSection";
import CTA from "@/components/cta";
import BenefitsSection from "@/components/home/BenefitsSection";
import HeroVisualSection from "@/components/home/HeroVisualSection";
import LifestyleSection from "@/components/home/LifestyleSection";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import FeaturedProperties from "../../components/home/FeaturedProperties";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div>
      <HeroVisualSection locale={locale} />

      <LifestyleSection locale={locale} />

      <CTA locale={locale} />

      <FeaturedProperties locale={locale} />

      <CTA locale={locale} />

      <BenefitsSection locale={locale} />

      <section className="bg-gray-50" aria-labelledby="quiz-heading">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-8 py-16 text-center md:py-28">
            <h2 id="quiz-heading" className="max-w-xl text-brandBlue-500">
              {t("quiz.title")}
            </h2>
            <p className="text-gray-700">{t("quiz.subtitle")}</p>
            <Button variant="brandBlue" size="lg">
              {t("quiz.button")}
            </Button>
          </div>
        </div>
      </section>

      {/* <VisualRegions locale={locale} /> */}

      <ContactSection locale={locale} />
    </div>
  );
}
