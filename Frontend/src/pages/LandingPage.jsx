import React from "react";
import { House, DollarSign, Key, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <h3 className="font-bold font-script text-xl">
              Aman <span className="text-[#c9a24d]">Properties</span>
            </h3>
          </Link>

          <div className="flex items-center gap-6">

            <Link
              to="/login"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-[#c9a24d] text-white rounded-md hover:bg-[#b8933f] transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-38 pb-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl font-script lg:text-6xl font-bold leading-tight">
              Sell Your Property
              <span className="block font-script text-[#c9a24d]">Faster & Smarter</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              List your property with Aman Properties and reach genuine buyers quickly.
              Get the best value with zero hassle.
            </p>

            <div className="mt-10 flex gap-5">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 bg-[#c9a24d] text-white rounded-md font-semibold hover:bg-[#b8933f]"
              >
                Add Property
              </button>

              <button
                onClick={() => navigate("/properties")}
                className="px-8 py-4 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Browse Listings
              </button>
            </div>
          </motion.div>

          {/* Right Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <video
              className="w-full h-[400px] object-cover"
              autoPlay
              muted
              loop
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>


     
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Everything you need to buy, sell, rent, or invest — all in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Buy Property", desc: "Find your perfect home", icon: House },
              { title: "Sell Property", desc: "Get best market value", icon: DollarSign },
              { title: "Rent Property", desc: "Homes for every lifestyle", icon: Key },
              { title: "Investment", desc: "Smart real estate investments", icon: TrendingUp },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#c9a24d]/10 mb-5 group-hover:bg-[#c9a24d]/20 transition">
                    <Icon className="w-7 h-7 text-[#c9a24d]" />
                  </div>

                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold">Ready to Sell Your Property?</h2>
        <p className="text-gray-500 mt-4">
          Create an account and start listing today.
        </p>

        <div className="mt-8 flex justify-center gap-5">
          <Link
            to="/signup"
            className="px-8 py-4 bg-[#c9a24d] text-white rounded-md font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border border-gray-300 rounded-md"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 Aman Properties. All rights reserved.
      </footer>
    </div>
  );
}
