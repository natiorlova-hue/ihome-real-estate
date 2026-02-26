import Reveal from "@/components/motion/Reveal";
import { type Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface TestimonialsSectionProps {
  locale: Locale;
  namespace?: string;
  className?: string;
}

export default async function TestimonialsSection({
  locale,
  namespace = "services",
  className = "border-y border-gray-100 bg-gray-50 py-16 md:py-24",
}: TestimonialsSectionProps) {
  const t = await getTranslations({ locale, namespace });
  const keys = ["1", "2", "3"] as const;

  return (
    <section className={className}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal animation="slideUp">
            <h2 className="mb-4 font-serif text-3xl text-gray-900">
              {t("stories.title")}
            </h2>
          </Reveal>
          {t.has("stories.subtitle") && (
            <Reveal animation="fadeIn" delay="delay-100">
              <p className="text-tertiary-600">{t("stories.subtitle")}</p>
            </Reveal>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {keys.map((k, i) => (
            <Reveal
              key={k}
              animation="slideUp"
              delay={`delay-${(i + 1) * 100}` as any}
            >
              <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-xs">
                <p className="mb-8 leading-relaxed italic text-gray-700">
                  &quot;{t(`stories.items.${k}.quote`)}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t(`stories.items.${k}.author`)}
                  </p>
                  <p className="mt-1 text-sm text-tertiary-600">
                    {t(`stories.items.${k}.role`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
