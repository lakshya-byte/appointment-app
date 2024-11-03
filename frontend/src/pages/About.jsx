import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-8 space-y-8 font-sans">
      {/* Image and Text Section */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-8 md:space-y-0 md:space-x-8 w-full">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-full md:w-3/4 h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <p className="text-3xl font-bold text-purple-600">
            About <span className="text-purple-800">Us</span>
          </p>
          <p className="font-serif text-gray-700 leading-relaxed">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to scheduling
            doctor appointments and managing their health records.
            <br />
            <br />
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing
            care, Prescripto is here to support you every step of the way.
            <br />
            <br />
            <strong>Our Vision:</strong> Our vision at Prescripto is to create a
            seamless healthcare experience for every user. We aim to bridge the
            gap between patients and healthcare providers, making it easier for
            you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">WHY CHOOSE US</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="cursor-pointer w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200 transform transition duration-300 hover:scale-105 hover:bg-purple-600 hover:text-white hover:shadow-lg">
            <p className="text-xl font-semibold mb-2">EFFICIENCY</p>
            <p className="text-gray-700 hover:text-white">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className=" cursor-pointer w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200 transform transition duration-300 hover:scale-105 hover:bg-purple-600 hover:text-white hover:shadow-lg">
            <p className="text-xl font-semibold mb-2">CONVENIENCE</p>
            <p className="text-gray-700 hover:text-white">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className=" cursor-pointer w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200 transform transition duration-300 hover:scale-105 hover:bg-purple-600 hover:text-white hover:shadow-lg">
            <p className="text-xl font-semibold mb-2">PERSONALIZATION</p>
            <p className="text-gray-700 hover:text-white">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

