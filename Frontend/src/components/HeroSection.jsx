import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* Background Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="
              max-w-3xl
              text-center
              lg:text-left
              mx-auto
              lg:mx-0
            "
          >
            {/* Gold Line (Desktop only) */}
            <div className="hidden lg:block w-20 h-1 bg-[#d4af37] mb-6"></div>

            {/* Heading */}
            <h1 className="font-script text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-snug lg:leading-tight">
              Find Your
              <span className="block lg:inline"> Dream Properties</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-300 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0">
              Exclusive residential & commercial properties designed for modern
              living and timeless comfort.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/properties")}
                className="px-8 py-4 rounded-md bg-[#d4af37] text-black font-semibold hover:bg-[#c19a2e] transition duration-300"
              >
                View Properties
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-4 rounded-md border border-white text-white hover:bg-white hover:text-black transition duration-300"
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-linear-to-t from-black to-transparent"></div>
    </section>
  );
};

export default HeroSection;
