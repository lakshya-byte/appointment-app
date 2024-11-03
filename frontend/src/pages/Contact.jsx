import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16 flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src={assets.contact_image}
          alt="Contact Us"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Contact Information */}
      <div className="w-full md:w-1/2 space-y-8">
        {/* Title */}
        <div className="text-4xl font-bold text-purple-700">
          CONTACT <span className="text-purple-900">US</span>
        </div>

        {/* Office Information */}
        <div>
          <p className="text-xl font-semibold text-gray-800">OUR OFFICE</p>
          <p className="text-gray-600 mt-2">
            00000 Willms Station Suite 000, Washington, USA
            <br />
            Tel: (000) 000-0000
            <br />
            Email: <a href="mailto:greatstackdev@gmail.com" className="text-purple-600 underline">greatstackdev@gmail.com</a>
          </p>
        </div>

        {/* Careers Section */}
        <div>
          <p className="text-xl font-semibold text-gray-800">CAREERS AT PRESCRIPTO</p>
          <p className="text-gray-600 mt-2">Learn more about our teams and job openings.</p>
        </div>

        {/* Explore Jobs Button */}
        <div>
          <button className="bg-purple-700 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-800 transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

