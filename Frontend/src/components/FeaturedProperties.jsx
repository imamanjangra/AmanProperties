import PropertyCard from "./PropertyCard";

const properties = [
  {
    id: 1,
    title: "Luxury Modern Villa",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    beds: 5,
    baths: 4,
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1622015663381-d2e05ae91b72",
  },
  {
    id: 2,
    title: "Premium Penthouse",
    location: "Manhattan, NY",
    price: "$1,950,000",
    beds: 4,
    baths: 3,
    type: "Penthouse",
    image:
      "https://images.unsplash.com/photo-1650838693474-756df587cc0e",
  },
  {
    id: 3,
    title: "Modern Commercial Building",
    location: "Downtown, Miami",
    price: "$5,500,000",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1716827172024-f63110d8e0f2",
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#d4af37]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#d4af37] font-medium">
              Premium Selection
            </span>
          </div>

          <h2 className="text-3xl font-bold text-[#1a2a4e] mb-4">
            Featured Properties
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of luxury properties that define elegance and sophistication
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <button className="bg-[#1a2a4e] text-white px-8 py-3 rounded-lg hover:bg-[#2a3a5e] transition">
            View All Properties
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProperties;
