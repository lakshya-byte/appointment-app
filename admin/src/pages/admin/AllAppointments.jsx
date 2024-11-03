import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";  // Import SweetAlert2
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, formatDate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Function to handle appointment cancellation with confirmation
  const handleCancelAppointment = (appointmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will cancel the appointment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAppointment(appointmentId);
        Swal.fire("Cancelled!", "The appointment has been cancelled.", "success");
      }
    });
  };

  return (
    <div className="p-8 bg-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-600 mb-8">
        All Appointments
      </h1>

      <div className="grid grid-cols-7 gap-4 bg-purple-100 p-4 rounded-t-lg font-semibold text-purple-700 border-b border-purple-300">
        <p className="text-center">#</p>
        <p className="text-center">Patient</p>
        <p className="text-center">Age</p>
        <p className="text-center">Date & Time</p>
        <p className="text-center">Doctor</p>
        <p className="text-center">Fees</p>
        <p className="text-center">Actions</p>
      </div>

      {appointments.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-4 items-center p-4 bg-white border-b border-purple-200 hover:bg-purple-50 transition-all"
        >
          <p className="text-center text-gray-700 font-medium">{index + 1}</p>
          <div className="flex items-center justify-center space-x-4">
            <img
              src={item.userData.image}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border border-purple-200"
            />
            <p className="text-gray-800 font-semibold">{item.userData.name}</p>
          </div>
          <p className="text-center text-gray-600">
            {calculateAge(item.userData.dob)}
          </p>
          <p className="text-center text-gray-600">
            {formatDate(item.slotDate)} , {item.slotTime}
          </p>

          {/* Doctor image and name aligned in a single line */}
          <div className="flex items-center justify-center space-x-4">
            <img
              src={item.docData.image}
              alt="Doctor"
              className="w-8 h-8 rounded-full object-cover border border-purple-200"
            />
            <p className="text-gray-600 font-semibold">{item.docData.name}</p>
          </div>

          <p className="text-center text-gray-600">${item.docData.fee}</p>
          
          {/* Actions column with Paid/Not Paid and Cancel/Cancelled buttons */}
          <div className="flex flex-col items-center space-y-2">
            {item.payment ? (
              <button
                className="w-full border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                onClick={() => Swal.fire("Payment already received", "", "info")}
              >
                Paid
              </button>
            ) : (
              <button
                className="w-full border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                onClick={() => Swal.fire("Payment not received", "", "info")}
              >
                Not Paid
              </button>
            )}

            {/* Conditional rendering of Cancelled or Cancel Icon */}
            {item.cancelled ? (
              <button className="w-full border border-gray-500 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                Cancelled
              </button>
            ) : (
              <img
                src={assets.cancel_icon}
                alt="Cancel Appointment"
                className="w-10 h-10 cursor-pointer p-2 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                onClick={() => handleCancelAppointment(item._id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllAppointments;
