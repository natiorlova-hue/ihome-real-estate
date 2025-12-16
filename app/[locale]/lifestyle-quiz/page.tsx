import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Section from "@/components/layout/Section";
import QuizWizard from "@/components/QuizWizard";
import { type Locale } from "@/lib/locale-path";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `/${locale}/lifestyle-quiz`,
    },
  };
}

export default async function LifestyleQuizPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  return (
    <Section className="bg-gray-50" ariaLabelledby="quiz-title">
      <header className="mx-auto max-w-tabs text-center">
        <p className="text-sm font-semibold text-gray-600">
          {t("hero.kicker")}
        </p>

        <h1
          id="quiz-title"
          className="mt-3 font-serif text-serifmd text-gray-900 md:text-seriflg"
        >
          {t("hero.title")}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700 md:text-lg">
          {t("hero.subtitle")}
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-tabs md:mt-14">
        <QuizWizard locale={locale} />
      </div>
    </Section>
  );
}
