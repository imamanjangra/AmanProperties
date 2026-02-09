import HeroSection from "../components/HeroSection";
import FeaturedProperties from "../components/FeaturedProperties";
import Services from "../components/Services";
import Contact from "../components/Contact";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      
      <HeroSection />
      <FeaturedProperties/>
      <Services/> 
      <Contact/> 
    </div>
  );
}
