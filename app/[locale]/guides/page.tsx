import Cta from "@/components/Cta";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import ContactSection from "@/components/contact/ContactSection";
import ContentCard from "@/components/content/ContentCard";
import HorizontalArticleCard from "@/components/guides/HorizontalArticleCard";
import Reveal, { type RevealDelay } from "@/components/motion/Reveal";
import { Link } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

type GuidesPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: GuidesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });

  return {
    title: `iHome | ${t("header.title")}`,
    description: t("header.subtitle"),
  };
}

// Переносимо тип локально, щоб зберегти верстку для нижніх секцій
export type ArticleMock = {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

// Мокові дані для верстки
const MOCK_ARTICLES: ArticleMock[] = [
  {
    id: "1",
    categoryKey: "market",
    categoryLabel: "Market News",
    title: "Everything you need to know about buying property in Spain",
    excerpt:
      "A comprehensive guide covering legal requirements, taxes, and the step-by-step process for international buyers.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    slug: "buying-property-in-spain",
  },
  {
    id: "2",
    categoryKey: "lifestyle",
    categoryLabel: "Lifestyle",
    title: "The best international schools on the Costa del Sol",
    excerpt:
      "Discover top-rated educational institutions for expat families relocating to southern Spain.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    slug: "international-schools",
  },
  {
    id: "3",
    categoryKey: "investment",
    categoryLabel: "Investment Guides",
    title: "Maximizing ROI: Short-term vs Long-term rentals",
    excerpt:
      "An analytical deep dive into rental yields across different property types in Marbella and Estepona.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    slug: "maximizing-roi",
  },
  {
    id: "4",
    categoryKey: "market",
    categoryLabel: "Market News",
    title: "Real Estate Market Trends Q1 2024",
    excerpt:
      "Analysis of the latest property price movements and demand shifts in the Mediterranean coast.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    slug: "market-trends-q1-2024",
  },
  {
    id: "5",
    categoryKey: "lifestyle",
    categoryLabel: "Lifestyle",
    title: "Top 5 Emerging Neighborhoods in Estepona",
    excerpt:
      "Explore the up-and-coming areas offering the perfect blend of authentic charm and modern amenities.",
    image:
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=800&auto=format&fit=crop",
    slug: "emerging-neighborhoods-estepona",
  },
  {
    id: "6",
    categoryKey: "buyers",
    categoryLabel: "Buyer's Resources",
    title: "Navigating the Golden Visa process in 2024",
    excerpt:
      "Essential updates and requirements for non-EU investors seeking residency through property acquisition.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    slug: "golden-visa-2024",
  },
];

const storyDelays: RevealDelay[] = ["delay-100", "delay-200", "delay-300"];
const investDelays: RevealDelay[] = ["delay-100", "delay-200", "delay-300"];

export default async function GuidesPage({ params }: GuidesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });

  // Отримуємо реальні статті
  const posts = await getBlogPosts();

  return (
    <div className="bg-white">
      {/* 1. Page Header & Main Featured Article */}
      <section className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-3xl mb-12">
          <Reveal animation="slideDown">
            <p className="text-sm font-medium text-brandBlue-500 mb-4">Blog</p>
          </Reveal>
          <Reveal animation="slideUp">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              {t("header.title")}
            </h1>
          </Reveal>
          <Reveal animation="fadeIn" delay="delay-100">
            <p className="text-lg text-tertiary-600">{t("header.subtitle")}</p>
          </Reveal>
        </div>

        {/* Hero Image Card */}
        <Reveal animation="fadeIn" delay="delay-200">
          <Link
            href={{
              pathname: "/blog/[slug]",
              params: { slug: "guide-to-marbella" },
            }}
            className="group relative block w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=1600&auto=format&fit=crop"
              alt="Guide to Marbella"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3 text-white">
              <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold tracking-wider mb-4 border border-white/20">
                {t("featuredHero.badge")}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif mb-3 leading-tight text-white drop-shadow-sm">
                {t("featuredHero.title")}
              </h2>
              <p className="text-white/90 text-sm md:text-lg mb-4 line-clamp-2 md:line-clamp-none">
                {t("featuredHero.excerpt")}
              </p>
              <p className="text-white/70 text-xs md:text-sm font-medium">
                {t("featuredHero.meta")}
              </p>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* 2. Featured Articles Grid with Tabs (використовуємо реальні пости) */}
      <section className="container pb-16 md:pb-24">
        <Reveal animation="slideUp">
          <h2 className="text-3xl font-serif text-gray-900 mb-8">
            {t("featuredArticles.title")}
          </h2>
        </Reveal>
        <BlogPostsGrid posts={posts} locale={locale} />
      </section>

      {/* 3. Mid CTA */}
      <Cta
        locale={locale}
        namespace="guides"
        layout="simple"
        variant="soft"
        className="border-y border-gray-100"
        keys={{
          title: "notFound.title",
          button: "notFound.button",
        }}
      />

      {/* 4. Guides by Region */}
      <section className="container py-16 md:py-24">
        <Reveal animation="slideUp">
          <h2 className="text-3xl font-serif text-gray-900 mb-10">
            {t("regions.title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal animation="slideUp" delay="delay-100">
            <HorizontalArticleCard
              title="Marbella"
              category="Area Guide"
              excerpt="A luxury lifestyle guide to living in Marbella. Discover the best neighborhoods and amenities."
              image="https://images.unsplash.com/photo-1588616544950-8919630c79f4?q=80&w=600&auto=format&fit=crop"
              href="/guides/marbella"
            />
          </Reveal>
          <Reveal animation="slideUp" delay="delay-200">
            <HorizontalArticleCard
              title="Estepona"
              category="Area Guide"
              excerpt="Explore the new golden mile and traditional charm of this rapidly growing coastal gem."
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop"
              href="/guides/estepona"
            />
          </Reveal>
          <Reveal animation="slideUp" delay="delay-300">
            <HorizontalArticleCard
              title="Mijas Costa"
              category="Area Guide"
              excerpt="Family friendly areas, world-class golf resorts, and beautiful sandy beaches."
              image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop"
              href="/guides/mijas-costa"
            />
          </Reveal>
          <Reveal animation="slideUp" delay="delay-400">
            <HorizontalArticleCard
              title="Sotogrande"
              category="Area Guide"
              excerpt="Exclusive marina living, world-class polo sports, and sophisticated atmosphere."
              image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
              href="/guides/sotogrande"
            />
          </Reveal>
        </div>
      </section>

      {/* 5. Client Stories (Testimonials) */}
      <section className="bg-gray-50 border-y border-gray-100 py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal animation="slideUp">
              <h2 className="text-3xl font-serif text-gray-900 mb-4">
                {t("stories.title")}
              </h2>
            </Reveal>
            <Reveal animation="fadeIn" delay="delay-100">
              <p className="text-tertiary-600">{t("stories.subtitle")}</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The team at iHome made our relocation entirely seamless. Their local knowledge is unmatched, and they truly listened to our needs.",
                author: "Sarah & Mark Davies",
                role: "Relocated from London",
              },
              {
                quote:
                  "We found our dream investment property within two weeks. The ROI projections were accurate and the buying process was transparent.",
                author: "Elena Rodriguez",
                role: "Property Investor",
              },
              {
                quote:
                  "A truly bespoke service. They didn't just sell us a house, they introduced us to the lifestyle, schools, and local community.",
                author: "The Thompson Family",
                role: "New Residents in Estepona",
              },
            ].map((story, i) => (
              <Reveal key={i} animation="slideUp" delay={storyDelays[i]}>
                <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 h-full flex flex-col justify-between">
                  <p className="text-gray-700 italic mb-8 leading-relaxed">
                    {story.quote}
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {story.author}
                    </p>
                    <p className="text-sm text-tertiary-600 mt-1">
                      {story.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Lifestyle & Culture Layout */}
      <section className="container py-16 md:py-24">
        <Reveal animation="slideUp">
          <h2 className="text-3xl font-serif text-gray-900 mb-10">
            {t("lifestyle.title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Left Card */}
          <Reveal
            animation="slideUp"
            delay="delay-100"
            className="lg:col-span-7"
          >
            <ContentCard
              title="Mediterranean Bliss: A Day in the Life on the Costa del Sol"
              subtitle="Lifestyle"
              description="From morning coffee by the sea to sunset dining in the old town, explore what makes everyday life here so special."
              image="https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=1000&auto=format&fit=crop"
              href="/blog/mediterranean-bliss"
              isLink
            />
          </Reveal>

          {/* Two Small Right Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal animation="slideUp" delay="delay-200">
              <HorizontalArticleCard
                title="The Best Golf Courses in Andalusia"
                category="Sports & Leisure"
                excerpt="A comprehensive review of championship courses for enthusiasts of all levels."
                image="https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=600&auto=format&fit=crop"
                href="/blog/best-golf-courses"
              />
            </Reveal>
            <Reveal animation="slideUp" delay="delay-300">
              <HorizontalArticleCard
                title="Michelin Star Dining in Marbella"
                category="Gastronomy"
                excerpt="Discover the culinary masterpieces hidden along the golden mile."
                image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop"
                href="/blog/michelin-dining"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Investment Insights */}
      <section className="container pb-16 md:pb-24">
        <Reveal animation="slideUp">
          <h2 className="text-3xl font-serif text-gray-900 mb-8">
            {t("investment.title")}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
          {MOCK_ARTICLES.filter(
            a => a.categoryKey === "investment" || a.categoryKey === "market"
          )
            .slice(0, 3)
            .map((article, i) => (
              <Reveal
                key={article.id}
                animation="slideUp"
                delay={investDelays[i]}
              >
                <ContentCard
                  title={article.title}
                  subtitle={article.categoryLabel}
                  description={article.excerpt}
                  href={`/blog/${article.slug}`}
                  image={article.image}
                  isLink
                />
              </Reveal>
            ))}
        </div>
      </section>

      {/* 8. Bottom Contact Form */}
      <ContactSection locale={locale} />
    </div>
  );
}
