import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../service/Api";
import {
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Home,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import ContactButtons from "../components/ContactButtons";
import SEO from "../components/SEO.jsx";
export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  // 🔥 FETCH PROPERTIES
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await API.get("/properties/getuserproperties");
        setProperties(data || []);
        console.log("Fetched properties:", data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // 🔥 STATS
  const total = properties.length;
  const approved = properties.filter((p) => p.isverifed).length;
  const pending = properties.filter((p) => !p.isverifed).length;

  // 🔥 FILTER LOGIC
  const filteredProperties = properties.filter((p) => {
    if (filter === "approved") return p.isverifed;
    if (filter === "pending") return !p.isverifed;
    return true;
  });

  // 🔥 TOGGLE VISIBILITY
  const toggleVisibility = async (id) => {
    try {
      await API.get(`/properties/hideProperty/${id}`);

      setProperties((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isShow: !p.isShow } : p
        )
      );
      toast.success("Property visibility toggled successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to toggle property visibility");
    }
  };

  // 🔥 DELETE PROPERTY
  const deleteProperty = async (id) => {
    try {
      await API.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2]">
      <SEO title="Dashboard | AmanProperties" description="Manage your properties and track their status on AmanProperties." />
      <Navbar variant="light" />
       <ContactButtons/>
      <div className="w-full max-w-400 mx-auto px-6 lg:px-10 xl:px-16 pt-24 pb-12">

        {/* HEADER */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Manage your properties and track their status
            </p>
          </div>

          <button
            onClick={() => navigate("/addproperty")}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg"
          >
            <Plus size={18} /> Add Property
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total" value={total} />
          <StatCard title="Approved" value={approved} />
          <StatCard title="Pending" value={pending} />
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg ${
              filter === "approved"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg ${
              filter === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Pending
          </button>
        </div>

        {/* PROPERTIES */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center">
            <p className="text-gray-500">No properties found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  src={p.images?.[0]?.url}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-3">

                  {/* TITLE */}
                  <h3 className="font-semibold">
                    {p.propertyName}
                  </h3>

                  {/* LOCATION */}
                  <p className="text-sm text-gray-500">
                    {p.location}
                  </p>

                  {/* PRICE */}
                  <p className="text-[#c9a24d] font-bold">
                    ₹ {p.price}
                  </p>

                  {/* STATUS */}
                  <div className="flex flex-wrap gap-3">
                    {p.isverifed ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle size={16} /> Approved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 text-sm">
                        <Clock size={16} /> Pending
                      </span>
                    )}

                    {p.isverifed && (
                      <span className="flex items-center gap-1 text-blue-600 text-sm">
                        {p.isShow ? <Eye size={16} /> : <EyeOff size={16} />}
                        {p.isShow ? "Live" : "Hidden"}
                      </span>
                    )}
                  </div>

                  {/* MESSAGE */}
                  <p className="text-xs text-gray-500">
                    {!p.isverifed && "Waiting for admin approval"}
                    {p.isverifed &&
                      (p.isShow
                        ? "Visible on homepage"
                        : "Hidden from homepage")}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 mt-3">

                    {/* EDIT */}
                    <button
                      onClick={() => navigate(`/editproperty/${p._id}`)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-yellow-400 rounded-lg text-sm"
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteProperty(p._id)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-500 text-white rounded-lg text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>

                  {/* TOGGLE */}
                  {p.isverifed && (
                    <button
                      onClick={() => toggleVisibility(p._id)}
                      className={`w-full py-2 rounded-lg text-sm font-semibold ${
                        p.isShow
                          ? "bg-gray-200 text-gray-700"
                          : "bg-black text-white"
                      }`}
                    >
                      {p.isShow ? "Hide Property" : "Show on Website"}
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

// 🔥 STAT CARD
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow text-center">
      <Home className="mx-auto text-[#c9a24d] mb-2" />
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-[#c9a24d]">{value}</p>
    </div>
  );
}