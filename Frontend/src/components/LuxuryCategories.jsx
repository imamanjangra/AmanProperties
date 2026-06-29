import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Luxury Houses",
    subtitle: "Elegant homes designed for modern families.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
     link: "/properties?type=Home",
  },
  {
    title: "Modern Apartments",
    subtitle:
      "Premium apartments in the city's best locations.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    link: "/properties?type=Floor",
  },
  {
    title: "Exclusive Commercial",
    subtitle:
      "Prime commercial spaces built for business growth.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    link: "/properties?type=Plot",
  },
];

export default function LuxuryCategories() {
  return (
    <section className="py-14 sm:py-16 lg:py-24 bg-[#f8f6f2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <p className="text-[#c9a24d] uppercase tracking-[4px] sm:tracking-[6px] text-xs sm:text-sm mb-2 sm:mb-3">
            Explore
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Discover Your Space
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Find the perfect property that matches your
            lifestyle and investment goals.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">

          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -10,
              }}
              className="
                group
                relative
                h-[320px]
                sm:h-[420px]
                lg:h-[650px]
                rounded-[20px]
                lg:rounded-[32px]
                overflow-hidden
                cursor-pointer
                shadow-lg
                lg:shadow-xl
              "
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/25
                  to-transparent
                "
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8 text-white">

                <h3 className="
                  text-2xl
                  sm:text-2xl
                  lg:text-4xl
                  font-bold
                  leading-tight
                ">
                  {category.title}
                </h3>

                <p className="
                  text-gray-300
                  mt-2
                  sm:mt-3
                  text-xs
                  sm:text-sm
                  lg:text-lg
                  line-clamp-2
                ">
                  {category.subtitle}
                </p>

                <Link
                  to={category.link}
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    lg:gap-3
                    text-[#c9a24d]
                    font-semibold
                    text-sm
                    sm:text-sm
                    lg:text-base
                    group-hover:gap-5
                    transition-all
                  "
                >
                  Explore Collection
                  <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </Link>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}