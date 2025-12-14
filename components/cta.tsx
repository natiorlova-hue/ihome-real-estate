import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "./ui/button";

type CTAProps = {
  locale: Locale;
};

export default async function CTA({ locale }: CTAProps) {
  const t = await getTranslations({ locale, namespace: "common.ctaRow" });

  return (
    <section className="container">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-12">
        <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
          {t("notFound")}
        </h2>
        <Button size="xl" asChild>
          <Link href="/contact">{t("contact")}</Link>
        </Button>
      </div>
    </section>
  );
}
