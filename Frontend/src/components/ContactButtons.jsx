import { PhoneCall, MessageCircle } from "lucide-react";

export default function ContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 flex gap-4 z-50">
      <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition shadow-lg">
        <PhoneCall className="w-5 h-5" />
        <span>CALL BACK</span>
      </button>
      <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition shadow-lg">
        <MessageCircle className="w-5 h-5" />
        <span>WHATSAPP</span>
      </button>
    </div>
  );
}