import { useEffect, useState } from "react";
import {
  Upload,
  Home,
  IndianRupee,
  Maximize,
  Bed,
  Bath,
  MapPin,
  Clock,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../service/Api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO.jsx";
export default function EditPropertyForm() {
  const { id } = useParams();

  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [size, setSize] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [Facing, setFacing] = useState("");
  const [PropertyAge, setPropertyAge] = useState("");
  const [Floor, setFloor] = useState("");

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH PROPERTY
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await API.get(`/properties/${id}`);

        setPropertyName(data.propertyName || "");
        setLocation(data.location || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setPropertyType(data.propertyType || "");
        setSize(data.size || "");
        setBedroom(data.Bedroom || "");
        setBathroom(data.Bathroom || "");
        setFacing(data.Facing || "");
        setPropertyAge(data.PropertyAge || "");
        setFloor(data.Floor || "");

        if (data.images) {
          setExistingImages(data.images.map((img) => img.url));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load property");
      }
    };

    if (id) fetchProperty();
  }, [id]);

  // 🔥 REMOVE EXISTING IMAGE (UI ONLY)
  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔥 REMOVE NEW IMAGE
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔥 IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // 🔥 UPDATE REQUEST (MAIN FIX)
  const updateProperty = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const formData = new FormData();

      // ✅ only allowed fields
      formData.append("propertyName", propertyName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("size", size);
      formData.append("Bedroom", bedroom);
      formData.append("Bathroom", bathroom);
      formData.append("Facing", Facing);
      formData.append("PropertyAge", PropertyAge);
      formData.append("Floor", Floor);
      formData.append("location", location);
      // ✅ new images
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      await API.put(`/propertyUpdates/${id}`, formData);

      toast.success("Update request sent for approval");
    } catch (error) {
      console.log(error);
      toast.error("Update request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] pt-20 text-black">
      <SEO title="Edit Property | AmanProperties" description="Edit your existing property listing on AmanProperties to keep it up to date." />
      <Navbar variant="light" />

      <div className="mb-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#c9a24d]">
          Edit Property
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Changes require admin approval before going live
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-10 rounded-xl border bg-white p-6 shadow-sm">
        <form
          onSubmit={updateProperty}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Input
            icon={<Home size={16} />}
            value={propertyName}
            setValue={setPropertyName}
            placeholder="Property Name"
          />
          <Input
            icon={<IndianRupee size={16} />}
            value={price}
            setValue={setPrice}
            placeholder="Price"
          />

          <Input
            icon={<Layers size={16} />}
            value={Floor}
            setValue={setFloor}
            placeholder="Floor"
          />
          <Input
            icon={<Maximize size={16} />}
            value={size}
            setValue={setSize}
            placeholder="Size"
          />
          <Input
            icon={<Bed size={16} />}
            value={bedroom}
            setValue={setBedroom}
            placeholder="Bedrooms"
          />
          <Input
            icon={<Bath size={16} />}
            value={bathroom}
            setValue={setBathroom}
            placeholder="Bathrooms"
          />
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

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* IMAGES */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Images</label>

            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center border border-dashed p-6 rounded-lg">
              <Upload size={24} />
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="mt-3 flex gap-3 overflow-x-auto">
              {existingImages.map((url, i) => (
                <div key={i} className="relative h-20 w-20">
                  <img
                    src={url}
                    className="h-full w-full object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs hover:bg-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {newImages.map((file, i) => (
                <div key={i} className="relative h-20 w-20">
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-full w-full object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs hover:bg-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a24d] py-2.5 rounded-lg font-medium"
            >
              {loading ? "Sending..." : "Request Update"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

function Input({ icon, value, setValue, placeholder, disabled = false }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{placeholder}</label>
      <div className="mt-1 flex items-center gap-2 border rounded-lg px-3">
        {icon}
        <input
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          className="w-full py-2 text-sm outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
