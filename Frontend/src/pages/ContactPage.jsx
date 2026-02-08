import React, { useState } from "react";
import API from "../service/Api";

const ContactPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertype, setPropertype] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/form", {
        firstName,
        lastName,
        mobileNo: Number(mobileNo),
        purpose,
        propertype,
      });

      console.log(res.data);
      alert("Message sent successfully!");

      setFirstName("");
      setLastName("");
      setMobileNo("");
      setPurpose("");
      setPropertype("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to send message");
    }
  };

  return (
    <div>
    
      <section className="w-full h-[80vh] lg:h-[60vh] relative">
        <img
          src="https://sobharealty.com/sites/default/files/styles/webp/public/2024-07/banner-1400x726.jpg.webp?itok=J6GW-yox"
          alt="Contact Hero"
          className="w-full h-full object-cover rounded-b-3xl"
        />
      </section>

    
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

          
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-[#1a2a4e] mb-6 text-2xl font-semibold">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
              
                <div>
                  <label className="block text-[#1a2a4e] mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

               
                <div>
                  <label className="block text-[#1a2a4e] mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

              
                <div>
                  <label className="block text-[#1a2a4e] mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

              
                <div>
                  <label className="block text-[#1a2a4e] mb-2">Purpose</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">Select Purpose</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                  </select>
                </div>

            
                <div>
                  <label className="block text-[#1a2a4e] mb-2">Property Type</label>
                  <select
                    value={propertype}
                    onChange={(e) => setPropertype(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">Select Property Type</option>
                    <option value="Plot">Plot</option>
                    <option value="Home">Home</option>
                    <option value="Floor">Floor</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d4af37] text-[#1a2a4e] px-6 py-4 rounded-lg hover:bg-[#c19a2e] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
                    
            <div className="space-y-6">
             
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-[#1a2a4e] mb-6 text-xl font-semibold">
                  Contact Information
                </h3>
                <div className="space-y-6">
                
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a2a4e] p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-[#d4af37]"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#1a2a4e] mb-1 font-medium">Office Address</h4>
                      <p className="text-gray-600">Gharaunda, Karnal</p>
                    </div>
                  </div>

               
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a2a4e] p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-[#d4af37]"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#1a2a4e] mb-1 font-medium">Phone</h4>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-[#d4af37] transition-colors">
                       +91 9255446593
                      </a>
                    </div>
                  </div>

              
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a2a4e] p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-[#d4af37]"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#1a2a4e] mb-1 font-medium">Email</h4>
                      <a href="mailto:info@eliteproperties.com" className="text-gray-600 hover:text-[#d4af37] transition-colors">
                       amanproperties.@email.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#25D366] text-white px-6 py-4 rounded-lg hover:bg-[#20ba5a] transition-all hover:scale-105 flex items-center justify-center gap-2">
                  WhatsApp
                </button>
                <button className="bg-[#1a2a4e] text-white px-6 py-4 rounded-lg hover:bg-[#2a3a5e] transition-all hover:scale-105 flex items-center justify-center gap-2">
                  Call Now
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-64 mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.195059679129!2d76.97025117539334!3d29.53981327518153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e7700337d796d%3A0x4162340ae00b672e!2sRailway%20road%20gharaunda!5e0!3m2!1sen!2sin!4v1770480607960!5m2!1sen!2sin" 
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  title="Office Location"
                  className="border-0"
                ></iframe>
              </div>
            </div>
           
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
