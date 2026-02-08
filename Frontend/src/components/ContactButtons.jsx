import { PhoneCall, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactButtons() {
  const navigate = useNavigate();
  const phoneNo = 9468255640;
  const message = "Heelo i want to connect with you ";

  const handleWhatsapp = () => {
    const url = `https://wa.me/${phoneNo}?text=${encodeURIComponent(message)}`
    window.open(url , "_blank");
  }

  return (
    <div className="fixed bottom-4 right-4 flex gap-4 z-50">
      <button
        onClick={() => navigate(`/contact`)} 
       className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition shadow-lg">
        <PhoneCall className="w-5 h-5" />
        <span className="font-nav">CALL BACK</span>
      </button>
      <button onClick={handleWhatsapp} className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition shadow-lg">
        <MessageCircle className="w-5 h-5" />
        <span className="font-nav">WHATSAPP</span>
      </button>
    </div>
  );
}