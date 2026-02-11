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
import API from "../Services/API";
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
        if (data.images) setExistingImages(data.images.map(img => img.url || img));
      } catch (error) {
        console.log("Failed to fetch property", error);
        toast.error("Failed to load property details");
      }
    };

    if (id) fetchProperty();
  }, [id]);

  
  const updateProperty = async (e) => {
    e.preventDefault();
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

      newImages.forEach((file) => formData.append("images", file));

      await API.put(`/properties/${id}`, formData);
      toast.success("Property updated successfully");

      setNewImages([]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update property");
    }
  };


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-purple-400">
          Edit Property
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Update the property details that will appear on the main website
        </p>
      </div>

      <div className="max-w-4xl rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur shadow p-4 md:p-6">
        <form
          onSubmit={updateProperty}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
        
          <div>
            <label className="text-sm text-zinc-400">Property Name</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <Home size={16} className="text-purple-400" />
              <input
                type="text"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="Luxury Villa in Gurgaon"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </div>

         
          <div>
            <label className="text-sm text-zinc-400">Price</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <IndianRupee size={16} className="text-purple-400" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="7500000"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </div>

         
          <div>
            <label className="text-sm text-zinc-400">Property Type</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <Home size={16} className="text-purple-400" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none"
              >
                 <option className="bg-zinc-950" value="">
                  Select Type
                </option>
                <option className="bg-zinc-950" value="Apartment">
                  Plot
                </option>
                <option className="bg-zinc-950" value="Villa">
                  Home
                </option>
                <option className="bg-zinc-950" value="Plot">
                  Floor
                </option>
                <option className="bg-zinc-950" value="Commercial">
                  Villa
                </option>
              </select>
            </div>
          </div>

          
          <div>
            <label className="text-sm text-zinc-400">Size (sq.ft)</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <Maximize size={16} className="text-purple-400" />
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="1800"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </div>

         
          <div>
            <label className="text-sm text-zinc-400">Bedrooms</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <Bed size={16} className="text-purple-400" />
              <input
                type="number"
                value={bedroom}
                onChange={(e) => setBedroom(e.target.value)}
                placeholder="3"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </div>

         
          <div>
            <label className="text-sm text-zinc-400">Bathrooms</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <Bath size={16} className="text-purple-400" />
              <input
                type="number"
                value={bathroom}
                onChange={(e) => setBathroom(e.target.value)}
                placeholder="2"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </div>

        
          <div>
            <label className="text-sm text-zinc-400">Location</label>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <MapPin size={16} className="text-purple-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Gurgaon, Haryana"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </div>

         
          <div className="md:col-span-2">
            <label className="text-sm text-zinc-400">Description</label>
            <div className="mt-1 flex gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">
              <FileText size={16} className="text-purple-400 mt-2" />
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write property details..."
                className="w-full bg-transparent py-2 text-sm outline-none resize-none"
              />
            </div>
          </div>

          
          <div className="md:col-span-2">
            <label className="text-sm text-zinc-400">Property Images</label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950 p-6 text-center hover:border-purple-400 transition">
              <Upload size={24} className="text-purple-400 mb-2" />
              <p className="text-sm text-zinc-400">Click to upload images</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="mt-3 flex gap-3 overflow-x-auto">
            
              {existingImages.map((url, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 rounded-lg bg-zinc-800"
                >
                  <img
                    src={url}
                    alt="existing preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              ))}

              
              {newImages.map((file, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 rounded-lg bg-zinc-800"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="new preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 py-2.5 text-sm font-medium hover:bg-purple-500 transition"
            >
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
