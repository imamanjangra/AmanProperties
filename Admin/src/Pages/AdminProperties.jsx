import { useEffect, useState } from "react";
import API from "../Services/API.jsx";
import {
  BadgeCheck,
  XCircle,
  Trash2,
  Eye,
  Home,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "/admin/getAllProperties";

      if (filter === "verified") url = "/admin/getAllVerifiedProperties";
      if (filter === "unverified") url = "/admin/getAllUnverifiedProperties";
      if (filter === "homepage") url = "/admin/getPropertyOnHomepage";

      const res = await API.get(url);
      setProperties(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await API.delete(`/admin/deleteProperty/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 EDIT NAVIGATION
  const handleEdit = (id) => {
    navigate(`/admin/EditProperty/${id}`);
  };

  return (
    <div className="p-6 text-white bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Properties Management</h1>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { key: "all", label: "All", icon: Home },
          { key: "verified", label: "Verified", icon: BadgeCheck },
          { key: "unverified", label: "Unverified", icon: XCircle },
          { key: "homepage", label: "Homepage", icon: Eye },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
              filter === key
                ? "bg-blue-600 border-blue-600"
                : "border-gray-700 hover:bg-gray-800"
            }`}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={p.images?.[0]?.url}
                  alt=""
                  className="w-full h-44 object-cover"
                />

                {/* STATUS BADGES */}
                <div className="absolute top-2 left-2 flex gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      p.isverifed
                        ? "bg-green-600/80"
                        : "bg-red-600/80"
                    }`}
                  >
                    {p.isverifed ? "Verified" : "Unverified"}
                  </span>

                  {p.isShow && (
                    <span className="text-xs bg-blue-600/80 px-2 py-1 rounded">
                      Homepage
                    </span>
                  )}
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {p.propertyName}
                </h2>

                <p className="text-sm text-gray-400">
                  {p.location}
                </p>

                <p className="text-base font-medium mt-1 text-blue-400">
                  ₹ {p.price}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Owner: {p.owner?.firstname} {p.owner?.lastname}
                </p>

                {/* ACTIONS */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleEdit(p._id)}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-600 text-sm"
                  >
                    <Pencil size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-600 text-sm"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}