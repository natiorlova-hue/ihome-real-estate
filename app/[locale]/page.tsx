import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/blog";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getBlogPosts();

  // Use locale for future internationalization
  console.log("Current locale:", locale);

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

      {/* Blog Posts Grid */}
      <BlogPostsGrid posts={posts} locale={locale} />

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Spanish Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you find your dream home in Spain. Our expert team is
            here to guide you through every step of the process.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}
