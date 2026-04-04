import { lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection.jsx";
import SEO from "../components/SEO.jsx";

const FeaturedProperties = lazy(() => import("../components/FeaturedProperties.jsx"));
const Services = lazy(() => import("../components/Services.jsx"));
const Contact = lazy(() => import("../components/Contact.jsx"));

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] dark:bg-slate-950">
      <SEO title="AmanProperties | Real Estate & Properties" description="Find your dream home with AmanProperties. Over 10,000 satisfied clients trust our expert team for buying, selling, and renting real estate." />

      <HeroSection />

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <FeaturedProperties />
        <Services />
        <Contact />
      </Suspense>

    </div>
  );
}