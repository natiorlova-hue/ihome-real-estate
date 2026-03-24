import Badge from "@/components/Badge";
import ContactSection from "@/components/contact/ContactSection";
import ContentCard from "@/components/content/ContentCard";
import Cta from "@/components/Cta";
import Reveal, { type RevealDelay } from "@/components/motion/Reveal";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyLeadForm from "@/components/properties/PropertyLeadForm";
import { Link } from "@/i18n/routing";
import { type Locale } from "@/lib/locale-path";
import { getFeaturedProperties } from "@/lib/properties";
import { formatPrice } from "@/lib/utils";
import { Bath, BedDouble, ChevronLeft, MapPin, Square } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const relatedDelays = [
  "delay-100",
  "delay-200",
  "delay-300",
] as const satisfies readonly RevealDelay[];

type PropertyDetailsPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });

  // Отримуємо всі об'єкти з бази (без хардкоду)
  const allProperties = await getFeaturedProperties(locale);
  const property = allProperties.find(p => p.slug === slug);

  if (!property) notFound();

  // Виводимо обрані об'єкти, виключаючи поточний, щоб він не дублювався
  const relatedProperties = allProperties
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* 1. ВЕРХНІЙ CTA */}
      <Cta
        locale={locale}
        namespace="common"
        layout="emailCapture"
        variant="brand"
        className="pt-0 pb-0 md:pt-2 md:pb-2 border-b border-terracotta-600"
        keys={{
          title: "ctaRow.title",
          desc: "ctaRow.desc",
          button: "ctaRow.sendRequestBtn",
          emailPlaceholder: "ctaRow.emailPlaceholder",
          privacyPrefix: "ctaRow.privacyPrefix",
          privacyLink: "ctaRow.privacyLink",
        }}
      />

      <div className="container pt-6 pb-16 md:pt-10 md:pb-24">
        {/* Back Link */}
        <Reveal animation="slideDown">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-brandBlue-500 hover:text-brandBlue-600 transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" /> {t("details.back")}
          </Link>
        </Reveal>

        {/* Gallery */}
        <Reveal animation="fadeIn" delay="delay-100">
          <PropertyGallery images={property.images} title={property.title} />
        </Reveal>

        {/* Layout Grid */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:mt-16">
          {/* Left Column (Content) */}
          <div className="lg:col-span-8 space-y-12">
            <Reveal animation="slideUp" className="space-y-5">
              {property.topBadge && (
                <Badge
                  variant={property.topBadge.variant}
                  text={property.topBadge.text}
                />
              )}

              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                {property.title}
              </h1>

              <p className="flex items-center gap-2 text-tertiary-600 text-lg">
                <MapPin className="h-5 w-5" /> Marbella, Andalusia
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                  <BedDouble className="h-4 w-4" /> {property.beds}{" "}
                  {t("card.bedrooms")}
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                  <Bath className="h-4 w-4" /> {property.baths}{" "}
                  {t("card.bathrooms")}
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                  <Square className="h-4 w-4" /> {property.totalArea} m²
                </div>
              </div>
            </Reveal>

            <Reveal animation="fadeIn" className="space-y-6">
              <h2 className="text-2xl font-sans font-semibold text-gray-900">
                {t("details.descriptionTitle")}
              </h2>
              <div className="prose prose-gray max-w-none text-tertiary-600 leading-relaxed text-lg">
                <p>{property.description}</p>
              </div>
              <div className="pt-4">
                <p className="text-3xl font-serif font-semibold text-gray-900">
                  {formatPrice(property.price ?? 0)}
                </p>
              </div>
            </Reveal>

            <Reveal
              animation="fadeIn"
              className="space-y-6 pt-8 border-t border-gray-200"
            >
              <h2 className="text-2xl font-sans font-semibold text-gray-900">
                {t("details.featuresTitle")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: t("details.features.propertyType"), value: "Villa" },
                  {
                    label: t("details.features.propertySize"),
                    value: `${property.totalArea} m²`,
                  },
                  { label: t("card.bedrooms"), value: property.beds },
                  { label: t("card.bathrooms"), value: property.baths },
                  { label: t("details.features.terrace"), value: "—" },
                  { label: t("details.features.yearBuilt"), value: "2025" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-gray-50 p-4 border border-gray-100 shadow-xs"
                  >
                    <p className="text-sm font-medium text-tertiary-600">
                      {feature.label}
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {feature.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form Sidebar */}
          <div className="lg:col-span-4">
            <Reveal
              animation="slideUp"
              delay="delay-200"
              className="sticky top-28"
            >
              <PropertyLeadForm propertyName={property.title} />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      <section className="bg-white border-t border-gray-100 py-16 md:py-24">
        <div className="container">
          <Reveal animation="slideUp" className="mb-12 text-center space-y-4">
            <h2 className="text-3xl font-serif text-gray-900">
              {t("details.related.title")}
            </h2>
            <p className="text-tertiary-600 max-w-2xl mx-auto text-lg">
              {t("details.related.subtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.length > 0 ? (
              relatedProperties.map((prop, idx) => (
                <Reveal
                  key={prop.id}
                  animation="slideUp"
                  delay={relatedDelays[idx % 3]}
                >
                  <ContentCard
                    title={prop.title}
                    href={{
                      pathname: "/properties/[slug]",
                      params: { slug: prop.slug },
                    }}
                    image={prop.image}
                    topBadge={prop.topBadge}
                    bottomBadge={prop.bottomBadge}
                    price={formatPrice(prop.price ?? 0)}
                    isLink
                    description={
                      prop.description
                    } /* ЖОДНОГО ХАРДКОДУ, ТІЛЬКИ ОПИС З БАЗИ */
                  />
                </Reveal>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-500">
                {t("details.related.empty")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. НИЖНІЙ CTA */}
      <Cta
        locale={locale}
        namespace="common"
        layout="emailCapture"
        variant="brand"
        className="border-y border-terracotta-600"
        keys={{
          title: "ctaSell.title",
          desc: "ctaSell.desc",
          button: "ctaRow.sendRequestBtn",
          emailPlaceholder: "ctaSell.emailPlaceholder",
          privacyPrefix: "ctaSell.privacyPrefix",
          privacyLink: "ctaSell.privacyLink",
        }}
      />

      <ContactSection locale={locale} />
    </div>
  );
}
