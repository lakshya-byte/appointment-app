import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    getAppointments,
    appointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  
  const { formatDate, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]); // Added getAppointments as a dependency

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">All Appointments</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-7 gap-4 bg-purple-700 text-white py-3 px-4 font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        <div className="divide-y divide-gray-200">
          {appointments.map((item, index) => (
            <div key={item._id} className="grid grid-cols-7 gap-4 items-center py-4 px-4 hover:bg-gray-100">
              <p className="font-medium">{index + 1}</p>
              <div className="flex items-center">
                <img src={item.userData.image} alt="Patient" className="w-10 h-10 rounded-full mr-3" />
                <span className="font-semibold">{item.userData.name}</span>
              </div>
              <p>{calculateAge(item.userData.dob)} Years</p>
              <p>
                <button className={`py-1 px-3 rounded-full text-white ${item.payment ? "bg-green-500" : "bg-red-500"}`}>
                  {item.payment ? "Paid" : "Not Paid"}
                </button>
              </p>
              <p>
                {formatDate(item.slotDate)} <br /> {item.slotTime}
              </p>
              <p className="font-medium">₹{item.docData.fee}</p>
              <div>
                {!item.isCompleted && (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel Appointment"
                    className="w-10 h-10 cursor-pointer hover:bg-red-100 p-2 rounded-full border-2 border-red-500"
                  />
                )}
                <img
                  onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  alt="Complete Appointment"
                  className="my-2 w-10 h-10 cursor-pointer hover:bg-green-100 p-2 rounded-full border-2 border-green-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
