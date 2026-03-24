import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/auth.context";
import toast from "react-hot-toast";
import API from "../service/Api";

export default function SignupPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const { setUser } = useContext(AuthContext);
   const navigate = useNavigate();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/register", {
        firstname,
        lastname,
        password,
        email : email || null,
        mobileno
      });

      console.log(data);

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email || null,
        mobileno: data.mobileno || null,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

      toast.success("Account created successfully");
      navigate("/home");

    } catch (error) {
      console.log(error);
      toast.error("Failed to create account. Please check your details and try again.");
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
                src="/public/Amanpropertiesimage-removebg-preview.png"
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

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f7f5f2] border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none"
          />

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
          <span onClick={() => navigate('/login')} className="text-[#d4af37] cursor-pointer hover:underline ml-1">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
