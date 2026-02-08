import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-black/50 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        {/* <div className="text-white text-2xl font-bold tracking-wide">
          <img
          src="../public/Amanpropertiesimage-removebg-preview.png"
         className="absolute inset-0 mx-3 mt-1 h-12 w-12 rounded-b-3xl object-cover"
         
          />
        </div> */}
           <h3 className="font-script text-white text-lg lg-text-2xl font-bold">
              Aman<span className="text-[#c9a24d]"> Properties</span>
            </h3>
        {/* Menu */}
        <ul className="flex gap-5 lg-gap-8 text-white ">
          <li><Link to="/" className="font-nav hover:text-blue-400 transition">Home</Link></li>
          <li><Link to="/properties" className="font-nav hover:text-blue-400 transition">Properties</Link></li>
          <li><Link to="/contact" className="font-nav hover:text-blue-400 transition">Contact</Link></li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
