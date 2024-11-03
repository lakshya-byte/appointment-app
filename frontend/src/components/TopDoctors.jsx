import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-10">
        {/* Professional Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Top Doctors to Book
        </h1>
        <p className="text-gray-600 text-lg">
          Simply browse through our extensive list of trusted doctors and book
          your appointment.
        </p>
      </div>

      {/* Vertical Rectangle Doctor Cards */}
      <div className=" cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Doctor Image */}
            <div className="h-48 flex justify-center items-center">
              <img
                src={item.image}
                alt={item.name || "Doctor"}
                className="h-full w-auto object-cover"
              />
            </div>
            <div className="p-6 flex flex-col">
              {/* Doctor Name */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              {/* Speciality */}
              <p className="text-gray-600 text-lg mb-4">{item.speciality}</p>
              {/* Book Appointment Button */}
              <button className="mt-auto bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-gray-800 text-white text-lg py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
