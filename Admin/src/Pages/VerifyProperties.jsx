import { useEffect, useState } from "react";
import API from "../Services/API.jsx";
import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Pencil,
  MapPin,
  Bed,
  Bath,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

export default function VerifyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/properties/unverified");
      setProperties(data);
    } catch {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ VERIFY
  const handleVerify = async (id) => {
    try {
      setActionLoading(true);
      await API.put(`/properties/verifyProperty/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property Approved");
    } catch {
      toast.error("Verification failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ REJECT
  const handleRejectSubmit = async () => {
    if (!reason.trim()) {
      return toast.error("Reject reason is required");
    }

    try {
      setActionLoading(true);

      await API.put(`/properties/reject/${rejectId}`, {
        rejectedreason: reason,
      });

      setProperties((prev) => prev.filter((p) => p._id !== rejectId));
      setRejectId(null);
      setReason("");

      toast.success("Property Rejected");
    } catch {
      toast.error("Reject failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/admin/EditProperty/${id}`;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen bg-gray-950 text-gray-300">
      
      <h1 className="text-xl sm:text-2xl font-semibold text-white">
        Property Verification
      </h1>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : properties.length === 0 ? (
        <div className="text-gray-400">No pending properties</div>
      ) : (
        <div className="flex flex-col gap-4">
          {properties.map((item) => {
            const isOpen = openId === item._id;

            return (
              <div
                key={item._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-3"
              >
                
                {/* STATUS */}
                <div className="mb-2">
                  <span className="text-xs px-2 py-1 rounded bg-yellow-600/20 text-yellow-400">
                    {item.status}
                  </span>
                </div>

                {/* MAIN */}
                <div className="flex flex-col sm:flex-row gap-3">
                  
                  <img
                    src={item.images?.[0]?.url}
                    className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded-lg"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    
                    <div>
                      <h3 className="text-white font-semibold">
                        {item.propertyName}
                      </h3>

                      <div className="flex items-center text-xs text-gray-400 gap-1">
                        <MapPin size={14} />
                        {item.location}
                      </div>

                      <div className="flex gap-3 text-xs text-gray-400 mt-1">
                        {item.Bedroom && (
                          <span className="flex items-center gap-1">
                            <Bed size={14} /> {item.Bedroom}
                          </span>
                        )}
                        {item.Bathroom && (
                          <span className="flex items-center gap-1">
                            <Bath size={14} /> {item.Bathroom}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-1 text-xs">
                        <span className="bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
                          <IndianRupee size={12} /> {item.price}
                        </span>
                        <span className="bg-gray-800 px-2 py-1 rounded">
                          {item.propertyType}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-between sm:justify-end mt-3 gap-2">
                      
                      <div className="flex gap-2">

                        <button
                          disabled={actionLoading}
                          onClick={() => handleVerify(item._id)}
                          className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/40 disabled:opacity-50"
                        >
                          {actionLoading ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18} />}
                        </button>

                        <button
                          disabled={actionLoading}
                          onClick={() => setRejectId(item._id)}
                          className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 disabled:opacity-50"
                        >
                          <XCircle size={18} />
                        </button>

                        <button
                          onClick={() => handleEdit(item._id)}
                          className="p-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/40"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => setOpenId(isOpen ? null : item._id)}
                        className="p-2 bg-gray-800 rounded-lg"
                      >
                        {isOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                      </button>
                    </div>
                  </div>
                </div>

                {/* EXPANDED */}
                {isOpen && (
                  <div className="mt-4 border-t border-gray-800 pt-3 text-xs sm:text-sm">
                    <p><b>Size:</b> {item.size || "N/A"}</p>
                    <p><b>Facing:</b> {item.Facing || "N/A"}</p>
                    <p><b>Age:</b> {item.PropertyAge || "N/A"}</p>
                    <p><b>Description:</b> {item.description || "N/A"}</p>

                    {item.isrejected && (
                      <p className="text-red-400 mt-2">
                        <b>Rejected Reason:</b> {item.rejectedreason}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          
          <div className="bg-gray-900 p-5 rounded-xl w-[90%] max-w-sm space-y-3">
            
            <h2 className="text-white font-semibold">
              Reject Property
            </h2>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full p-2 rounded bg-gray-800 text-sm outline-none resize-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectId(null)}
                className="px-3 py-1 text-gray-400"
              >
                Cancel
              </button>

              <button
                disabled={actionLoading}
                onClick={handleRejectSubmit}
                className="px-3 py-1 bg-red-600 rounded disabled:opacity-50"
              >
                {actionLoading ? "Rejecting..." : "Reject"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}