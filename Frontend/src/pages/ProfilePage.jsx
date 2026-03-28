import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Home, Eye, MessageCircle, LogOut, Phone } from "lucide-react";
import { AuthContext } from "../Contexts/auth.context";
import { useNavigate } from "react-router-dom";
import API from "../service/Api";
import ContactButtons from "../components/ContactButtons";

export default function ProfilePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/users/userdata");
        const propRes = await API.get("/properties/getuserproperties");

        setUser(userRes.data.user);
        setProperties(propRes.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔥 STATS
  const total = properties.length;
  const approved = properties.filter(p => p.isverifed).length;
  const pending = properties.filter(p => !p.isverifed).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f2]">
      <Navbar variant="light" />
       <ContactButtons/>
      <div className="w-full bg-[#f8f6f2] flex flex-col lg:flex-row gap-8 px-6 lg:px-10 xl:px-20 pt-24 pb-12 flex-1">

        {/* 🔥 LEFT PROFILE */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 flex flex-col items-center gap-5">

            {/* IMAGE */}
            {user?.image ? (
              <img
                src={user.image}
                alt="profile"
                className="w-24 h-24 rounded-full border-2 border-[#c9a24d] object-cover"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-[#c9a24d] bg-gray-800 text-white text-3xl font-bold">
                {user?.firstname?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            {/* NAME */}
            <h2 className="text-xl font-bold text-center">
              {user ? `${user.firstname} ${user.lastname}` : "Loading..."}
            </h2>

            {/* PHONE */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Phone className="w-4 h-4 text-[#c9a24d]" />
              <span>{user?.mobileno || "No number"}</span>
            </div>

            {/* ACTIONS */}
            <div className="w-full flex flex-col gap-3 mt-4">
              <button
                onClick={() => navigate("/editProfile")}
                className="py-3 bg-[#c9a24d] rounded-xl font-semibold"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/addproperty")}
                className="py-3 bg-yellow-400 rounded-xl font-semibold"
              >
                Add Property
              </button>

              <button
                onClick={handleLogout}
                className="py-3 bg-red-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* 🔥 RIGHT SIDE */}
        <div className="lg:w-2/3 flex flex-col gap-6">

          {/* 🔥 STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Listings" value={total} />
            <StatCard title="Approved" value={approved} />
            <StatCard title="Pending" value={pending} />
          </div>

          {/* DASHBOARD CTA */}
          <div className="bg-white rounded-2xl p-6 shadow flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                Manage your properties
              </h3>
              <p className="text-sm text-gray-500">
                Track approvals, visibility and performance
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Go to Dashboard
            </button>
          </div>

          {/* 🔥 RECENT PROPERTIES */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-5">
              Recent Properties
            </h3>

            {properties.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No properties added yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {properties.slice(0, 2).map((p) => (
                  <div
                    key={p._id}
                    className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    {/* IMAGE */}
                    <img
                      src={p.images?.[0]?.url}
                      className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* STATUS */}
                    <div className="absolute top-3 left-3">
                      {p.isverifed ? (
                        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                          Approved
                        </span>
                      ) : (
                        <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-semibold text-lg">
                        {p.propertyName}
                      </h4>

                      <p className="text-xs text-gray-200">
                        {p.location}
                      </p>

                      <div className="flex justify-between mt-2">
                        <span className="text-[#c9a24d] font-bold">
                          ₹ {p.price}
                        </span>

                        {p.isverifed && (
                          <span className="text-xs">
                            {p.isShow ? "Live" : "Hidden"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

// 🔥 STAT CARD
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow text-center hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-[#c9a24d]">{value}</p>
    </div>
  );
}