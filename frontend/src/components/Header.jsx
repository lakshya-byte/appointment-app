import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="bg-purple-50 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 lg:px-12">
        {/* -----left side----- */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold text-purple-800 mb-4">
            Book Appointment <br />
            With Trusted Doctors
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment hassle-free.
          </p>
          <div className="flex items-center justify-center lg:justify-start mb-4">
            <img
              src={assets.group_profiles}
              alt="Group Profiles"
              className="h-16  mr-4" // Increased size of the profile image
            />
            <p className="text-gray-600">
              100+ expert doctors available.
            </p>
          </div>
          <a
            href="#speciality"
            className="inline-flex items-center px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
          >
            Book appointment
            <img
              src={assets.arrow_icon}
              alt="Arrow Icon"
              className="ml-2 h-4 w-4"
            />
          </a>
        </div>

        {/* -----right side----- */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={assets.header_img}
            alt="Header Image"
            className="w-full lg:w-4/5 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
