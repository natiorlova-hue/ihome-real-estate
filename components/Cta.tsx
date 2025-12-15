import { getTranslations } from "next-intl/server";

import { ScrollToContactButton } from "@/components/layout/header/ScrollToContactButton";
import { type Locale } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

type CTAKeys = {
  title: string; // translation key inside namespace
  button: string; // translation key inside namespace
};

type CTAProps = {
  locale: Locale;

  /**
   * Namespace that contains CTA copy.
   * Examples:
   * - "common.ctaRow"
   * - "home.ctaRow"
   * - "guides.ctaRow"
   */
  namespace: string;

  /**
   * Translation keys inside the given namespace.
   * Example: { title: "notFound", button: "contact" }
   */
  keys: CTAKeys;

  /**
   * Visual variants: background, spacing, etc.
   * Keep it Tailwind-only.
   */
  variant?: "default" | "soft" | "brand";

  className?: string;
};

const variantClassName: Record<NonNullable<CTAProps["variant"]>, string> = {
  default: "",
  soft: "bg-gray-50",
  brand: "bg-terracotta-50",
};

export default async function CTA({
  locale,
  namespace,
  keys,
  variant = "default",
  className,
}: CTAProps) {
  const t = await getTranslations({ locale, namespace });

  return (
    <section className={cn(variantClassName[variant], className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 py-12 text-center md:flex-row md:text-left">
          <h2 className="text-2xl font-serif text-gray-900 md:text-3xl">
            {t(keys.title)}
          </h2>

          <ScrollToContactButton
            locale={locale}
            label={t(keys.button)}
            size="xl"
          />
        </div>
      </div>
    </section>
  );
}
