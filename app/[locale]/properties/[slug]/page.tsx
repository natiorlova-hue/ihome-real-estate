import Badge from "@/components/Badge";
import ContactSection from "@/components/contact/ContactSection";
import ContentCard, { type CardBadge } from "@/components/content/ContentCard";
import Cta from "@/components/Cta";
import Reveal from "@/components/motion/Reveal";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyLeadForm from "@/components/properties/PropertyLeadForm";
import { Link } from "@/i18n/routing";
import { type Locale } from "@/lib/locale-path";
import {
  getFeaturedProperties,
  type PropertyBadgeData,
} from "@/lib/properties";
import { formatPrice } from "@/lib/utils";
import { Bath, BedDouble, ChevronLeft, MapPin, Square } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type PropertyDetailsPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

// Хелпер для бейджів, як на сторінці-каталозі
const formatBadge = (badge?: PropertyBadgeData): CardBadge | undefined => {
  if (!badge) return undefined;
  switch (badge.type) {
    case "roi":
      return { text: `ROI ${badge.value}%`, variant: badge.variant };
    case "new":
      return { text: "New", variant: badge.variant };
    case "featured":
      return { text: "Featured", variant: badge.variant };
    case "area":
      return { text: `${badge.value} m²`, variant: badge.variant };
    default:
      return undefined;
  }
};

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });

  // В майбутньому тут буде await getPropertyBySlug(slug) з Sanity.
  // Поки мокаємо дані, щоб вони відповідали дизайну.
  const mockProperty = {
    id: "p1",
    slug,
    title: slug
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    location: "Marbella, Andalusia",
    price: 2500000,
    description:
      "Immerse yourself in the atmosphere of exceptional comfort and luxury in this Mediterranean villa. Natural light creates a sense of freedom and harmony. The open spaces are ideal for family gatherings and entertaining, while the floor-to-ceiling panoramic windows blur the boundary between the interior and the surrounding landscape.",
    features: {
      type: "Villa",
      size: 450,
      bedrooms: 4,
      bathrooms: 4,
      terrace: 120,
      yearBuilt: 2018,
    },
    images: [
      "/images-property/marbella-hillside-villa.png",
      "/images-property/sunset-infinity-villa.png",
      "/images-property/sunset-infinity-villa-new.png",
      "/images-property/marbella-hillside-villa.png", // extra for +1 indicator
    ],
    badges: {
      top: { type: "roi", value: 6.3, variant: "pink" } as PropertyBadgeData,
    },
  };

  // Отримуємо схожі об'єкти
  const allProperties = await getFeaturedProperties();
  const relatedProperties = allProperties.slice(0, 3);

  if (!mockProperty) notFound();

  return (
    <div className="bg-white">
      <div className="container pt-6 pb-16 md:pt-10 md:pb-24">
        {/* Back Link / Breadcrumbs */}
        <Reveal animation="slideDown">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-brandBlue-500 hover:text-brandBlue-600 transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Properties
          </Link>
        </Reveal>

        {/* Gallery */}
        <Reveal animation="fadeIn" delay="delay-100">
          <PropertyGallery
            images={mockProperty.images}
            title={mockProperty.title}
          />
        </Reveal>

        {/* Layout Grid */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:mt-16">
          {/* Left Column (Content) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header Info */}
            <Reveal animation="slideUp" className="space-y-5">
              {mockProperty.badges.top.type === "roi" && (
                <Badge
                  variant={mockProperty.badges.top.variant}
                  text={`ROI ${mockProperty.badges.top.value}%`}
                />
              )}

              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                {mockProperty.title}
              </h1>

              <p className="flex items-center gap-2 text-tertiary-600 text-lg">
                <MapPin className="h-5 w-5" /> {mockProperty.location}
              </p>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                  <BedDouble className="h-4 w-4" />{" "}
                  {mockProperty.features.bedrooms} Bedrooms
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                  <Bath className="h-4 w-4" /> {mockProperty.features.bathrooms}{" "}
                  Bathrooms
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                  <Square className="h-4 w-4" /> {mockProperty.features.size} m²
                </div>
              </div>
            </Reveal>

            {/* Description & Price */}
            <Reveal animation="fadeIn" className="space-y-6">
              <h2 className="text-2xl font-sans font-semibold text-gray-900">
                {t("details.descriptionTitle")}
              </h2>
              <div className="prose prose-gray max-w-none text-tertiary-600 leading-relaxed text-lg">
                <p>{mockProperty.description}</p>
                <p>
                  Enjoy panoramic sea views and proximity to all local
                  amenities, curated directly by iHome&apos;s team of
                  Mediterranean experts to ensure an impeccable investment or a
                  perfect forever home.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-3xl font-serif font-semibold text-gray-900">
                  {formatPrice(mockProperty.price)}
                </p>
              </div>
            </Reveal>

            {/* Features Grid */}
            <Reveal
              animation="fadeIn"
              className="space-y-6 pt-8 border-t border-gray-200"
            >
              <h2 className="text-2xl font-sans font-semibold text-gray-900">
                {t("details.featuresTitle")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    label: t("details.features.type"),
                    value: mockProperty.features.type,
                  },
                  {
                    label: t("details.features.size"),
                    value: `${mockProperty.features.size} m²`,
                  },
                  {
                    label: t("details.features.bedrooms"),
                    value: mockProperty.features.bedrooms,
                  },
                  {
                    label: t("details.features.bathrooms"),
                    value: mockProperty.features.bathrooms,
                  },
                  {
                    label: t("details.features.terrace"),
                    value: `${mockProperty.features.terrace} m²`,
                  },
                  {
                    label: t("details.features.yearBuilt"),
                    value: mockProperty.features.yearBuilt,
                  },
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

          {/* Right Column (Sticky Form Sidebar) */}
          <div className="lg:col-span-4">
            <Reveal
              animation="slideUp"
              delay="delay-200"
              className="sticky top-28"
            >
              <PropertyLeadForm propertyName={mockProperty.title} />
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
            {relatedProperties.map((property, idx) => (
              <Reveal
                key={property.id}
                animation="slideUp"
                delay={`delay-${(idx + 1) * 100}` as any}
              >
                <ContentCard
                  title={property.slug
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  href={`/properties/${property.slug}`}
                  image={property.image}
                  topBadge={formatBadge(property.topBadge)}
                  bottomBadge={formatBadge(property.bottomBadge)}
                  price={
                    property.price ? formatPrice(property.price) : undefined
                  }
                  isLink
                  description={`${property.beds} Beds • ${property.baths} Baths • Exceptional location.`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Want to sell your property CTA */}
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

      {/* Let's talk about your next home */}
      <ContactSection locale={locale} />
    </div>
  );
}
