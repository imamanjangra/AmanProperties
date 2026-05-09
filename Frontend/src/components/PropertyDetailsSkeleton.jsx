import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PropertyDetailsSkeleton() {
  return (
    <div className="bg-[#f8f6f2] min-h-screen flex flex-col">
      <Navbar variant="light" />

      <div className="h-20" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8 w-full">
        
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="lg:col-span-2"
        >
          <div className="relative overflow-hidden rounded-3xl bg-[#e7e1d8] h-[420px] md:h-[520px] shadow">

            {/* shimmer */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>

            {/* arrows */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#d6cec2]" />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#d6cec2]" />

            {/* dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-8 h-2 rounded-full bg-[#c9a96b]" />
            </div>
          </div>
        </motion.div>

        {/* RIGHT PROPERTY CARD */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="sticky top-24 h-fit"
        >
          <div className="bg-[#fdf6f0] border border-[#eadfd2] rounded-3xl p-6 shadow-sm">

            <div className="h-8 bg-[#e7e1d8] rounded w-full mb-3" />

            <div className="h-8 bg-[#d8bf8b] rounded w-1/2 mb-8" />

            <div className="h-14 bg-[#c6a46c] rounded-2xl" />
          </div>
        </motion.div>
      </section>

      {/* DETAILS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-10">

            {/* OVERVIEW */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-white rounded-3xl shadow p-6"
            >
              <div className="h-8 w-56 rounded bg-[#e7e1d8] mb-8" />

              <div className="grid sm:grid-cols-2 gap-5">

                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#f5f2ed] rounded-2xl p-5 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#e2d8ca]" />

                    <div className="flex-1">
                      <div className="h-3 w-20 bg-[#ddd4c8] rounded mb-3" />

                      <div className="h-5 w-32 bg-[#cfc4b5] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-white rounded-3xl shadow p-6"
            >
              <div className="h-8 w-44 bg-[#e7e1d8] rounded mb-6" />

              <div className="space-y-4">
                <div className="h-4 rounded bg-[#ece6dd]" />
                <div className="h-4 rounded bg-[#ece6dd]" />
                <div className="h-4 rounded bg-[#ece6dd] w-11/12" />
                <div className="h-4 rounded bg-[#ece6dd] w-9/12" />
              </div>
            </motion.div>
          </div>

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="sticky top-24 h-fit"
          >
            <div className="bg-white rounded-3xl shadow p-6 space-y-5">

              <div className="h-8 w-52 bg-[#e7e1d8] rounded mb-6" />

              <div className="h-12 rounded-xl bg-[#f1ece5]" />

              <div className="h-12 rounded-xl bg-[#f1ece5]" />

              <div className="h-12 rounded-xl bg-[#f1ece5]" />

              <div className="h-12 rounded-xl bg-[#f1ece5]" />

              <div className="h-12 rounded-xl bg-[#c6a46c]" />

              <div className="flex gap-3">
                <div className="flex-1 h-12 rounded-xl bg-[#d7efe0]" />

                <div className="flex-1 h-12 rounded-xl bg-[#d9dee8]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}