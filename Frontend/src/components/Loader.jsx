import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import API from "../service/Api";

export default function Loader({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const startLoader = async () => {
      try {
        // Wake up backend
        await API.get("/users/wakeup");

        // Keep animation visible for minimum 3.5 seconds
        await new Promise((resolve) => setTimeout(resolve, 3500));

        setExit(true);

        // Wait for exit animation
        setTimeout(() => {
          onFinish();
        }, 900);
      } catch (error) {
        console.log("Wakeup failed:", error);

        // Still continue after timeout so user isn't stuck forever
        setTimeout(() => {
          setExit(true);

          setTimeout(() => {
            onFinish();
          }, 900);
        }, 3500);
      }
    };

    startLoader();
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
      animate={exit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="text-center">
        <AnimatedLogo />

        <p className="mt-4 text-gray-500 tracking-[6px] text-xs">
          BUILDING DREAMS INTO REALITY
        </p>

        <div className="w-56 h-[2px] bg-gray-200 mx-auto mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-[#D4A017]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.2,
              delay: 2.2,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}