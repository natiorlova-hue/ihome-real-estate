import Cta from "@/components/Cta";
import ContactSection from "@/components/contact/ContactSection";
import LifestyleSection from "@/components/home/LifestyleSection";
import Reveal from "@/components/motion/Reveal";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { type Locale } from "@/lib/locale-path";
import { getFeaturedProperties } from "@/lib/properties";
import { getTranslations } from "next-intl/server";

type PropertiesPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PropertiesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });

  return {
    title: `iHome | ${t("hero.title")}`,
    description: t("hero.subtitle"),
  };
}

export default async function PropertiesPage({ params }: PropertiesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });
  const quizT = await getTranslations({ locale, namespace: "home.quiz" });

  // Отримуємо мокові дані (або згодом із Sanity)
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="bg-white">
      {/* 1. Header Top CTA (Email Capture) */}
      <Cta
        locale={locale}
        namespace="common"
        layout="emailCapture"
        variant="brand"
        className="pt-0 pb-0 md:pt-2 md:pb-2 border-b border-terracotta-600"
        keys={{
          title: "ctaRow.title",
          desc: "ctaRow.desc",
          button: "ctaRow.sendRequestBtn",
          emailPlaceholder: "ctaRow.emailPlaceholder",
          privacyPrefix: "ctaRow.privacyPrefix",
          privacyLink: "ctaRow.privacyLink",
        }}
      />

      {/* 2. Hero Section */}
      <section className="container py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl space-y-6">
          <Reveal animation="slideUp" delay="delay-100">
            <h1 className="text-gray-900 leading-tight">{t("hero.title")}</h1>
          </Reveal>

          <Reveal animation="fadeIn" delay="delay-200">
            <p className="text-lg text-tertiary-600 max-w-2xl">
              {t("hero.subtitle")}
            </p>
          </Reveal>

          <Reveal animation="fadeIn" delay="delay-300">
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="rounded-lg">
                <Link
                  href={{ pathname: "/properties", query: { type: "buy" } }}
                >
                  {t("hero.buttons.primary")}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg border-gray-300"
              >
                <Link href="/sell">{t("hero.buttons.secondary")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Properties Grid Section */}
      <section className="container pb-20 md:pb-32">
        <PropertiesGrid initialProperties={featuredProperties} />
      </section>

      {/* 4. Mid CTA: Didn't find what you're looking for? */}
      <Cta
        locale={locale}
        namespace="common"
        layout="simple"
        variant="default"
        keys={{
          title: "ctaRow.title",
          button: "ctaRow.sendRequestBtn",
        }}
      />

      {/* 5. Blue Banner (Quiz CTA) */}
      <section className="bg-blue-light-50 py-16 md:py-24 border-y border-blue-light-100">
        <div className="container flex flex-col items-center justify-center text-center space-y-6">
          <Reveal animation="slideUp">
            <h2 className="text-brandBlue-600 max-w-2xl text-3xl md:text-4xl">
              {quizT("title")}
            </h2>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-100">
            <p className="text-gray-600 max-w-lg text-lg">
              {quizT("subtitle")}
            </p>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-200">
            <Button
              asChild
              variant="brandBlue"
              size="lg"
              className="mt-4 rounded-lg"
            >
              <Link href="/lifestyle-quiz">{quizT("button")}</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 6. Find your perfect lifestyle (Reuse Homepage Component) */}
      <div className="pt-20">
        {/* We reuse the Lifestyle Section, but we might want to hide its standard H2 if needed.
            For now, we just drop it in as it provides exactly the grid we see in the design. */}
        <LifestyleSection locale={locale} />
      </div>

      {/* 8. Bottom Contact Form */}
      <ContactSection locale={locale} />
    </div>
  );
}
