import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO.jsx";
export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5f2ed] via-white to-[#f5f2ed] py-16 px-4">
        <SEO title="Terms & Conditions | AmanProperties" description="Read the terms and conditions for using AmanProperties. Understand our policies, your rights, and obligations as a user of our platform." />
        <Navbar variant="light" />
      <div className="max-w-4xl mt-20 mb-0 mx-auto">

        {/* HEADER */}  
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-600">
            Please read these terms carefully before using our platform.
          </p>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-8 space-y-8"
        >

          {/* SECTION */}
          {[
            {
              title: "1. Introduction",
              desc: "AmanProperties is a digital real estate platform created to simplify the process of buying, selling, renting, and listing properties. The platform serves as a medium that connects property owners, agents, buyers, tenants, and other users by providing tools and features for listing, discovering, and communicating about real estate opportunities. It is important to understand that AmanProperties operates solely as an intermediary and does not act as a real estate broker, agent, or legal advisor unless explicitly stated otherwise. We do not take ownership of any property listed on the platform, nor do we guarantee the successful completion of any transaction. While we strive to provide accurate and useful information, users are solely responsible for independently verifying property details, ownership, documentation, pricing, and legal status before making any decisions. The platform should be used as an informational and communication tool rather than a final authority for property-related matters."
            },
            {
              title: "2. User Account and Security",
              desc: "In order to access certain features of AmanProperties, you may be required to create a user account. During registration, you must provide accurate and complete information and ensure that your details remain updated at all times. You are solely responsible for maintaining the confidentiality of your account credentials, including your username and password. Any activity that occurs under your account will be considered your responsibility, regardless of whether such activity was authorized by you. You agree to immediately notify AmanProperties in case of any unauthorized use, suspected breach, or security issue related to your account. AmanProperties shall not be held liable for any loss, damage, or unauthorized actions resulting from your failure to safeguard your account information. We reserve the right to suspend or terminate accounts that are found to be compromised, inactive, or involved in suspicious activities."
            },
            {
              title: "3.Termination of Access",
              desc: "AmanProperties reserves the right to suspend, restrict, or terminate user access at any time, without prior notice, if any violation of these Terms and Conditions is detected. This includes, but is not limited to, misuse of the platform, fraudulent activities, or breach of applicable laws. Users may also choose to discontinue their use of the platform at any time. Upon termination, certain data may be retained for legal, administrative, or security purposes as required by law."
            },
            {
              title: "4. Admin Verification & Listing Policy",
              desc: "To maintain the quality of Aman Properties, all listings undergo a mandatory admin verification process. Properties will typically appear on the home page within 24-48 hours of submission. We reserve the right to reject or remove any listing that contains low-quality images, inaccurate pricing, or suspicious contact details. Admin approval is a quality check and does not constitute a legal guarantee of the property's condition or ownership."
            },
            {
              title: "5. Prohibited Activities",
              desc: "Users of AmanProperties are expected to maintain a high standard of integrity and lawful behavior while using the platform. Any activity that compromises the security, functionality, or reputation of the platform is strictly prohibited. This includes, but is not limited to, posting false or misleading information, engaging in fraudulent transactions, attempting to gain unauthorized access to the system, introducing malicious software, using automated tools without permission, or violating any applicable laws. Any user found engaging in such activities may face immediate suspension or permanent termination of their account, along with potential legal action depending on the severity of the violation. AmanProperties reserves the right to investigate and take appropriate action against any misuse of the platform."
            },
            {
              title: "6. Privacy Policy",
              desc: "AmanProperties is committed to protecting user privacy and handling personal data responsibly. By using the platform, you consent to the collection, storage, and use of your information in accordance with our Privacy Policy. While we implement reasonable security measures to protect user data, we cannot guarantee complete protection against unauthorized access or breaches. Users are encouraged to take necessary precautions to safeguard their personal information and report any suspicious activity."
            },

            {
              title: "7. Changes to Terms",
              desc: "AmanProperties reserves the right to update, modify, or revise these Terms and Conditions at any time without prior notice. Any changes will be effective immediately upon posting on the platform. It is the user’s responsibility to review these terms periodically to stay informed. Continued use of the platform after any modifications indicates acceptance of the updated terms."
            },
            {
              title: "8. Disclaimer",
              desc: "AmanProperties does not provide legal, financial, or real estate advisory services. All information available on the platform is for general informational purposes only and should not be considered as professional advice. Users are strongly encouraged to consult qualified professionals before making any property-related decisions. The platform shall not be held responsible for any decisions made based on the information provided."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="border-b pb-6 last:border-none"
            >
              <h2 className="text-xl font-semibold text-black mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </motion.div>

        {/* FOOTER NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.div>

      </div>
      <Footer/>
    </div>
  );
}
