import HeroSection from "../components/HeroSection.jsx";
import FeaturedProperties from "../components/FeaturedProperties.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/Contact.jsx";


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
