import { useState } from "react";
import {
  Upload,
  Home,
  IndianRupee,
  Maximize,
  Bed,
  Bath,
  MapPin,
  FileText,
  Layers,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../service/Api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactButtons from "../components/ContactButtons";
import SEO from "../components/SEO.jsx";
export default function AdminAddProperty() {
  const [images, setImages] = useState([]);
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [size, setSize] = useState("");
  const [Bedroom, setBedroom] = useState("");
  const [Bathroom, setBathroom] = useState("");
  const [loading, setLoading] = useState(false);
  const [Facing, setFacing] = useState("");
  const [PropertyAge, setPropertyAge] = useState("");
  const [Floor, setFloor] = useState("");
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addDetail = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent spam

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("propertyName", propertyName);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("propertyType", propertyType);
      formData.append("size", size);
      formData.append("Bedroom", Bedroom);
      formData.append("Bathroom", Bathroom);
      formData.append("Facing", Facing);
      formData.append("PropertyAge", PropertyAge);
      formData.append("Floor", Floor);
      images.forEach((img) => formData.append("images", img));

      await API.post("/properties", formData);
      console.log(formData);
      toast.success("Property added");

      setPropertyName("");
      setLocation("");
      setDescription("");
      setPrice("");
      setPropertyType("");
      setSize("");
      setBedroom("");
      setBathroom("");
      setImages([]);
      setFacing("");
      setPropertyAge("");
      setFloor("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-black flex flex-col">
      <SEO title="Add Property | AmanProperties" description="Admin page to add a new property listing to AmanProperties." />
      <Navbar variant="light" />
      <ContactButtons />
      <div className="flex-1 px-4 md:px-8 py-6">
        <div className="mb-6 mt-20 max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Add New Property
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            This property will appear on the website
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl border border-gray-200 bg-white shadow-sm p-4 md:p-6">
          <form
            onSubmit={addDetail}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Property Name */}
            <Input
              icon={<Home size={16} />}
              value={propertyName}
              setValue={setPropertyName}
              placeholder="Property Name"
            />

            {/* Price */}
            <Input
              icon={<IndianRupee size={16} />}
              type="string"
              value={price}
              setValue={setPrice}
              placeholder="Price"
            />

            {/* Type */}
            <div>
              <label className="text-sm text-gray-600">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select Type</option>
                <option value="Plot">Plot</option>
                <option value="Home">Home</option>
                <option value="Floor">Floor</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Facing</label>
              <select
                value={Facing}
                onChange={(e) => setFacing(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select Facing</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* Size */}
            <Input
              icon={<Layers size={16} />}
              type="number"
              value={Floor}
              setValue={setFloor}
              placeholder="Floor"
            />
            <Input
              icon={<Maximize size={16} />}
              type="number"
              value={size}
              setValue={setSize}
              placeholder="Size"
            />

            {/* Bedrooms */}
            <Input
              icon={<Bed size={16} />}
              type="number"
              value={Bedroom}
              setValue={setBedroom}
              placeholder="Bedrooms"
            />

            {/* s */}
            <Input
              icon={<Bath size={16} />}
              type="number"
              value={Bathroom}
              setValue={setBathroom}
              placeholder="Bathrooms"
            />

            {/* Location */}
            <Input
              icon={<Clock size={16} />}
              value={PropertyAge}
              setValue={setPropertyAge}
              placeholder="Property Age"
            />
            <Input
              icon={<MapPin size={16} />}
              value={location}
              setValue={setLocation}
              placeholder="Location"
            />

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Images</label>

              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 hover:border-[#c9a24d]">
                <Upload size={24} className="text-[#c9a24d]" />
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-3 flex gap-3 overflow-x-auto">
                  {images.map((img, i) => (
                    <div key={i} className="relative h-20 w-20">
                      <img
                        src={URL.createObjectURL(img)}
                        className="h-full w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs hover:bg-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a24d] py-2.5 rounded-lg text-black font-medium hover:bg-[#b8933f]"
              >
                {loading ? "Publishing..." : "Publish Property"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* 🔥 Reusable Input Component */
function Input({ icon, value, setValue, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{placeholder}</label>
      <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3">
        {icon}
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full py-2 text-sm outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
