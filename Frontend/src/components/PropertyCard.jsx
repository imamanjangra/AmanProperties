import { MapPin, Bed, Bath, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/properties/${property.id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden 
                 border border-gray-200 
                 hover:border-[#c6a46c] 
                 shadow-md hover:shadow-2xl 
                 transition-all duration-300 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover 
                     transition-transform duration-500 
                     group-hover:scale-110"
        />

        {/* TYPE BADGE */}
        <div className="absolute top-4 right-4 px-4 py-1.5 
                        bg-[#c6a46c] text-white 
                        rounded-full text-sm font-medium shadow-lg">
          {property.type}
        </div>

        {/* FEATURED BADGE */}
        {property.featured && (
          <div className="absolute top-4 left-4 px-4 py-1.5 
                          bg-[#1a2a4e] text-white 
                          rounded-full text-sm font-medium shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* TITLE */}
        <h3 className="text-xl font-semibold mb-2 
                       text-[#1a2a4e] 
                       transition-colors 
                       group-hover:text-[#c6a46c]">
          {property.title}
        </h3>

        {/* LOCATION */}
        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {property.location}
        </p>

        {/* DETAILS */}
        {(property.beds || property.baths || property.size) && (
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 flex-wrap">
            {property.beds && (
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                {property.beds} Beds
              </span>
            )}

            {property.baths && (
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                {property.baths} Baths
              </span>
            )}

            {property.size && (
              <span className="flex items-center gap-1">
                <Ruler className="w-4 h-4" />
                {property.size} sqft
              </span>
            )}
          </div>
        )}

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-2xl font-bold text-[#c6a46c]">
            {property.price}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/properties/${property.id}`);
            }}
            className="text-sm text-[#c6a46c] hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;