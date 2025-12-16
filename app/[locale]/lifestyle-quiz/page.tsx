// app/[locale]/lifestyle-quiz/page.tsx

import { QuizProvider } from "@/components/quiz/quiz-context";
import QuizShell from "@/components/quiz/quiz-shell";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function LifestyleQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* SEO Header (Server Side Rendered) */}
        <div className="mb-10 text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-terracotta-500">
            {t("hero.kicker")}
          </p>
          <h1 className="font-serif font-medium text-4xl text-brandBlue-500 md:text-5xl lg:text-6xl leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Interactive App Island */}
        <QuizProvider>
          <QuizShell locale={locale} />
        </QuizProvider>
      </div>
    </main>
  );
}
