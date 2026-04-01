import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  DollarSign,
  Key,
  TrendingUp,
  ArrowRight,
  Shield,
  Award,
  Users,
  Mail,
  Building2,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const features = [
  {
    title: "Buy",
    desc: "Find your dream home",
    icon: Home,
    gradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Sell",
    desc: "List your property",
    icon: DollarSign,
    gradient: "from-green-400 to-green-600",
  },
  {
    title: "Rent",
    desc: "Rent a property",
    icon: Key,
    gradient: "from-purple-400 to-purple-600",
  },
  {
    title: "Investment",
    desc: "Invest wisely",
    icon: TrendingUp,
    gradient: "from-[#c6a46c] to-[#b8955a]",
  },
];

// const container = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.12 },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

const benefits = [
  {
    title: "Trusted Service",
    desc: "Over 10,000 satisfied clients trust us.",
    icon: Shield,
  },
  { title: "Award Winning", desc: "Recognized industry leader.", icon: Award },
  {
    title: "Expert Team",
    desc: "Professional agents with experience.",
    icon: Users,
  },
];

const aboutData = [
  { title: "Our Mission", desc: "Make real estate seamless." },
  { title: "Our Vision", desc: "Become the most trusted brand." },
  { title: "Our Values", desc: "Integrity, transparency, excellence." },
];

const services = [
  {
    title: "Property Buying",
    img: "./public/image-1.jfif",
  },
  {
    title: "Property Selling",
    img: "./public/image-2.jfif",
  },
  {
    title: "Property Rental",
    img: "./public/image-3.jfif",
  },
  {
    title: "Investment",
    img: "./public/image-4.jfif",
  },
];

/* ---------------- ANIMATION ---------------- */

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

 const socialLinks = [
  { icon: Facebook, link: "https://www.facebook.com/profile.php?id=61588376266858" },
  { icon: Instagram, link: "https://www.instagram.com/amanproperties_/" },
];

/* ---------------- COMPONENT ---------------- */

export default function Landingpage2() {
  const navigate = useNavigate();
  return (
    <div className="font-sans">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h3 className="font-bold text-xl">
            Aman <span className="text-[#c6a46c]">Properties</span>
          </h3>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-[#c6a46c] text-white rounded-lg hover:scale-105 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 bg-linear-to-br from-[#f8f6f2] to-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6 items-center">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.h1
              variants={item}
              className="text-6xl font-bold leading-tight"
            >
              A Dream For You{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#c6a46c] to-[#b8955a]">
                Service For Us
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-gray-600 text-lg">
              Helping you achieve property goals with precision and trust.
            </motion.p>

            <motion.div variants={item} className="flex gap-4 mt-6">
              <Link to="/properties" className="px-6 py-3 bg-[#c6a46c] text-white rounded-xl flex items-center gap-2 hover:scale-105 transition">
                Explore <ArrowRight />
              </Link>
              <Link to="/signup" className="px-6 py-3 border rounded-xl hover:bg-gray-100">
                Sign Up
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <video
              className="w-full h-100 object-cover"
              autoPlay
              muted
              loop
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <motion.div
          className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -10 }}
                className="p-6 rounded-2xl bg-white shadow hover:shadow-2xl "
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-linear-to-br ${f.gradient} flex items-center justify-center mb-4`}
                >
                  <Icon className="text-white" />
                </div>
                <h3 className="font-semibold text-xl">{f.title}</h3>
                <p className="text-gray-500">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-[#f8f6f2]">
        <motion.div
          className="max-w-7xl mx-auto px-6 text-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2 variants={item} className="text-4xl font-bold mb-10">
            About Us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {aboutData.map((a, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <h3 className="text-xl font-semibold text-[#c6a46c]">
                  {a.title}
                </h3>
                <p className="text-gray-600 mt-2">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

          <section className="py-20 bg-gradient-to-br from-[#f5f2ed] via-white to-[#f5f2ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose Us
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide exceptional service backed by expertise and commitment.
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-md hover:shadow-2xl transition-all"
              >
                {/* ICON */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#c6a46c] to-[#b8955a] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>

      {/* SERVICES */}
      <section className="py-20">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2
            variants={item}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Services
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={item}
                className="relative rounded-2xl overflow-hidden group"
              >
                <img
                  src={s.img}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                  <h3 className="text-white text-2xl font-bold">{s.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section className="py-20 bg-linear-to-r from-[#c6a46c] to-[#b8955a] text-center">
        <motion.div variants={container} initial="hidden" whileInView="visible">
          <motion.div variants={item}>
            <Mail className="mx-auto text-white w-16 h-16 mb-4" />
          </motion.div>

          <motion.h2 variants={item} className="text-4xl font-bold text-white">
            Get In Touch
          </motion.h2>

          <motion.p variants={item} className="text-white/90 mt-4">
            Let’s help you find your dream property.
          </motion.p>

          <motion.div variants={item} className="mt-6">
            <Link to="/login" className="bg-white text-[#c6a46c] px-6 py-3 rounded-xl hover:scale-105 transition inline-flex items-center gap-2">
              Get Started <ArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </section>

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
             <motion.div
               className="mt-14 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6"
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
             >
               <p className="text-sm text-gray-500">
                 © 2026 Aman Properties. All rights reserved.
               </p>
     
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
    </div>
  );
}

