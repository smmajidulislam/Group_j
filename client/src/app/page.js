// "use client";

import FeaturedBlogPosts from "./components/Home/FeaturedBlogPosts";
import HeroSection from "./components/Home/HeroSection";
import NewsLetter from "./components/Home/NewsLetter";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedBlogPosts />
      <NewsLetter />
    </div>
  );
}
