import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO.jsx";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      desc: "We collect personal information that you voluntarily provide to us when you register on Aman Properties, express an interest in obtaining information about us or our products, or when you participate in activities on the platform. This includes names, phone numbers, email addresses, and property location details."
    },
    {
      title: "How We Use Your Information",
      desc: "We use the information we collect to facilitate account creation, enable user-to-user communication (via live chat), and display property listings on our home page after admin verification. We also use your contact info to provide support and respond to inquiries."
    },
    {
      title: "Property Data Visibility",
      desc: "When you list a property, certain information—such as property images, description, price, and location—will be visible to all visitors of the website. Personal contact details are only shared with verified buyers or as per your settings in the appointment system."
    },
    {
      title: "Data Security",
      desc: "We aim to protect your personal information through a system of organizational and technical security measures within our authentication system. However, please remember that no method of transmission over the internet is 100% secure."
    },
    {
      title: "Contact Us",
      desc: "If you have questions or comments about this policy, you may email us at AmanPropertie@email.com or contact us via our Haryana, India office."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f2ed] via-white to-[#f5f2ed] py-16 px-4">
      <SEO title="Privacy Policy | AmanProperties" description="Learn how AmanProperties handles and protects your personal data." />
      <Navbar variant="light" />
      
      <div className="max-w-4xl mt-20 mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600">
            Your privacy is important to us. This policy explains how we handle your data.
          </p>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-10"
        >
          {sections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <span className="text-[#c6a46c]">{i + 1}.</span> {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed pl-7">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p className="text-center mt-10 text-sm text-gray-400 italic">
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>
      </div>
      
      <Footer />
    </div>
  );
}