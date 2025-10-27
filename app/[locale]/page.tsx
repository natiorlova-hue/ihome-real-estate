import BlogPostsGrid from "../../components/blog/BlogPostsGrid";
import { Button } from "../../components/ui/button";
import { getBlogPosts } from "../../lib/blog";

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
      <div className="w-full">
        <div className="h-[29vw] min-w-[194px]">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="iHome Real Estate - Our Story"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <BlogPostsGrid posts={posts} locale={locale} />

      {/* CTA Section */}
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-12">
          <h3>Didn’t find what you’re looking for?</h3>
          <Button size="xl">Contact Us Today</Button>
        </div>
      </div>
    </div>
  );
}
