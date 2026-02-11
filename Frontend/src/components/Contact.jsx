import { useState } from "react";
import { motion } from "framer-motion";
import API from "../service/Api.jsx";
import toast from "react-hot-toast";

export default function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (number.length != 10) {
      toast.error("Mobile Number must be 10 digit !");
      return;
    }

    if (!firstname || !number || !purpose || !propertyType) {
      toast.error("Please fill compelete form !!");
    }
      const res = await API.post("/form", {
        firstName: firstname,
        lastName: lastname,
        mobileNo: Number(number),
        purpose: purpose,
        propertype: propertyType,
      });

    

      setFirstname("");
      setLastname("");
      setNumber("");
      setPurpose("");
      setPropertyType("");

       toast.success("Form submitted successfully")
    } catch (error) {
      console.error(error.response?.data || error.message);
       toast.error("Form submission failed")
    }
  };

  return (
    <section className="py-24 bg-slate-950 rounded-t-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-[#c9a24d]/10 text-[#c9a24d] px-4 py-2 rounded-full mb-4">
            Get In Touch
          </span>

          <h2 className="font-script text-4xl font-bold text-white mb-6">
            Let’s Find the Right Property for You
          </h2>

          <p className="text-slate-400 max-w-lg">
            Share your details and requirements. Our property experts will
            personally reach out to assist you.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-2xl space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <input
            type="tel"
            placeholder="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
          />

          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
          >
            <option value="">Select purpose</option>
            <option value="Buy">Buy Property</option>
            <option value="Sell">Sell Property</option>
          </select>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-[#d4af37]"
          >
            <option value="">Select property type</option>
            <option value="Plot">Plot</option>
            <option value="Home">Home</option>
            <option value="Floor">Floor</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-2 bg-[#d4af37] text-[#1a2a4e] py-3 rounded-md font-medium hover:bg-[#c19a2e] transition"
          >
            Request Consultation
          </motion.button>
        </motion.form>

      </div>
    </section>
  );
}
