import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [docId, speciality, doctors]);

  return (
    <>
      {/* Section Heading */}
      <div className="text-center my-8">
        <h2 className="text-2xl font-bold text-purple-600">Related Doctors</h2>
        <p className="text-gray-600">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relDoc.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              {/* Doctor Image */}
              <img
                onClick={() => navigate(`/appointment/${item._id}`)}
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            <div className="p-4">
              {/* Doctor Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              {/* Speciality */}
              <p className="text-sm text-gray-600">
                Speciality: {item.speciality}
              </p>
              {/* Experience */}
              <p className="text-sm text-gray-600">Experience: {item.experience} years</p>
              {/* View More Button */}
              <button
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-500 transition-colors duration-300"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RelatedDoctors;

