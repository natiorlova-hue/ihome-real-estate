//app/[locale]/our-way/page.tsx

import { Globe, Handshake, Heart, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import Cta from "@/components/Cta";
import ContactSection from "@/components/contact/ContactSection";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Link, type Locale } from "@/i18n/routing";

interface OurWayPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function OurWayPage({ params }: OurWayPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ourWay" });

  const values = [
    { key: "trust", icon: Handshake, delay: "delay-0" as const },
    { key: "focus", icon: Target, delay: "delay-100" as const },
    { key: "global", icon: Globe, delay: "delay-200" as const },
    { key: "ease", icon: Heart, delay: "delay-300" as const },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <Section className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-[1192px] mx-auto">
          <Reveal animation="slideUp">
            <h1 className="text-dlg md:text-serifxl font-serif text-gray-900 leading-tight mb-8 max-w-4xl">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-200">
            <p className="text-lg md:text-xl text-tertiary-600 max-w-2xl leading-relaxed mb-10">
              {t("hero.subtitle")}
            </p>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-300">
            <Button
              asChild
              size="lg"
              className="rounded-md bg-terracotta-500 hover:bg-terracotta-600 px-8 h-14"
            >
              <Link href="/lifestyle-quiz">{t("hero.cta")}</Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* 2. Philosophy Section - Full Bleed Left with SHARP corners */}
      <section className="relative flex flex-col lg:flex-row items-stretch bg-white border-y border-gray-100 overflow-hidden">
        {/* Left: Image (SHARP CORNERS) */}
        <div className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px]">
          <Reveal animation="fadeIn" className="h-full w-full">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1200&auto=format"
                alt="Coastal view - Marbella"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>

        {/* Right: Text Block */}
        <div className="w-full lg:w-1/2 flex items-center justify-start py-16 md:py-24 px-6 md:px-12 lg:pl-20 xl:pl-32">
          <div className="max-w-xl">
            <Reveal animation="slideUp">
              <h2 className="text-dlg md:text-serifmd font-serif text-gray-900 mb-8 leading-tight">
                “{t("quote.text")}”
              </h2>
            </Reveal>
            <div className="space-y-6">
              <Reveal animation="fadeIn" delay="delay-100">
                <p className="text-base md:text-lg text-gray-500 leading-relaxed font-sans">
                  {t("quote.desc")}
                </p>
              </Reveal>
              <Reveal animation="fadeIn" delay="delay-200">
                <p className="text-base md:text-lg text-gray-500 leading-relaxed font-sans font-medium text-gray-700">
                  {t("quote.subtext")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Values Section */}
      <Section className="bg-gray-25 py-24 border-b border-gray-100">
        <div className="max-w-[1192px] mx-auto text-center">
          <Reveal animation="slideUp" className="mb-16">
            <h2 className="text-gray-900 font-serif text-3xl md:text-5xl">
              {t("values.title")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <Reveal key={v.key} animation="slideUp" delay={v.delay}>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow h-full flex flex-col items-center">
                  <div className="mb-6 p-4 rounded-xl bg-terracotta-50 text-terracotta-500">
                    <v.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t(`values.items.${v.key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t(`values.items.${v.key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Mid CTA */}
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

      {/* 5. Process Section (Numbered steps with Arrows) */}
      <Section className="py-24 md:py-32">
        <div className="max-w-[1192px] mx-auto">
          <Reveal animation="slideUp" className="text-center mb-16 md:mb-24">
            <h2 className="text-gray-900 font-sans text-2xl md:text-dmd font-semibold">
              {t("work.title")}
            </h2>
          </Reveal>

          <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-4 relative">
            {[1, 2, 3, 4, 5].map((step, idx) => {
              const delays = [
                "delay-0",
                "delay-100",
                "delay-200",
                "delay-300",
                "delay-400",
              ] as const;
              return (
                <div
                  key={step}
                  className="flex-1 flex flex-col items-center text-center relative w-full"
                >
                  <Reveal
                    animation="slideUp"
                    delay={delays[idx]}
                    className="flex flex-col items-center"
                  >
                    <div className="relative mb-8 flex items-center justify-center">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-terracotta-100/60 flex items-center justify-center text-5xl md:text-6xl font-serif text-terracotta-500 font-medium">
                        {step}
                      </div>
                      {idx < 4 && (
                        <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 translate-x-1/2 z-10">
                          <svg
                            width="40"
                            height="24"
                            viewBox="0 0 40 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 12H36M36 12L28 4M36 12L28 20"
                              stroke="#EF651A"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 leading-tight max-w-[160px]">
                      {t(`work.steps.${step}.title`)}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px]">
                      {t(`work.steps.${step}.desc`)}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
          <Reveal
            animation="fadeIn"
            delay="delay-1500"
            className="text-center mt-20 md:mt-32"
          >
            <p className="text-sm md:text-base text-gray-500 font-medium max-w-2xl mx-auto italic">
              {t("work.disclaimer")}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 6. Closing Section - Full Bleed Left with ROUNDED Right Edge (Arch) */}
      <section className="relative flex flex-col lg:flex-row items-stretch bg-white py-12 md:py-24 overflow-hidden">
        {/* Left: Image (D-shape rounded right edge) */}
        <div className="relative w-full lg:w-1/2 min-h-[450px] lg:min-h-[700px]">
          <Reveal animation="fadeIn" className="h-full w-full">
            {/* Rounding applied here ONLY for this section */}
            <div className="relative h-full w-full rounded-r-[160px] md:rounded-r-[280px] lg:rounded-r-[450px] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1200&auto=format"
                alt="Family Lifestyle - Living the dream"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>

        {/* Right: Text Block */}
        <div className="w-full lg:w-1/2 flex items-center justify-start py-12 px-6 md:px-12 lg:pl-20 xl:pl-32">
          <div className="max-w-xl">
            <Reveal animation="slideUp">
              <h2 className="text-dlg md:text-serifxl font-serif text-gray-900 leading-tight mb-8">
                {t("closing.title")}
              </h2>
            </Reveal>
            <div className="space-y-8">
              <Reveal animation="fadeIn" delay="delay-100">
                <div className="space-y-6 text-base md:text-lg text-gray-500 leading-relaxed font-sans">
                  <p>{t("closing.desc")}</p>
                  <p>{t("closing.subdesc")}</p>
                </div>
              </Reveal>
              <Reveal animation="fadeIn" delay="delay-300">
                <Button
                  asChild
                  size="lg"
                  className="rounded-md bg-terracotta-500 hover:bg-terracotta-600 px-12 h-14 font-medium"
                >
                  <Link href="/contact">{t("closing.cta")}</Link>
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ContactSection locale={locale} />
    </div>
  );
}
