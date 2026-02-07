import PropertyCard from "../components/PropertyCard";

const properties = [
  {
    id: 1,
    title: "Luxury Villa in Gurgaon",
    location: "Gurgaon, Haryana",
    price: "₹2.5 Cr",
    beds: 4,
    baths: 3,
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "Noida, UP",
    price: "₹85 Lakh",
    beds: 3,
    baths: 2,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 3,
    title: "Independent House",
    location: "Delhi",
    price: "₹1.8 Cr",
    beds: 5,
    baths: 4,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
  },
];

const PropertyPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
     <section className="w-full h-[40vh] relative">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
          alt="Luxury Properties"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Explore Premium Properties
            </h1>
            <p className="max-w-2xl text-lg text-gray-200">
              Discover luxury homes, apartments, and villas tailored to your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Property Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Section Title */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold text-[#1a2a4e]">
            Available Properties
          </h2>

          <select className="border rounded-lg px-4 py-2 text-gray-600">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
