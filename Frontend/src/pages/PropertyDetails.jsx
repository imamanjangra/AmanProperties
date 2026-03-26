import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Bed,
  Bath,
  Home,
  Maximize,
  Tag,
  MapPin,
  MessageSquare,
  Phone,
  Layers,
  Compass,
  Clock,
} from "lucide-react";
import PropertyImageCarousel from "../components/PropertyImageCarousel";
import API from "../service/Api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProperty = async () => {
      const { data } = await API.get(`/properties/${id}`);
      console.log(data);
      setProperty(data);
    };
    fetchProperty();
  }, [id]);

  if (!property)
    return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-[#f8f6f2] min-h-screen flex flex-col">

      <Navbar variant="light" />
      <div className="h-20" />

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8"
      >
        {/* IMAGE */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden shadow h-87.5 md:h-105">
            <PropertyImageCarousel
              images={property.images.map((img) => img.url)}
            />
          </div>
        </div>

       <div className="sticky top-24 h-fit">
  <div className="bg-[#fdf6f0] border border-[#f1e4d7] rounded-2xl p-6 shadow-sm">

    {/* PROPERTY NAME */}
    <h2 className="text-lg font-semibold text-[#1a2a4e] mb-2">
      {property.propertyName}
    </h2>

    {/* PRICE */}
    <p className="text-2xl font-bold text-[#c6a46c] mb-6">
      ₹ {property.price}
    </p>

    {/* CONTACT BUTTON */}
    <button onClick={() => navigate("/contact")} className="w-full py-3 bg-[#c6a46c] text-white rounded-xl font-medium hover:bg-[#b8965f] transition">
      Contact Now
    </button>

  </div>
</div>
      </motion.section>

      {/* DETAILS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">

            {/* OVERVIEW */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Property Overview</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {property.propertyType && <DetailItem icon={Home} label="Type" value={property.propertyType} />}
                {property.Bedroom && <DetailItem icon={Bed} label="Bedrooms" value={property.Bedroom} />}
                {property.Bathroom && <DetailItem icon={Bath} label="Bathrooms" value={property.Bathroom} />}
                {property.size && <DetailItem icon={Maximize} label="Area" value={property.size} />}
                {property.location && <DetailItem icon={MapPin} label="Location" value={property.location} />}
                {property.Floores && <DetailItem icon={Layers} label="Floors" value={property.Floores} />}
                {property.Facing && <DetailItem icon={Compass} label="Facing" value={property.Facing} />}
                {property.PropertyAge && <DetailItem icon={Clock} label="Age" value={property.PropertyAge} />}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p>{property.description}</p>
            </div>

          </div>

          {/* RIGHT CONTACT */}
          <div className="sticky top-24 h-fit">
            <ContactForm />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

/* DETAIL ITEM */
function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-[#f5f2ed] p-4 rounded-lg">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#c6a46c]" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

/* CONTACT */

function ContactForm({ property }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (number.length !== 10) {
      toast.error("Mobile Number must be 10 digit");
      return;
    }

    if (!firstname || !number || !purpose || !propertyType) {
      toast.error("Fill all required fields");
      return;
    }

    try {
      await API.post("/form", {
        firstName: firstname,
        lastName: lastname,
        mobileNo: Number(number),
        purpose,
        propertype: propertyType,
      });

      toast.success("Form submitted");
      setFirstname("");
      setLastname("");
      setNumber("");
      setPurpose("");
      setPropertyType("");
    } catch {
      toast.error("Failed to submit");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow space-y-5"
    >
      <h3 className="font-script text-lg font-semibold text-[#1a2a4e]">
        Request Consultation
      </h3>

      <input
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />

      <input
        placeholder="Mobile Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />

      <select
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="">Purpose</option>
        <option value="Buy">Buy</option>
        <option value="Sell">Sell</option>
      </select>

      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="">Property Type</option>
        <option value="Plot">Plot</option>
        <option value="Home">Home</option>
        <option value="Floor">Floor</option>
      </select>

      <button className="w-full bg-[#d4af37] py-2 rounded-md font-medium">
        Submit
      </button>

      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 bg-[#25D366] text-white py-2 rounded-md flex justify-center items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp
        </button>

        <button
          type="button"
          className="flex-1 bg-[#1a2a4e] text-white py-2 rounded-md flex justify-center items-center gap-2"
        >
          <Phone className="w-4 h-4" /> Call
        </button>
      </div>
    </form>
  );
}