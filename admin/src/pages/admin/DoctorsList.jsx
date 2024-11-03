import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
// import { useNavigate } from "react-router-dom";

const DoctorsList = () => {
  const { getAllDoctors, aToken, doctors , changeAvailabilty} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <img
              className="w-24 h-24 rounded-full object-cover mb-4"
              src={item.image}
              alt={`${item.name}`}
            />
            <p className="text-lg font-semibold text-center">{item.name}</p>
            <p className="text-sm text-gray-500 text-center mb-4">
              {item.speciality}
            </p>
            <div className="flex items-center space-x-2">
              <input onChange={()=>changeAvailabilty(item._id)} type="checkbox" checked={item.available} />
              <span className="text-sm text-gray-700">Available</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
