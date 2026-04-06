import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Building2, Phone, PlusCircle, Menu, X } from "lucide-react";
import API from "../service/Api";

const Navbar = ({ variant = "dark" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/users/userdata");
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "text-white";

  const bgStyle = scrolled
    ? "bg-black/60 backdrop-blur-md shadow-lg"
    : variant === "dark"
    ? "bg-transparent"
    : "bg-black/55";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgStyle}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/home">
          <h3 className={`font-bold text-xl lg:text-2xl ${textColor}`}>
            <span>Aman </span>
            <span className="text-[#c6a46c]">Properties</span>
          </h3>
        </Link>

        {/* DESKTOP MENU */}
        <ul className={`hidden md:flex items-center gap-8 ${textColor}`}>
          <li>
            <Link to="/properties" className="flex items-center gap-2 hover:text-[#c6a46c]">
              <Building2 size={18} />
              Properties
            </Link>
          </li>

          <li>
            <Link to="/addproperty" className="flex items-center gap-2 hover:text-[#c6a46c]">
              <PlusCircle size={18} />
              Add Property
            </Link>
          </li>

          <li>
            <Link to="/contact" className="flex items-center gap-2 hover:text-[#c6a46c]">
              <Phone size={18} />
              Contact
            </Link>
          </li>
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">

        {/* PROFILE */}
          <Link to="/profile">
            {user?.image ? (
              <img
                src={user.image.replace("http://", "https://")}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-[#c6a46c] object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#c6a46c] bg-gray-800 text-white font-bold uppercase">
                {user?.firstname?.[0] || "U"}
              </div>
            )}
          </Link>
          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden px-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md transition-all duration-300 ${
          menuOpen ? "max-h-96 py-6" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-white text-lg">

          <li>
            <Link to="/properties" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-[#c6a46c]">
              <Building2 size={20} />
              Properties
            </Link>
          </li>

          <li>
            <Link to="/addproperty" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-[#c6a46c]">
              <PlusCircle size={20} />
              Add Property
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-[#c6a46c]">
              <Phone size={20} />
              Contact
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;