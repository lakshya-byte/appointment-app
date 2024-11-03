import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  // Filter doctors based on the speciality parameter; if not provided, return all doctors
  const filterDoctors = speciality
    ? doctors.filter((item) => item.speciality === speciality)
    : doctors;

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Left Side - Specialty Menu */}
      <div className="w-64 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold text-purple-600 mb-4">Specialties</h2>
        <div className="flex flex-col space-y-2">
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <button
              key={spec}
              className="text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition duration-300 text-left w-full font-serif"
              onClick={() => navigate(`/doctors/${encodeURIComponent(spec)}`)}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side - Doctor Cards */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
          Doctors {speciality ? `Specializing in ${speciality}` : "Available"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoctors.length > 0 ? (
            filterDoctors.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => navigate(`/appointment/${item._id}`)} // Navigate to appointment page with docId
              >
                <div className="relative w-full h-38">
                  <img
                    className="object-cover w-full h-full"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-purple-600">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No doctors found in this specialty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
