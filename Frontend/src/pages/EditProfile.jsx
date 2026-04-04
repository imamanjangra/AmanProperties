import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../service/Api";
import { useNavigate } from "react-router-dom";
import { Camera, Lock } from "lucide-react";
import toast from "react-hot-toast";
import SEO from "../components/SEO.jsx";
export default function EditProfile() {
  const navigate = useNavigate();

  // 🔥 PROFILE DATA
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    mobileno: "",
  });

  // 🔥 PASSWORD DATA (separate)
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // 🔥 FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/users/userdata");
        const user = data.user;

        setForm({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          mobileno: user.mobileno || "",
        });

        setPreview(user.image || "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  // 🔥 INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 PASSWORD HANDLER
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 UPDATE PROFILE
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.patch("/users/update", form);

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await API.post("/users/updateImage", formData);
      }
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  // 🔥 UPDATE PASSWORD
  const handlePasswordUpdate = async () => {
    try {
      await API.post("/users/changePassword", passwordData);

      toast.success("Password updated successfully");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2]">
      <SEO title="Edit Profile | AmanProperties" description="Update your AmanProperties profile information and account settings." />
      <Navbar variant="light" />

      <div className="max-w-5xl mx-auto pt-28 px-4 space-y-6">

        {/* 🔥 PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-3 gap-8">

          {/* LEFT IMAGE */}
          <div className="flex flex-col items-center gap-4 border-r pr-6">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  className="w-28 h-28 rounded-full object-cover border-4 border-[#c9a24d]"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-800 text-white text-3xl font-bold">
                  {form.firstname?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <label className="absolute bottom-0 right-0 bg-[#c9a24d] p-2 rounded-full cursor-pointer shadow">
                <Camera className="w-4 h-4 text-black" />
                <input
                  type="file"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-gray-500 text-sm text-center">
              Change profile photo
            </p>
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleProfileUpdate}
            className="md:col-span-2 flex flex-col gap-5"
          >
            <h2 className="text-2xl font-bold">Edit Profile</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a24d]"
              />

              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a24d]"
              />
            </div>

        

            <input
              type="text"
              name="mobileno"
              value={form.mobileno}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a24d]"
            />

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-[#c9a24d] py-3 rounded-lg font-semibold"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 border py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* 🔥 PASSWORD CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-[#c9a24d]" />
            Change Password
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm Password"
              className="border rounded-lg px-4 py-3"
            />
          </div>

          <button
            onClick={handlePasswordUpdate}
            className="mt-4 bg-black text-white px-6 py-3 rounded-lg"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
}