import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../Contexts/auth.context";
import toast from "react-hot-toast";
import API from "../service/Api";

export default function SignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileno, setMobileno] = useState("");

  const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // 🔴 Required checks
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

    // 🔴 Mobile validation (India basic)
    if (!/^[6-9]\d{9}$/.test(trimmedMobileno)) {
      return toast.error("Enter a valid 10-digit mobile number");
    }

    // 🔴 Email validation (only if user entered something)

    // 🔴 Password strength (don’t be lazy here)
    if (trimmedPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

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

      // Better error handling (don’t show generic garbage)
      const message =
        error?.response?.data?.message ||
        "Failed to create account. Try again.";

      toast.error(message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f2efe9] to-[#e8e4db]">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#d4af37]/20 rounded-full blur-3xl"></div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-25 h-25 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-lg hover:scale-110 transition">
            <img
              src="/Amanpropertiesimage-removebg-preview.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Fill details to register
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-1/2 px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-1/2 px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none"
            />
          </div>

          <input
            type="text"
            name="mobileno"
            placeholder="Mobile Number"
            value={mobileno}
            onChange={(e) => setMobileno(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
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
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#d4af37] text-black font-semibold hover:bg-[#c19a2e] active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
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
