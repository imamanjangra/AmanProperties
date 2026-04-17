import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../Contexts/auth.context";
import toast from "react-hot-toast";
import API from "../service/Api";
import SEO from "../components/SEO.jsx";

export default function SignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ added

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedFirstname = firstname.trim();
    const trimmedLastname = lastname.trim();
    const trimmedMobileno = mobileno.trim();
    const trimmedPassword = password.trim();

    if (trimmedPassword !== confirmPassword.trim()) {
      return toast.error("Passwords do not match");
    }

    if (!trimmedFirstname) {
      return toast.error("First name is required");
    }

    if (!trimmedLastname) {
      return toast.error("Last name is required");
    }

    if (!trimmedMobileno) {
      return toast.error("Mobile number is required");
    }

    if (!trimmedPassword) {
      return toast.error("Password is required");
    }

    if (!acceptedTerms) {
      return toast.error("You must accept Terms & Conditions");
    }

    if (!/^[6-9]\d{9}$/.test(trimmedMobileno)) {
      return toast.error("Enter a valid 10-digit mobile number");
    }

    if (trimmedPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true); // ✅ start loading

    try {
      const { data } = await API.post("/users/register", {
        firstname: trimmedFirstname,
        lastname: trimmedLastname,
        password: trimmedPassword,
        mobileno: trimmedMobileno,
      });

      const userData = data.user;

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      toast.success("Account created successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data?.message ||
        "Failed to create account. Try again.";

      toast.error(message);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f2efe9] to-[#e8e4db]">
      <SEO
        title="Sign Up | Aman Properties"
        description="Create your Aman Properties account to list properties, connect with buyers and sellers, and explore verified real estate opportunities in Haryana, India."
      />

      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#d4af37]/20 rounded-full blur-3xl"></div>

        <div className="flex justify-center mb-6">
          <div className="w-25 h-25 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-lg hover:scale-110 transition">
            <img
              src="/Amanpropertiesimage-removebg-preview.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Fill details to register
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              disabled={loading}
              className="w-1/2 px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none disabled:opacity-60"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              disabled={loading}
              className="w-1/2 px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none disabled:opacity-60"
            />
          </div>

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileno}
            onChange={(e) => setMobileno(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none disabled:opacity-60"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              disabled={loading}
              className="mt-1 accent-[#d4af37] cursor-pointer"
            />
            <p className="text-gray-600">
              I agree to{" "}
              <span
                onClick={() => navigate("/term-and-condition")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Terms & Conditions
              </span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-[#d4af37] text-black font-semibold hover:bg-[#c19a2e] active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-[#d4af37] cursor-pointer hover:underline ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}