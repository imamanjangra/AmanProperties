import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Building2,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
    {
      icon: Facebook,
      link: "https://www.facebook.com/profile.php?id=61588376266858",
    },
    { icon: Instagram, link: "https://www.instagram.com/amanproperties_/" },
  ];
  return (
    <footer className="bg-linear-to-br from-[#f5f2ed] via-white to-[#f5f2ed] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {/* BRAND */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold">
                Aman{" "}
                <span className="bg-gradient-to-r from-[#c6a46c] to-[#b8955a] bg-clip-text text-transparent">
                  Properties
                </span>
              </h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. Making
              dreams come true.
            </p>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="font-semibold mb-5 text-gray-900">Quick Links</h3>

            <ul className="space-y-3">
              {[
                { name: "Home", link: "/" },
                { name: "Properties", link: "/properties" },
                { name: "Contact", link: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.link}
                    className="text-gray-600 text-sm hover:text-[#c6a46c] transition-all"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="font-semibold mb-5 text-gray-900">Services</h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>Buy Property</li>
              <li>Sell Property</li>
              <li>Rent Property</li>
              <li>Investment</li>
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="font-semibold mb-5 text-gray-900">Contact</h3>

            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c6a46c]" />
                AmanPropertie@email.com
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c6a46c]" />
                +91 9255446593
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c6a46c]" />
                Haryana, India
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* BOTTOM */}
        {/* BOTTOM */}
        <motion.div
          className="mt-14 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-sm text-gray-500">
              © 2026 Aman Properties. All rights reserved.
            </p>

            {/* LEGAL LINKS ADDED HERE */}
            <div className="flex gap-6">
              <Link
                to="/term-and-condition"
                className="text-xs text-gray-400 hover:text-[#c6a46c] transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy-policy"
                className="text-xs text-gray-400 hover:text-[#c6a46c] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-[#c6a46c] hover:to-[#b8955a] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
