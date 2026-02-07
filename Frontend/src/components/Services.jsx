import { House, DollarSign, Key, TrendingUp } from "lucide-react";

const services = [
  {
    title: "Buy Property",
    desc: "Find your perfect home from our exclusive portfolio of premium properties",
    icon: House,
  },
  {
    title: "Sell Property",
    desc: "Get the best market value with our expert pricing and marketing strategies",
    icon: DollarSign,
  },
  {
    title: "Rent Property",
    desc: "Discover rental homes that perfectly match your lifestyle and budget",
    icon: Key,
  },
  {
    title: "Investment",
    desc: "Make smart real estate investments with professional market insights",
    icon: TrendingUp,
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-block bg-[#c9a24d]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#c9a24d] font-medium">
              What We Offer
            </span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">
            Comprehensive real estate solutions designed for luxury living
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-slate-100
                           hover:shadow-2xl transition-all duration-300
                           hover:-translate-y-2 group"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl bg-slate-900
                             flex items-center justify-center mb-6
                             group-hover:bg-[#c9a24d] transition-colors"
                >
                  <Icon className="w-8 h-8 text-[#c9a24d] group-hover:text-slate-900" />
                </div>

                <h3 className="text-slate-900 text-lg font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
