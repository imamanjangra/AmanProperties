import { Copy, Home, Phone, PhoneCall, Target, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function FormResponseCard({ item, onDelete, onCopy }) {
  const callNow = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = "tel:+919255446593";
    } else {
      toast.error("Please call this number from your mobile: +91 9255446593");
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 shadow">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between text-zinc-300">
        <div className="font-medium text-base text-white min-w-40">
          {item.firstName} {item.lastName}
        </div>

        <div className="flex items-center gap-2 min-w-50">
          <Phone size={16} className="text-purple-400" />
          <span>{item.mobileNo}</span>

          <button
            onClick={() => onCopy(item.mobileNo)}
            className="text-zinc-400 hover:text-zinc-200"
          >
            <Copy size={16} />
          </button>

          <i onClick={() => callNow()} className="text-green-400">
            <PhoneCall size={16} />
          </i>
        </div>

        <div className="flex items-center gap-2 min-w-35">
          <Home size={16} className="text-purple-400" />
          <span>{item.propertype}</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-1 text-purple-400 min-w-30">
          <Target size={14} />
          {item.purpose}
        </div>

        <button
          onClick={() => onDelete(item._id)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
