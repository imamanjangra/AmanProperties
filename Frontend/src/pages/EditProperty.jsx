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

  const [existingImages, setExistingImages] = useState([]); // full objects
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH DATA
  const fetchProperty = async () => {
    try {
      const { data } = await API.get(`/properties/${id}`);

      setPropertyName(data.propertyName || "");
      setLocation(data.location || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setPropertyType(data.propertyType || "");
      setSize(data.size || "");
      setBedroom(data.bedroom || "");
      setBathroom(data.bathroom || "");
      setFacing(data.Facing || "");
      setPropertyAge(data.PropertyAge || "");
      setFloor(data.Floor || "");

      // IMPORTANT: keep full object
      setExistingImages(data.images || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load property");
    }
  };

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  // 🔥 REMOVE EXISTING
  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔥 REMOVE NEW
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔥 UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // 🔥 UPDATE
  const updateProperty = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("propertyName", propertyName);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("propertyType", propertyType);
      formData.append("size", size);
      formData.append("bedroom", bedroom);
      formData.append("bathroom", bathroom);
      formData.append("Facing", Facing);
      formData.append("PropertyAge", PropertyAge);
      formData.append("Floor", Floor);

      // ✅ send only IDs (VERY IMPORTANT)
      const existingIds = existingImages.map((img) => img._id);
      formData.append("existingImages", JSON.stringify(existingIds));

      // new images
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      await API.put(`/properties/${id}`, formData);

      toast.success("Property updated");

      setNewImages([]);

      // 🔥 refresh UI with latest data
      fetchProperty();

    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] pt-20 text-black ">
      <Navbar variant="light" />

      <div className="mb-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#c9a24d]">
          Edit Property
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Update property details
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-10 rounded-xl border border-gray-200 bg-white shadow-sm p-4 md:p-6">
        <form
          onSubmit={updateProperty}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <Input icon={<Home size={16} />} value={propertyName} setValue={setPropertyName} placeholder="Property Name" />
          <Input icon={<IndianRupee size={16} />} type="number" value={price} setValue={setPrice} placeholder="Price" />

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

          <Input icon={<Layers size={16} />} type="number" value={Floor} setValue={setFloor} placeholder="Floor" />
          <Input icon={<Maximize size={16} />} type="number" value={size} setValue={setSize} placeholder="Size" />
          <Input icon={<Bed size={16} />} type="number" value={bedroom} setValue={setBedroom} placeholder="Bedrooms" />
          <Input icon={<Bath size={16} />} type="number" value={bathroom} setValue={setBathroom} placeholder="Bathrooms" />
          <Input icon={<Clock size={16} />} value={PropertyAge} setValue={setPropertyAge} placeholder="Property Age" />
          <Input icon={<MapPin size={16} />} value={location} setValue={setLocation} placeholder="Location" />

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* IMAGES */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Images</label>

            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 hover:border-[#c9a24d]">
              <Upload size={24} className="text-[#c9a24d]" />
              <input type="file" multiple onChange={handleImageUpload} className="hidden" />
            </label>

            <div className="mt-3 flex gap-3 overflow-x-auto">
              
              {/* EXISTING */}
              {existingImages.map((img, i) => (
                <div key={i} className="relative h-20 w-20">
                  <img src={img.url} className="h-full w-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs hover:bg-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* NEW */}
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
              className="w-full rounded-lg bg-[#c9a24d] py-2.5 text-black font-medium hover:bg-[#b8933f]"
            >
              {loading ? "Updating..." : "Update Property"}
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}

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
        />
      </div>
    </div>
  );
}