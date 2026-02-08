import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navlink = useNavigate();

  return (
    <section className="relative h-[75vh] w-full overflow-hidden">
      
      {/* Background Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover rounded-b-3xl"
      />

      <div className="absolute inset-0 bg-black/55 rounded-b-3xl"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-lg"
          >
            <h1 className="font-script text-3xl md:text-4xl font-bold text-white">
              Find Your Dream Property
            </h1>

            <p className="mt-4 text-gray-200">
              Premium residential and commercial properties with trusted experts.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navlink("/properties")}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Explore Properties
              </button>

              <button
                onClick={() => navlink("/contact")}
                className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
              >
                Contact
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
