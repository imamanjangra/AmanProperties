import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import API from "../service/Api.jsx";
import { motion } from "framer-motion";
import { PropertyCardSkeleton } from "../components/PropertyCardSkeleton.jsx";
import Properties_u from "../components/Properties_u.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(""); 

  // 🔥 FETCH FUNCTION
  const fetchProperties = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (searchQuery) params.append("query", searchQuery);
      if (type) params.append("type", type);
      if (price) params.append("price", price);

      const url = `/properties/searchProperties?${params.toString()}`;

      const { data } = await API.get(url);

      setProperties(data);
    } catch (error) {
      console.log("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchProperties();
  }, []);

  // 🔥 SEARCH WITH DEBOUNCE
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProperties(searchQuery);
    }, 500); // debounce

    return () => clearTimeout(delay);
  }, [searchQuery, type, price]);

  return (
    <div className="bg-[#f8f6f2] min-h-screen flex flex-col">
      <div className="grow">
        <Navbar variant="light" />

        <div className="h-20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 pt-10 pb-16"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h2 className=" text-2xl md:text-3xl font-semibold text-[#1a2a4e]">
              Available Properties
            </h2>
          </div>

          {/* 🔥 FILTER COMPONENT */}
          <Properties_u
            onSearch={setSearchQuery}
            onTypeChange={setType}
            onPriceChange={setPrice}
          />

          {/* LOADING */}
          {loading && (
            <div className="mt-6">
              <PropertyCardSkeleton />
            </div>
          )}

          {/* PROPERTY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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
      </div>

      <Footer />
    </div>
  );
};

export default PropertyPage;
