// "use client";

import FeaturedBlogPosts from "./components/Home/FeaturedBlogPosts";
import HeroSection from "./components/Home/HeroSection";
import NewsLetter from "./components/Home/NewsLetter";
import PopularPosts from "./components/Home/PopularPosts";
import TrendingPosts from "./components/Home/TrendingPosts";

export default function Home() {
  return (
    <div>
       <HeroSection/>
       <FeaturedBlogPosts/>
       <TrendingPosts/>
       <PopularPosts/>
       <NewsLetter />
    </div>
  );
}
