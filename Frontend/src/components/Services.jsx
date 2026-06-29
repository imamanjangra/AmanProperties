import { House, DollarSign, Key, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Property Buying",
    img: "https://i.pinimg.com/736x/dd/4a/56/dd4a56adbc1b2e7257f185638c483c4c.jpg",
  },
  {
    title: "Property Selling",
    img: "https://images.unsplash.com/photo-1723110994499-df46435aa4b3",
  },
  {
    title: "Property Rental",
    img: "https://images.unsplash.com/photo-1762732793012-8bdab3af00b4",
  },
  {
    title: "Investment",
    img: "https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-linear-to-br from-[#f8f6f2] to-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our Services</h2>
        </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                
                className="relative rounded-2xl overflow-hidden group"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                  <h3 className="text-white text-2xl font-bold">{s.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

      </div>
    </section>
  );
}
