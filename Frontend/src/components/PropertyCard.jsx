import { MapPin, Bed, Bath , Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {

  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 right-4 bg-[#d4af37] text-[#1a2a4e] px-3 py-1 rounded-full text-sm font-medium">
          {property.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-script text-[#1a2a4e] text-xl font-semibold mb-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{property.location}</span>
        </div>

        {/* Details */}
        {(property.beds || property.baths || property.size) && (
  <div className="flex items-center gap-4 mb-4 text-gray-600 flex-wrap">
    
    {property.beds && (
      <div className="flex items-center gap-1">
        <Bed className="w-4 h-4" />
        <span>{property.beds} Beds</span>
      </div>
    )}

    {property.baths && (
      <div className="flex items-center gap-1">
        <Bath className="w-4 h-4" />
        <span>{property.baths} Baths</span>
      </div>
    )}

    {property.size && (
      <div className="flex items-center gap-1">
        <Ruler className="w-4 h-4" />
        <span>{property.size} Sq Ft</span>
      </div>
    )}

  </div>
)}


        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-[#d4af37] font-semibold">
            {property.price}
          </p>

          <button onClick={() => navigate(`/properties/${property.id}`)} className="bg-[#1a2a4e] font-nav text-white px-4 py-2 rounded-lg hover:bg-[#2a3a5e] transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
