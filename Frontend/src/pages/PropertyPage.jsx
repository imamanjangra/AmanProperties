import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import API from "../service/Api.jsx";
import { motion } from "framer-motion";
import { PropertyCardSkeleton } from "../components/PropertyCardSkeleton.jsx";
import Properties_u from "../components/Properties_u.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import ContactButtons from "../components/ContactButtons.jsx";
import SEO from "../components/SEO.jsx";

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
      <SEO 
        title="Properties | Aman Properties" 
        description="Browse our wide selection of properties for buying, selling, and renting. Find the perfect real estate match for you." 
      />
      <div className="grow">
        <Navbar variant="light" />
        <ContactButtons />
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
          {!loading && properties.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-16 text-center">
              {/* Icon / Illustration */}
              <div className="w-45 h-45 flex items-center justify-center rounded-full bg-[#f1ede6] mb-6 shadow-inner">
                <span className="text-3xl">
                  <img src="/propertysvg.png" alt="No results" className="w-40 h-40" />
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-xl font-semibold text-gray-800">
                No Properties Found
              </h3>

              {/* Sub text */}
              <p className="text-gray-500 mt-2 max-w-md">
                We couldn’t find any properties matching your search. Try
                changing filters or search terms.
              </p>

              {/* Action button */}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setType("");
                  setPrice("");
                }}
                className="mt-6 px-5 py-2 rounded-lg bg-[#d4af37] text-black font-medium hover:bg-[#c19a2e] transition"
              >
                Clear Filters
              </button>
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
