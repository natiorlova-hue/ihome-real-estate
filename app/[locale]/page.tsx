import dynamic from "next/dynamic";
import Categories from "../../components/home/Categories";
import RecentProperties from "../../components/RecentProperties";
import { Button } from "../../components/ui/button";
import { getBlogPosts } from "../../lib/blog";

const BlogPostsGrid = dynamic(
  () => import("../../components/blog/BlogPostsGrid"),
  {
    ssr: true,
  }
);

const LazyVideo = dynamic(() => import("../../components/home/LazyVideo"), {
  ssr: true,
});

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getBlogPosts();

  return (
    <div>
      {/* Hero Section */}
      <div className="container">
        <div className="py-20 gap-12 flex flex-col text-center md:text-left">
          <h1 className="leading-[1.1]">
            We{" "}
            <u className="decoration-terracotta-200 decoration-5">
              create spaces
            </u>
            <br />
            that make life more beautiful
          </h1>
          <p>
            iHome is a boutique real estate agency helping clients from the CIS
            find, buy, and design homes in Spain.
            <br />
            We combine aesthetics, comfort, and investment value.
          </p>
          <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
            <Button size="lg">Explore homes</Button>
            <Button variant="outline" size="lg">
              Book a consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <LazyVideo
        src="/oceans.mp4"
        title="iHome Real Estate - Our Story"
        poster="/video-placeholder.jpg"
      />

      {/* Categories */}
      <Categories locale={locale} />

      {/* CTA Section */}
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-12">
          <h3>Didn’t find what you’re looking for?</h3>
          <Button size="xl">Contact Us Today</Button>
        </div>
      </div>

      {/* Recent Properties */}
      <RecentProperties
        title="Live your way on the Costa del Sol."
        description="Curated selection of homes carefully chosen by iHome experts for quality, location, and ROI."
      />
    </div>
  );
}
