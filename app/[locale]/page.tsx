//app/[locale]/page.tsx

import Cta from "@/components/Cta";
import ContactSection from "@/components/contact/ContactSection";
import AboutUsSection from "@/components/home/AboutUsSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import HeroVisualSection from "@/components/home/HeroVisualSection";
import JournalSection from "@/components/home/JournalSection";
import LifestyleSection from "@/components/home/LifestyleSection";
import OurTeamSection from "@/components/home/OurTeamSection";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

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

      <Cta
        locale={locale}
        namespace="common"
        layout="simple"
        keys={{
          title: "ctaRow.title",
          button: "ctaRow.sendRequestBtn",
        }}
      />

      <FeaturedProperties locale={locale} />

      <Cta
        locale={locale}
        namespace="common"
        layout="emailCapture"
        variant="brand"
        keys={{
          title: "ctaSell.title",
          desc: "ctaSell.desc",
          button: "ctaRow.sendRequestBtn",
          emailPlaceholder: "ctaSell.emailPlaceholder",
          privacyPrefix: "ctaSell.privacyPrefix",
          privacyLink: "ctaSell.privacyLink",
        }}
      />

      <BenefitsSection locale={locale} />

      <JournalSection locale={locale} />

      <section className="bg-gray-50" aria-labelledby="quiz-heading">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-8 py-16 text-center md:py-28">
            <h2 id="quiz-heading" className="max-w-xl text-brandBlue-500">
              {t("quiz.title")}
            </h2>
            <p className="text-gray-700">{t("quiz.subtitle")}</p>
            <Button asChild variant="brandBlue" size="lg">
              <Link href={`/${locale}/lifestyle-quiz`}>{t("quiz.button")}</Link>
            </Button>
          </div>
        </div>
      </section>
      <AboutUsSection locale={locale} />

      <OurTeamSection locale={locale} />

      {/* <VisualRegions locale={locale} /> */}

      <ContactSection locale={locale} />
    </div>
  );
}
