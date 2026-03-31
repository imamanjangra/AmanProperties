import { useEffect, useState } from "react";
import {
  Upload,
  Home,
  IndianRupee,
  Maximize,
  Bed,
  Bath,
  MapPin,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import API from "../Services/API.jsx";
import { useParams } from "react-router-dom";

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

  // 🔥 REMOVE EXISTING
  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔥 REMOVE NEW
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔥 HANDLE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // 🔥 SUBMIT
  const updateProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("propertyName", propertyName);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("propertyType", propertyType);
      formData.append("size", size);
      formData.append("Bedroom", bedroom);
      formData.append("Bathroom", bathroom);

      // ✅ existing images
      existingImages.forEach((img) => {
        formData.append("existingImages", img);
      });

      // ✅ new images
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      const { data } = await API.put(`/properties/${id}`, formData);

      // 🔥 CRITICAL FIX → UPDATE UI
      setExistingImages(data.images.map((img) => img.url));
      setNewImages([]);

      toast.success("Property updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-zinc-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
       

        {/* FORM */}
        <form
          onSubmit={updateProperty}
          className="bg-gray-900 border border-zinc-800 rounded-xl p-6 grid md:grid-cols-2 gap-5"
        >
          {/* NAME */}
          <Input icon={<Home size={16} />} value={propertyName} setValue={setPropertyName} label="Property Name" />

          {/* PRICE */}
          <Input icon={<IndianRupee size={16} />} value={price} setValue={setPrice} label="Price" type="number" />

          {/* LOCATION */}
          <Input icon={<MapPin size={16} />} value={location} setValue={setLocation} label="Location" />

          {/* SIZE */}
          <Input icon={<Maximize size={16} />} value={size} setValue={setSize} label="Size" type="number" />

          {/* BED */}
          <Input icon={<Bed size={16} />} value={bedroom} setValue={setBedroom} label="Bedrooms" type="number" />

          {/* BATH */}
          <Input icon={<Bath size={16} />} value={bathroom} setValue={setBathroom} label="Bathrooms" type="number" />

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="text-sm text-zinc-400">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2 outline-none"
            />
          </div>

          {/* IMAGE SECTION */}
          <div className="md:col-span-2">
            <label className="text-sm text-zinc-400 mb-2 block">
              Property Images
            </label>

            {/* Upload Box */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl p-6 cursor-pointer hover:border-purple-400 transition">
              <Upload className="text-purple-400 mb-2" />
              <p className="text-sm text-zinc-400">Click to upload images</p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Preview */}
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3">
              {/* EXISTING */}
              {existingImages.map((url, i) => (
                <ImageCard
                  key={i}
                  src={url}
                  onDelete={() => removeExistingImage(i)}
                />
              ))}

              {/* NEW */}
              {newImages.map((file, i) => (
                <ImageCard
                  key={i}
                  src={URL.createObjectURL(file)}
                  onDelete={() => removeNewImage(i)}
                />
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ icon, value, setValue, label, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-zinc-400">{label}</label>
      <div className="mt-1 flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 rounded-lg">
        {icon}
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full py-2 bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  );
}

function ImageCard({ src, onDelete }) {
  return (
    <div className="relative group rounded-xl overflow-hidden border border-zinc-800">
      <img
        src={src}
        className="h-24 w-full object-cover group-hover:scale-105 transition"
      />

      <button
        type="button"
        onClick={onDelete}
        className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>
    </div>
  );
}