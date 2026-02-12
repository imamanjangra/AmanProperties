import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      
      {/* Image */}
      <img
        src="../public/error.png"
        alt="Page Not Found"
        className="w-150 mb-8"
      />

      {/* Text */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>

      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-[#c9a24d] text-white px-6 py-3 rounded-lg hover:bg-[#b8913f] transition duration-300"
      >
        Go Home
      </button>
    </div>
  );
}
