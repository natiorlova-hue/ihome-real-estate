import GridContainer from "@/components/GridContainer";
import ContentCard from "@/components/content/ContentCard";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import { Link } from "@/i18n/routing";
import { getLocalizedText, getRecentPosts } from "@/lib/blog";
import { withLocale, type Locale } from "@/lib/locale-path";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

type JournalSectionProps = {
  locale: Locale;
};

export default async function JournalSection({ locale }: JournalSectionProps) {
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const posts = await getRecentPosts(6);

  return (
    <Section className="bg-white" ariaLabelledby="journal-ihome-heading">
      <Reveal delay="delay-400">
        <div className="mb-10 text-center md:mb-14">
          <h2
            id="journal-ihome-heading"
            className="font-serif text-3xl text-gray-900 md:text-4xl lg:text-5xl"
          >
            {tHome("journalSection.title")}
          </h2>
        </div>
      </Reveal>

      <GridContainer>
        {posts.map(post => {
          const title = getLocalizedText(post.title, locale);
          const description = getLocalizedText(post.description, locale);

          const categoryTitle = post.categories?.[0]?.title
            ? getLocalizedText(post.categories[0].title, locale)
            : undefined;

          const href = withLocale(locale, `blog/${post.slug.current}`);

          const imageUrl = post.image
            ? urlFor(post.image).width(800).height(450).url()
            : "";

          return (
            <ContentCard
              key={post._id}
              title={title}
              subtitle={categoryTitle}
              description={description}
              href={href}
              image={imageUrl}
              imageAlt={post.image?.alt ?? title}
              isLink={true}
              className="h-full"
            />
          );
        })}
      </GridContainer>

      <div className="mt-10 flex justify-end md:mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-tertiary-600 transition-colors hover:text-gray-900"
        >
          {tCommon("viewAll")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
