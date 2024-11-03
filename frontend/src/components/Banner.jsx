import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-8 md:p-16">
      {/*-------------left side------------ */}
      <div className="text-center md:text-left md:max-w-md">
        <p className="text-lg font-semibold text-blue-600">Book Appointment</p>
        <p className="mt-4 text-2xl md:text-4xl font-bold text-gray-800">
          With 100+ Trusted Doctors
        </p>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create account
        </button>
      </div>

      {/*-------------right side------------ */}
      <div className="mt-8 md:mt-0">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full md:w-96 h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
