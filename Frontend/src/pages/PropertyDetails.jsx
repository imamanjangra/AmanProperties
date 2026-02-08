import { useEffect, useState } from "react";
import {
  Bed,
  Bath,
  Home,
  Maximize,
  Tag,
  MapPin,
} from "lucide-react";
import PropertyImageCarousel from "../components/PropertyImageCarousel";
import API from "../service/Api";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const {id} = useParams("id")
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
     <section className="container mx-auto">
  <PropertyImageCarousel
    images={property.images.map((img) => img.url)}
  />
</section>
      {/* ============ PROPERTY INFO + CONTACT ============ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#1a2a4e] mb-8">
                Property Overview
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <DetailItem icon={Tag} label="Price" value={`₹ ${property.price}`} />
                <DetailItem icon={Home} label="Type" value={property.propertyType} />
                <DetailItem icon={Bed} label="Bedrooms" value={property.Bedroom} />
                <DetailItem icon={Bath} label="Bathrooms" value={property.Bathroom} />
                <DetailItem icon={Maximize} label="Area" value={property.size} />
                <DetailItem icon={MapPin} label="Location" value={property.location} />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#1a2a4e] mb-4">
                Property Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>
          </div>

          {/* RIGHT – CONTACT */}
          <div className="sticky top-24 h-fit">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#d4af37]/10 px-4 py-2 rounded-full mb-4 text-[#d4af37]">
              Prime Location
            </span>
            <h2 className="text-3xl font-semibold text-[#1a2a4e]">
              Property Location
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl h-[420px]">
            <iframe
              src={`https://www.google.com/maps?q=${property.location}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              title="Property Location"
            />
          </div>
        </div>
      </section>
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


function ContactForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/form", {
      firstName: firstname,
      lastName: lastname,
      mobileNo: Number(number),
      purpose,
      propertype: propertyType,
    });

    setFirstname("")
    setLastname("")
    setNumber("")
    setPurpose("")
    setPropertyType("")
    alert("Form submitted successfully");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-xl space-y-6"
    >
      <h3 className="text-xl font-semibold text-[#1a2a4e]">
        Request Consultation
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          className="border p-3 rounded"
        />
        <input
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="border p-3 rounded"
        />
      </div>

      <input
        placeholder="Mobile Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
        className="border p-3 rounded w-full"
      />

      <select
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
        className="border p-3 rounded w-full"
      >
        <option value="">Select Purpose</option>
        <option value="Buy">Buy</option>
        <option value="Sell">Sell</option>
      </select>

      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        required
        className="border p-3 rounded w-full"
      >
        <option value="">Property Type</option>
        <option value="Plot">Plot</option>
        <option value="Home">Home</option>
        <option value="Floor">Floor</option>
      </select>

      <button className="w-full bg-[#1a2a4e] text-white py-3 rounded hover:bg-[#d4af37] hover:text-[#1a2a4e] transition">
        Submit
      </button>
    </form>
  );
}
