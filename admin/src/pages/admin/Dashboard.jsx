import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);
  const { formatDate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="flex items-center p-4 bg-white shadow rounded-lg">
            <img src={assets.doctor_icon} alt="Doctors" className="w-16 h-16 mr-4" />
            <div>
              <p className="text-2xl font-bold text-purple-600">{dashData.doctors}</p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white shadow rounded-lg">
            <img src={assets.appointment_icon} alt="Appointments" className="w-16 h-16 mr-4" />
            <div>
              <p className="text-2xl font-bold text-purple-600">{dashData.appointments}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white shadow rounded-lg">
            <img src={assets.patients_icon} alt="Patients" className="w-16 h-16 mr-4" />
            <div>
              <p className="text-2xl font-bold text-purple-600">{dashData.patients}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Latest Appointments</h2>
          <div>
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b border-purple-200">
                <div className="flex items-center">
                  <img src={item.userData.image} alt="User" className="w-12 h-12 rounded-full border border-purple-200 mr-3" />
                  <div>
                    <div className="font-medium text-gray-800">{item.userData.name}</div>
                    <div className="text-gray-500">Booking on: {formatDate(item.slotDate)} at {item.slotTime}</div>
                  </div>
                </div>
                {!item.cancelled ? (
                  <div className="flex items-center">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel Appointment"
                      className=" w-16 h-16 cursor-pointer hover:bg-red-200 rounded-full p-1 transition-all duration-200"

                    />
                  </div>
                ) : (
                  <div className="text-red-600">cancelled</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
