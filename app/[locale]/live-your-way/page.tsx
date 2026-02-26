//app/[locale]/live-your-way/page.tsx

import Cta from "@/components/Cta";
import ContactSection from "@/components/contact/ContactSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import JournalSection from "@/components/home/JournalSection";
import LifestyleSection from "@/components/home/LifestyleSection";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Link, type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface ForYouPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

/**
 * Сторінка "For You" — персоналізований гайд по стилях життя та нерухомості.
 * Динамічно завантажує останні 6 постів із Sanity для розділу Lifestyle.
 */
export default async function ForYouPage({ params }: ForYouPageProps) {
  // У Next.js 15 params — це Promise
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "liveYourWay" });

  return (
    <div className="bg-white overflow-x-hidden font-sans">
      {/* 1. Hero Section */}
      <Section className="pt-24 pb-16">
        <div className="max-w-[1192px] mx-auto">
          <Reveal animation="slideUp">
            <h1 className="text-dlg md:text-serifxl font-serif text-gray-900 leading-tight mb-6">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-200">
            <p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </Reveal>
          <Reveal
            animation="fadeIn"
            delay="delay-300"
            className="flex flex-wrap gap-4"
          >
            <Button
              asChild
              className="bg-terracotta-500 hover:bg-terracotta-600 px-8 h-12 rounded-md transition-all shadow-sm border-none text-white"
            >
              <Link href="/lifestyle-quiz">{t("hero.buttons.explore")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-300 text-gray-700 px-8 h-12 rounded-md hover:bg-gray-50 transition-all"
            >
              <Link href="/properties">{t("hero.buttons.guidance")}</Link>
            </Button>
          </Reveal>
        </div>
      </Section>
      <LifestyleSection locale={locale} />
      <JournalSection locale={locale} />
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

      {/* 5. Client Stories (Testimonials) */}
      <section className="bg-gray-50 border-y border-gray-100 pt-16 mb-32 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal animation="slideUp">
              <h2 className="text-3xl font-serif text-gray-900 mb-4">
                {t("stories.title")}
              </h2>
            </Reveal>
            <Reveal animation="fadeIn" delay="delay-100">
              <p className="text-tertiary-600">{t("stories.subtitle")}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The team at iHome made our relocation entirely seamless. Their local knowledge is unmatched, and they truly listened to our needs.",
                author: "Sarah & Mark Davies",
                role: "Relocated from London",
              },
              {
                quote:
                  "We found our dream investment property within two weeks. The ROI projections were accurate and the buying process was transparent.",
                author: "Elena Rodriguez",
                role: "Property Investor",
              },
              {
                quote:
                  "A truly bespoke service. They didn't just sell us a house, they introduced us to the lifestyle, schools, and local community.",
                author: "The Thompson Family",
                role: "New Residents in Estepona",
              },
            ].map((story, i) => (
              <Reveal
                key={i}
                animation="slideUp"
                delay={`delay-${(i + 1) * 100}` as any}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 h-full flex flex-col justify-between">
                  <p className="text-gray-700 italic mb-8 leading-relaxed">
                    {story.quote}
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {story.author}
                    </p>
                    <p className="text-sm text-tertiary-600 mt-1">
                      {story.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactSection locale={locale} />
    </div>
  );
}
