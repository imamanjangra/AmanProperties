import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import API from "../Services/API.jsx";
import { useNavigate } from "react-router-dom";
import FormResponseSkeleton from "../Components/FormResponseSkeleton.jsx";
import toast from "react-hot-toast";

export default function AdminUpdateProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/properties");
      setProperties(data);
    } catch (error) {
      console.log("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this property?");
  if (!confirmDelete) return;

  try {
    // Send DELETE request to your API
    await API.delete(`/properties/${id}`);
    
    // Remove deleted property from the state so UI updates instantly
    setProperties((prev) => prev.filter((property) => property._id !== id));
    
    // alert("Property deleted successfully!");
    toast.success("Property deleted successfully!")
  } catch (error) {
    console.error("Failed to delete property", error);
    // alert("Failed to delete property. Try agatoain.");
    toast.error("Failed to delete property. Try again.")
  }
};

  

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-purple-400 mb-6">
        Update Properties
      </h1>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-sm text-gray-500">
            <FormResponseSkeleton />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-sm text-gray-500">no responses</div>
        ) : (
          properties.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium text-lg">{item.propertyName}</p>
                  <p className="text-sm text-zinc-400">{item.location}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`${item._id}`)}
                    className="flex items-center gap-2 rounded-lg border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-sm text-purple-400"
                  >
                    <Pencil size={14} /> Update
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-400"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
