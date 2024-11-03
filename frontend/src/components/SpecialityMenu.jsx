import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="py-16 bg-gradient-to-r from-purple-50 to-purple-100"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6">
          Find by Speciality
        </h1>
        <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
          Browse our extensive list of trusted doctors and schedule your
          appointment hassle-free.
        </p>

        {/* Speciality Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl hover:bg-purple-50 transition-transform transform hover:scale-105 duration-300"
            >
              {/* Speciality Image */}
              <img
                src={item.image}
                alt={item.speciality}
                className="w-28 h-28 mx-auto mb-5 rounded-full object-cover"
              />
              {/* Speciality Name */}
              <p className="text-purple-700 text-xl font-semibold">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
