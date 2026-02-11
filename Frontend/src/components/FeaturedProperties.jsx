import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard.jsx";
import API from "../service/Api.jsx";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton.jsx";
// import PropertyCardSkeleton from "./PropertyCardSkeleton";

const FeaturedProperties = () => {
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

       
        <div className="text-center mb-12">
          <div className=" inline-block bg-[#d4af37]/10 px-4 py-2 rounded-full mb-4">
            <span className="  text-[#d4af37] font-medium">
              Premium Selection
            </span>
          </div>  

          <h2 className=" font-script text-3xl font-bold text-[#1a2a4e] mb-4">
            Featured Properties
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of luxury properties that define elegance and sophistication
          </p>
        </div>

        
        {loading && (
          <div className="text-center text-gray-500"><PropertyCardSkeleton/></div>
        )}

       
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property) => (
            <PropertyCard
              key={property._id}
              property={{
                id: property._id,
                title: property.propertyName,
                location: property.location,
                price: `₹${property.price}`,
                type: property.propertyType,
                image: property.images?.[0]?.url, 
                beds : property.Bedroom,
                baths : property.Bathroom,
                size :  property.size,
              }}
            />
          ))}
        </div>

        
        <div className="text-center mt-12">
          <Link to="/properties">
            <button className="bg-[#1a2a4e] font-nav text-white px-8 py-3 rounded-lg hover:bg-[#2a3a5e] transition">
              View All Properties
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProperties;
