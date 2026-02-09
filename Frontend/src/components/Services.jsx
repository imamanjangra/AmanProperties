import { House, DollarSign, Key, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { title: "Buy Property", desc: "Find your perfect home", icon: House },
  { title: "Sell Property", desc: "Get best market value", icon: DollarSign },
  { title: "Rent Property", desc: "Homes for every lifestyle", icon: Key },
  { title: "Investment", desc: "Smart real estate investments", icon: TrendingUp },
];

export default function Services() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-script text-3xl font-bold">Our Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl"
              >
                <Icon className="w-10 h-10 text-[#c9a24d] mb-4" />
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
