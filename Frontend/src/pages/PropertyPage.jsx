import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import API from "../service/Api";
import { motion } from "framer-motion";
import Contact from "../components/Contact";
import { PropertyCardSkeleton } from "../components/PropertyCardSkeleton";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/properties");
      setProperties(data);
    } catch (error) {
      console.log("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[40vh] relative"
      >
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
          alt="Luxury Properties"
          className="w-full h-full rounded-b-3xl object-cover"
        />
        <div className="absolute inset-0 bg-black/55 flex items-center rounded-b-3xl">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="font-script text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
              Explore Premium Properties
            </h1>
            <p className="max-w-2xl text-lg text-gray-200">
              Discover luxury homes, apartments, and villas tailored to your
              lifestyle.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Property Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-script text-2xl font-semibold text-[#1a2a4e]">
            Available Properties
          </h2>

         
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500"><PropertyCardSkeleton/></div>
        )}

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={{
                id: property._id,
                title: property.propertyName,
                location: property.location,
                price: `₹${property.price}`,
                type: property.propertyType,
                image: property.images?.[0]?.url,
                beds: property.Bedroom,
                baths: property.Bathroom,
                size: property.size,
              }}
            />
          ))}
        </div>
      </motion.div>

      <Contact/>
    </div>
  );
};

export default PropertyPage;
