import { getTranslations } from "next-intl/server";

import { ScrollToContactButton } from "@/components/layout/header/ScrollToContactButton";
import { type Locale } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

type CtaKeys = {
  title: string; // translation key inside namespace
  button: string; // translation key inside namespace
  desc?: string;
};

export type CtaProps = {
  locale: Locale;
  namespace: string;
  keys: CtaKeys;
  variant?: "default" | "soft" | "brand";
  className?: string;
};

const variantClassName: Record<NonNullable<CtaProps["variant"]>, string> = {
  default: "",
  soft: "bg-gray-50",
  brand: "bg-terracotta-500",
};

export default async function Cta({
  locale,
  namespace,
  keys,
  variant = "default",
  className,
}: CtaProps) {
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
