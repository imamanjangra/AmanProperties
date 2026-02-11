import { useState } from "react";
import toast from "react-hot-toast";
import API from "../service/Api.jsx";
export default function ContactBox() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertype, setPropertype] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobileNo.length !== 10) {
      toast.error("Mobile Number must be 10 digit !");
      return;
    }

    if (!firstName || !mobileNo || !purpose || !propertype) {
      toast.error("Please fill complete form !!");
      return;
    }

    try {
      const res = await API.post("/form", {
        firstName,
        lastName,
        mobileNo: Number(mobileNo),
        purpose,
        propertype,
      });

      toast.success("Form submitted successfully");

      setFirstName("");
      setLastName("");
      setMobileNo("");
      setPurpose("");
      setPropertype("");
    } catch (error) {
        console.log(error);
      toast.error("Failed to submit Form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Name Row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-[#1a2a4e] mb-1">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div>
          <label className="block text-sm text-[#1a2a4e] mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm text-[#1a2a4e] mb-1">
          Mobile Number
        </label>
        <input
          type="tel"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
        />
      </div>

      {/* Purpose */}
      <div>
        <label className="block text-sm text-[#1a2a4e] mb-1">
          Purpose
        </label>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
        >
          <option value="">Select Purpose</option>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm text-[#1a2a4e] mb-1">
          Property Type
        </label>
        <select
          value={propertype}
          onChange={(e) => setPropertype(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
        >
          <option value="">Select Property Type</option>
          <option value="Plot">Plot</option>
          <option value="Home">Home</option>
          <option value="Floor">Floor</option>
        </select>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full mt-2 bg-[#d4af37] text-[#1a2a4e] py-3 rounded-md font-medium hover:bg-[#c19a2e] transition"
      >
        Send Message
      </button>
    </form>
  );
}
