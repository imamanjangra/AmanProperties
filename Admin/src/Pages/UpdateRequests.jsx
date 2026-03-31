import { useEffect, useState } from "react";
import API from "../Services/API.jsx";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function UpdateRequests() {
  const [requests, setRequests] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/propertyUpdates/updateRequests");
      console.log("Fetched Requests:", data);
      setRequests(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ APPROVE
  const handleApprove = async (id) => {
    try {
      await API.put(`/propertyUpdates/approve/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Approved");
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  // ❌ REJECT
  const handleReject = async (id) => {
    try {
      await API.put(`/propertyUpdates/reject/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Rejected");
    } catch (err) {
      console.error(err);
      toast.error("Reject failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 text-gray-300 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold text-white mb-4">
        Property Update Requests
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="flex flex-col gap-4">
          {requests.map((req) => {
            const isOpen = openId === req._id;

            return (
              <div
                key={req._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-3"
              >
                {/* TOP */}
                <div className="flex justify-between items-center">
                  <div>
                    {/* ✅ FIXED: no object rendering */}
                    <p className="text-white text-sm font-medium">
                      Property:{" "}
                      {req.propertyId?.propertyName || req.propertyId?._id}
                    </p>

                    <p className="text-xs text-gray-400">
                      Requested by:{" "}
                      {req.userId?.name || req.userId?.email || req.userId?._id}
                    </p>
                  </div>

                  <button
                    onClick={() => setOpenId(isOpen ? null : req._id)}
                    className="p-2 bg-gray-800 rounded-lg"
                  >
                    {isOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>

             {isOpen && (
  <div className="mt-4 border-t border-gray-800 pt-4">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-3">
      <p className="text-sm text-gray-400">
        Review Changes
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => handleApprove(req._id)}
          className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/40 text-xs"
        >
          <CheckCircle size={14} />
          Approve
        </button>

        <button
          onClick={() => handleReject(req._id)}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 text-xs"
        >
          <XCircle size={14} />
          Reject
        </button>
      </div>
    </div>

    {/* TABLE HEADER */}
    <div className="grid grid-cols-3 text-xs text-gray-500 mb-2 px-2">
      <span>Field</span>
      <span className="text-red-400">Old</span>
      <span className="text-green-400">New</span>
    </div>

    {/* DATA */}
    <div className="space-y-2">
      {Object.entries(req.updatedData).map(([key, newValue]) => {
        const oldValue = req.propertyId?.[key];

        return (
          <div
            key={key}
            className="grid grid-cols-3 items-center bg-gray-800 rounded-lg p-2 text-xs"
          >
            {/* FIELD NAME */}
            <span className="text-gray-400 capitalize">
              {key}
            </span>

            {/* OLD VALUE */}
            <div className="text-red-400 line-through truncate">
              {!Array.isArray(newValue)
                ? oldValue ?? "N/A"
                : ""}
            </div>

            {/* NEW VALUE */}
            <div className="text-green-400 truncate">
              {!Array.isArray(newValue)
                ? typeof newValue === "object"
                  ? JSON.stringify(newValue)
                  : newValue
                : ""}
            </div>

            {/* IMAGE SECTION */}
            {Array.isArray(newValue) && (
              <div className="col-span-3 mt-2 flex gap-4 overflow-x-auto">

                {/* OLD IMAGES */}
                <div>
                  <p className="text-red-400 text-xs mb-1">Old</p>
                  <div className="flex gap-2">
                    {req.propertyId?.images?.map((img) => (
                      <img
                        key={img.public_id}
                        src={img.url}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg border border-red-500"
                      />
                    ))}
                  </div>
                </div>

                {/* NEW IMAGES */}
                <div>
                  <p className="text-green-400 text-xs mb-1">New</p>
                  <div className="flex gap-2">
                    {newValue.map((img) => (
                      <img
                        key={img.public_id}
                        src={img.url}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg border border-green-500"
                      />
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
