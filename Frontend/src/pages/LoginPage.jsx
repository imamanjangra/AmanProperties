import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/auth.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../service/Api";

export default function LoginPage() {
  const [Mobileno, setMobileno] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", {
        password,
        email: Mobileno.includes("@") ? Mobileno : undefined,
        mobileno: !Mobileno.includes("@") ? Mobileno : undefined,
      });

      // console.log("FULL RESPONSE:", data);

      const userData = data.user;

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      toast.success("Login successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f2efe9] to-[#e8e4db]">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/40 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        {/* Glow Effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#d4af37]/20 rounded-full blur-3xl"></div>

        {/* Top Image Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-25 h-25 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-lg transform transition duration-500 hover:scale-110">
            <img
              src="/Amanpropertiesimage-removebg-preview.png"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleLoginForm} className="mt-6 space-y-5">
          {/* Mobile Number or Email */}
          <div className="relative">
            <input
              type="text"
              placeholder="Mobile Number or Email"
              value={Mobileno}
              onChange={(e) => setMobileno(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#d4af37] text-black font-semibold hover:bg-[#c19a2e] active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-[#d4af37] cursor-pointer hover:underline ml-1"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
