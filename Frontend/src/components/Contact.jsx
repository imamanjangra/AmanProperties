import { useState } from "react";
import API from "../service/Api";

export default function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/form", {
        firstName: firstname,
        lastName: lastname,
        mobileNo: Number(number),
        purpose: purpose,
        propertype: propertyType,
      });

      console.log(res.data);

      setFirstname("");
      setLastname("");
      setNumber("");
      setPurpose("");
      setPropertyType("");

      alert("Form submitted successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Form submission failed");
    }
  };

  return (
    <section className="py-24 bg-slate-950 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center ">

        <div>
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-2xl space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="border p-3 rounded"
            />
          </div>

          <input
            type="tel"
            placeholder="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="border p-3 rounded w-full"
          />

          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="border p-3 rounded w-full"
          >
            <option value="">Select purpose</option>
            <option value="Buy">Buy Property</option>
            <option value="Sell">Sell Property</option>
          </select>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
            className="border p-3 rounded w-full"
          >
            <option value="">Select property type</option>
            <option value="Plot">Plot</option>
            <option value="Home">Home</option>
            <option value="Floor">Floor</option>
          </select>

          <button
            type="submit"
            className="font-nav w-full bg-slate-900 text-white py-3 rounded hover:bg-[#c9a24d]"
          >
            Request Consultation
          </button>
        </form>
      </div>
    </section>
  );
}
