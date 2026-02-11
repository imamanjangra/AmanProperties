import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactBox from "./ContactBox.jsx";

export default function FloatingContactCard() {
  const [show, setShow] = useState(false);

  // show after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="
    fixed z-50
    bottom-14 left-0 right-0
    w-full
    bg-white dark:bg-slate-900
    shadow-2xl
    rounded-t-2xl
    p-6

    md:bottom-18 md:right-4 md:left-auto
    md:w-95
    md:rounded-2xl
  "
        >
          {/* Close Button */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>

          <h3 className="text-xl font-semibold text-[#1a2a4e] mb-4">
            Contact Us
          </h3>

          <ContactBox />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
