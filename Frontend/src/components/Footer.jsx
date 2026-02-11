import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="font-nav bg-slate-950 text-slate-400 pt-20 pb-10 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
          {/* Brand */}
          <div>
            <h3 className="font-script text-white text-2xl font-bold mb-4">
              Aman<span className="text-[#c9a24d]"> Properties</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Delivering premium real estate solutions with trust, transparency,
              and personalized service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-[#c9a24d] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="hover:text-[#c9a24d] transition"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#c9a24d] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li>Buy Property</li>
              <li>Sell Property</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c9a24d]" />
                <span>Gharaunda,Haryana,India</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c9a24d]" />
                <span>+91 9255446593</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c9a24d]" />
                <span>Amanpropertie@email.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Amanproperties. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex gap-5">
            <a
              href="https://www.instagram.com/amanproperties_?igsh=OXBkeDY0OWRnZmhw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 hover:text-[#c9a24d] cursor-pointer transition" />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61587652093529&sk=about_details"
              target="_blank"
              rel="noopener noreferrer"
            >
            <Facebook className="w-5 h-5 hover:text-[#c9a24d] cursor-pointer transition" />
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
