import { PhoneCall, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactButtons() {
  const navigate = useNavigate();
  const phoneNo = "919255446593"; // use country code for call & whatsapp
  const message =
    "Hi, I'm interested in a property listed on your website. Could you please share more details?";

  const handleWhatsapp = () => {
    const url = `https://wa.me/${phoneNo}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const callNow = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = "tel:+919255446593";
    } else {
      toast.error("Please call this number from your mobile: +91 9255446593")
    }
  };

  return (
    <>
      {/* 📱 Mobile Bottom Bar */}
      <div
        className="
          fixed bottom-0 left-0 right-0 z-50
          grid grid-cols-2
          md:hidden
          bg-gray-900
        "
      >
        {/* ✅ Mobile → Direct Call */}
        <button
          onClick={callNow}
          className="
            flex items-center justify-center gap-2
            py-4 text-white
            border-r border-gray-700
          "
        >
          <PhoneCall className="w-5 h-5" />
          <span className="font-nav font-semibold">CALL NOW</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsapp}
          className="
            flex items-center justify-center gap-2
            py-4 text-white
          "
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-nav font-semibold">WHATSAPP</span>
        </button>
      </div>

      {/* 💻 Desktop Floating Buttons */}
      <div className="hidden md:flex fixed bottom-4 right-4 gap-4 z-50">
        {/* Desktop → Navigate to Contact */}
        <button
          onClick={() => navigate(`/contact`)}
          className="
            flex items-center gap-2
            rounded-lg bg-gray-800
            px-4 py-2 text-white
            hover:bg-gray-700 transition shadow-lg
          "
        >
          <PhoneCall className="w-5 h-5" />
          <span className="font-nav">CALL BACK</span>
        </button>

        <button
          onClick={handleWhatsapp}
          className="
            flex items-center gap-2
            rounded-lg bg-gray-800
            px-4 py-2 text-white
            hover:bg-gray-700 transition shadow-lg
          "
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-nav">WHATSAPP</span>
        </button>
      </div>
    </>
  );
}
