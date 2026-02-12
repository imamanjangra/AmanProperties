import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import API from "../Services/API.jsx";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/Authcontext.jsx";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/admin/FormData");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

    try {
      const { data } = await API.post("/admin/login", {
       username: trimmedUsername,
       password: trimmedPassword,
      });

      localStorage.setItem("token", data.token);
      setUser(data.token);

      toast.success("Admin login successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid username or password");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-black">
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
          
          <h1 className="text-white text-3xl font-semibold mb-2">
            Admin Login
          </h1>
          <p className="text-slate-400 mb-6 text-sm">
            Sign in to access dashboard
          </p>

          {/* Username */}
          <div className="relative mb-5">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              className="w-full bg-slate-950 text-white pl-11 pr-4 py-3 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-slate-950 text-white pl-11 pr-11 py-3 rounded-xl border border-slate-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-600/30"
          >
            Login
          </button>

        </div>
      </form>
    </div>
  );
}
