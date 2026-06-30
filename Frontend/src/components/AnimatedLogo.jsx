import { motion } from "framer-motion";

const paths = [
  // Left side buildings
  { d: "M120 320V180", color: "#111", width: 2 },
  { d: "M145 320V145", color: "#111", width: 2 },
  { d: "M170 320V120", color: "#111", width: 2 },
  { d: "M195 320V145", color: "#111", width: 2 },
  { d: "M220 320V170", color: "#111", width: 2 },

  // Golden A
  { d: "M130 320V140", color: "#D4A017", width: 5 },
  { d: "M130 140L190 90", color: "#D4A017", width: 5 },
  { d: "M190 90L250 140", color: "#D4A017", width: 5 },
  { d: "M250 140V320", color: "#D4A017", width: 5 },

  // Center towers
  { d: "M260 320V80", color: "#111", width: 2 },
  { d: "M280 320V60", color: "#111", width: 2 },
  { d: "M300 320V40", color: "#111", width: 2 },
  { d: "M320 320V60", color: "#111", width: 2 },
  { d: "M340 320V90", color: "#111", width: 2 },

  // Golden P
   { d: "M370 320V140", color: "#D4A017", width: 5 },
  { d: "M370 140L430 80", color: "#D4A017", width: 5 },
  { d: "M430 80L490 140", color: "#D4A017", width: 5 },
  { d: "M490 140V320", color: "#D4A017", width: 5 },

  // Right buildings
  { d: "M390 320V180", color: "#111", width: 2 },
  { d: "M420 320V220", color: "#111", width: 2 },
  { d: "M450 320V250", color: "#111", width: 2 },

  // Ground lines
  { d: "M40 320L170 280", color: "#111", width: 1.5 },
  { d: "M300 260L520 320", color: "#111", width: 1.5 },
];

export default function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 560 430"
        className="w-[350px] h-[260px]"
      >
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={path.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.12,
            }}
          />
        ))}
      </svg>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.5,
          duration: 0.8,
        }}
        className="
          text-5xl
          font-light
          tracking-wide
          text-black
          mt-2
        "
      >
        Aman Properties
      </motion.h1>
    </div>
  );
}   