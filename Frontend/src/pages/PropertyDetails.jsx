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
} from "lucide-react";
import PropertyImageCarousel from "../components/PropertyImageCarousel";
import API from "../service/Api";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams("id");
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const { data } = await API.get(`/properties/${id}`);
      setProperty(data);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      {/* ================= CAROUSEL ================= */}
      <motion.section
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <PropertyImageCarousel images={property.images.map((img) => img.url)} />
      </motion.section>
      {/* ============ PROPERTY INFO + CONTACT ============ */}
      <section className="bg-gray-50 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12"
        >
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-script text-2xl font-semibold text-[#1a2a4e] mb-8">
                Property Overview
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <DetailItem
                  icon={Tag}
                  label="Price"
                  value={`₹ ${property.price}`}
                />
                <DetailItem
                  icon={Home}
                  label="Type"
                  value={property.propertyType}
                />
                <DetailItem
                  icon={Bed}
                  label="Bedrooms"
                  value={property.Bedroom}
                />
                <DetailItem
                  icon={Bath}
                  label="Bathrooms"
                  value={property.Bathroom}
                />
                <DetailItem
                  icon={Maximize}
                  label="Area"
                  value={property.size}
                />
                <DetailItem
                  icon={MapPin}
                  label="Location"
                  value={property.location}
                />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-script text-2xl font-semibold text-[#1a2a4e] mb-4">
                Property Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>
          </div>

          {/* RIGHT – CONTACT */}
          <div className="sticky top-24 h-fit">
            <ContactForm property={property} />
          </div>
        </motion.div>
      </section>

      {/* ================= MAP ================= */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#d4af37]/10 px-4 py-2 rounded-full mb-4 text-[#d4af37]">
              Prime Location
            </span>
            <h2 className="font-script text-3xl font-semibold text-[#1a2a4e]">
              Property Location
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl h-105">
            <iframe
              src={`https://www.google.com/maps?q=${property.location}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              title="Property Location"
            />
          </div>
        </div>
      </motion.section>
    </>
  );
}

/* ================= REUSABLE ================= */

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-5 bg-gray-50 rounded-xl p-5 hover:shadow-md transition">
      <div className="bg-[#1a2a4e] p-4 rounded-xl">
        <Icon className="w-6 h-6 text-[#d4af37]" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-[#1a2a4e]">{value}</p>
      </div>
    </div>
  );
}

function ContactForm({ property }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (number.length != 10) {
      toast.error("Mobile Number must be 10 digit !");
      return;
    }

    if (!firstname || !number || !purpose || !propertyType) {
      toast.error("Please fill compelete form !!");
    }

    try {
      await API.post("/form", {
        firstName: firstname,
        lastName: lastname,
        mobileNo: Number(number),
        purpose,
        propertype: propertyType,
      });

      setFirstname("");
      setLastname("");
      setNumber("");
      setPurpose("");
      setPropertyType("");
      toast.success("Form submitted successfully");
    } catch (error) {
      toast.error("Failed to submit form");
      return;
    }
  };

  const handleWhatsapp = () => {
    const phoneNo = "919255446593"; // your WhatsApp number
    const propertyName = property?.propertyName || "this property"; // fallback

    // Medium-length message
    const message = `Hi, I am interested in the property "${propertyName}".`;

    const url = `https://wa.me/${phoneNo}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const callNow = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = "tel:+919255446593";
    } else {
      toast.error("Please call this number from your mobile: +91 9255446593");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-xl space-y-6"
    >
      <h3 className="font-script text-xl font-semibold text-[#1a2a4e]">
        Request Consultation
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
        />
        <input
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
        />
      </div>

      <input
        placeholder="Mobile Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
        className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
      />

      <select
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
        className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
      >
        <option value="">Select Purpose</option>
        <option value="Buy">Buy</option>
        <option value="Sell">Sell</option>
      </select>

      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        required
        className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
      >
        <option value="">Property Type</option>
        <option value="Plot">Plot</option>
        <option value="Home">Home</option>
        <option value="Floor">Floor</option>
      </select>

      <button className="w-full mt-2 bg-[#d4af37] text-[#1a2a4e] py-3 rounded-md font-medium hover:bg-[#c19a2e] transition">
        Submit
      </button>

      <div className="flex items-center my-6">
        <hr className="grow border-gray-300" />
        <span className="mx-4 text-gray-500 font-medium">or</span>
        <hr className="grow border-gray-300" />
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          type="button"
          onClick={handleWhatsapp}
          className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#20ba5a] transition-all hover:scale-105"
        >
          <MessageSquare className="w-5 h-5" />
          WhatsApp
        </button>

        <button
          type="button"
          onClick={callNow}
          className="flex items-center gap-2 bg-[#1a2a4e] text-white px-6 py-3 rounded-xl hover:bg-[#2a3a5e] transition-all hover:scale-105"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </button>
      </div>
    </form>
  );
}
