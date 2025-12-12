import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "./ui/button";

const CTA = () => {
  const t = useTranslations("common.cta");

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
};

export default CTA;
