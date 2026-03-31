import { useEffect, useState } from "react";
import API from "../Services/API.jsx";
import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  RefreshCcw,
  Pencil,
} from "lucide-react";

export default function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true); 

      // ✅ CORRECT ROUTE
      const { data } = await API.get("/admin/getAllProperties");

      setProperties(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ✅ VERIFY (for rejected/pending)
  const handleVerify = async (id) => {
    try {
      await API.put(`/properties/verifyProperty/${id}`);

      setProperties((prev) =>
        prev.map((p) =>
          p._id === id
            ? { ...p, status: "approved", isverifed: true }
            : p
        )
      );

      toast.success("Approved");
    } catch (err) {
      console.error(err);
      toast.error("Failed");
    }
  };

  // 🔁 UNVERIFY
  const handleUnverify = async (id) => {
    try {
      await API.put(`/properties/unverify/${id}`);

      setProperties((prev) =>
        prev.map((p) =>
          p._id === id
            ? { ...p, status: "pending", isverifed: false }
            : p
        )
      );

      toast.success("Moved to pending");
    } catch (err) {
      console.error(err);
      toast.error("Failed");
    }
  };

  // ❌ REJECT
  const handleReject = async (id) => {
    try {
      await API.put(`/properties/reject/${id}`, {
        rejectedreason: "Rejected from manage panel",
      });

      setProperties((prev) =>
        prev.map((p) =>
          p._id === id
            ? { ...p, status: "rejected", isrejected: true }
            : p
        )
      );

      toast.success("Rejected");
    } catch (err) {
      console.error(err);
      toast.error("Failed");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/admin/EditProperty/${id}`;
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-gray-300">
      <h1 className="text-2xl text-white mb-4">
        Manage Properties
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {properties.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4"
            >
              {/* IMAGE */}
              <img
                src={item.images?.[0]?.url}
                className="w-full sm:w-32 h-24 object-cover rounded-lg"
              />

              {/* INFO */}
              <div className="flex-1">
                <h3 className="text-white font-semibold">
                  {item.propertyName}
                </h3>

                <p className="text-xs text-gray-400">
                  {item.location}
                </p>

                <p className="text-xs mt-1">
                  ₹ {item.price} • {item.propertyType}
                </p>

                {/* STATUS */}
                <span
                  className={`text-xs px-2 py-1 rounded mt-2 inline-block
                  ${
                    item.status === "approved"
                      ? "bg-green-600/20 text-green-400"
                      : item.status === "rejected"
                      ? "bg-red-600/20 text-red-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 items-center">

                {/* APPROVED → UNVERIFY */}
                

                {/* REJECTED → VERIFY */}
                {item.status === "rejected" && (
                  <button
                    onClick={() => handleVerify(item._id)}
                    className="p-2 bg-green-600/20 text-green-400 rounded hover:bg-green-600/40"
                  >
                    <CheckCircle size={18} />
                  </button>
                )}

                {/* PENDING → VERIFY */}
                {item.status === "pending" && (
                  <button
                    onClick={() => handleVerify(item._id)}
                    className="p-2 bg-green-600/20 text-green-400 rounded hover:bg-green-600/40"
                  >
                    <CheckCircle size={18} />
                  </button>
                )}

                {/* REJECT */}
                {item.status !== "rejected" && (
                  <button
                    onClick={() => handleReject(item._id)}
                    className="p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600/40"
                  >
                    <XCircle size={18} />
                  </button>
                )}

                {/* EDIT */}
                <button
                  onClick={() => handleEdit(item._id)}
                  className="p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/40"
                >
                  <Pencil size={18} />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}