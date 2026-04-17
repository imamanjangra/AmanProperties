import { lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection.jsx";
import SEO from "../components/SEO.jsx";

const FeaturedProperties = lazy(() => import("../components/FeaturedProperties.jsx"));
const Services = lazy(() => import("../components/Services.jsx"));
const Contact = lazy(() => import("../components/Contact.jsx"));

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] dark:bg-slate-950">
      <SEO title="Amam Properties:Real Estate | Buy, Sell & Rent Properties in Haryana,India | Verified Real Estate Listings" description="Explore verified properties in Haryana, India. Buy, sell or rent residential and commercial properties with trusted real estate services from AmanProperties." />

      <HeroSection />

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <FeaturedProperties />
        <Services />
        <Contact />
      </Suspense>

    </div>
  );
}