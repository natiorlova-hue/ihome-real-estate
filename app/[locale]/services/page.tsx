import Cta from "@/components/Cta";
import ContactSection from "@/components/contact/ContactSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import LifestyleSection from "@/components/home/LifestyleSection";
import Section from "@/components/layout/Section";
import ScrollToContactButton from "@/components/layout/header/ScrollToContactButton";
import Reveal, { type RevealDelay } from "@/components/motion/Reveal";
import ProcessSection from "@/components/shared/ProcessSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface ServicesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

// ==========================================
// CUSTOM SVG ICONS
// ==========================================
const coreIcons: Record<string, React.ReactNode> = {
  search: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3" />
      <path d="M14 15l2 2" />
    </svg>
  ),
  legal: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <path d="M12 4v16" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  ),
  relocation: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  ),
  management: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  concierge: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  renovation: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3 3-3 3-3-3 3-3z" />
      <path d="M19 9l3 3-3 3-3-3 3-3z" />
      <path d="M5 15l3 3-3 3-3-3 3-3z" />
      <path d="M22 22L2 2" />
    </svg>
  ),
};

const whyIcons: Record<string, React.ReactNode> = {
  approach: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M18 8l2 2 4-4" />
    </svg>
  ),
  network: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  team: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

const coreDelays = [
  "delay-0",
  "delay-100",
  "delay-200",
] as const satisfies readonly RevealDelay[];

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const coreKeys = [
    "search",
    "legal",
    "relocation",
    "management",
    "concierge",
    "renovation",
  ] as const;
  const whyKeys = ["approach", "network", "team"] as const;

  return (
    <div className="overflow-x-hidden bg-white font-sans">
      {/* 1. Hero Section */}
      <Section className="pb-16 pt-24">
        <div className="mx-auto max-w-4xl text-center md:text-left">
          <Reveal animation="slideUp">
            <h1 className="mb-6 font-serif text-dlg leading-tight text-gray-900 md:text-serifxl">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-200">
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
              {t("hero.subtitle")}
            </p>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-300">
            <ScrollToContactButton
              locale={locale}
              label={t("hero.cta")}
              size="lg"
              className="h-14 rounded-md bg-terracotta-500 px-8 hover:bg-terracotta-600"
            />
          </Reveal>
        </div>
      </Section>

      {/* 2. Our Core Services */}
      <Section className="border-y border-gray-100 bg-gray-50/50 py-16 md:py-24">
        <div className="mx-auto max-w-[1192px]">
          <div className="mb-16 text-center">
            <Reveal animation="slideUp">
              <h2 className="font-serif text-3xl text-brandBlue-600 md:text-4xl">
                {t("coreServices.title")}
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {coreKeys.map((key, i) => (
              <Reveal key={key} delay={coreDelays[i % 3]}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brandBlue-50 text-brandBlue-600">
                    {coreIcons[key]}
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-medium text-brandBlue-600">
                    {t(`coreServices.items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t(`coreServices.items.${key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. Why choose iHome? */}
      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1192px]">
          <div className="mb-16 text-center">
            <Reveal animation="slideUp">
              <h2 className="font-serif text-3xl text-gray-900 md:text-4xl">
                {t("whyChoose.title")}
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {whyKeys.map((key, i) => (
              <Reveal key={key} delay={coreDelays[i % 3]}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-500">
                    {whyIcons[key]}
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-medium text-gray-900">
                    {t(`whyChoose.items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t(`whyChoose.items.${key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Find your perfect lifestyle */}
      <LifestyleSection locale={locale} />

      {/* 5. Process Overview */}
      <ProcessSection locale={locale} namespace="services" />

      {/* 6. Featured Homes */}
      <FeaturedProperties locale={locale} />

      {/* 7. CTA - Email Capture (Sell Property) */}
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

      {/* 8. What our clients say */}
      <TestimonialsSection locale={locale} namespace="services" />

      {/* 9. Contact */}
      <ContactSection locale={locale} />
    </div>
  );
}
