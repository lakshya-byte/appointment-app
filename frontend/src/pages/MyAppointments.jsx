import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const navigate = useNavigate();

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointmentHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAppointment(id); // Fixed reference to `id`
        Swal.fire(
          "Cancelled!",
          "Your appointment has been cancelled.",
          "success"
        );
      }
    });
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        // console.log(data.order);
        initPay(data.order);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center">
      {appointments.map((item, index) => (
        <div
          key={index}
          className="flex items-center border rounded-lg shadow-md p-6 mb-4 w-full max-w-6xl"
        >
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="w-24 h-24 object-cover rounded-full shadow-md"
            />
          </div>
          {/* Details Section */}
          <div className="flex-grow ml-4">
            <h2 className="text-lg font-semibold">{item.docData.name}</h2>
            <p className="text-gray-500">{item.docData.speciality}</p>
            <p>{item.docData.address.line1}</p>
            <p>{item.docData.address.line2}</p>
            <div>
              Date&Time: <span>{item.slotDate}</span> |{" "}
              <span>{item.slotTime}</span>
            </div>
          </div>
          {/* Button Section */}
          <div className="flex flex-col items-end ml-4">
            <div>
              {!item.cancelled && item.payment && (
                <button
                  onClick={() => {
                    Swal.fire({
                      icon: "info",
                      title: "Payment already received",
                      text: "This payment has been processed successfully.",
                      confirmButtonColor: "#4CAF50", // Green color for confirm button
                    });
                  }}
                  className="border-2 border-green-500 text-green-500 py-2 px-16 my-2 rounded-lg hover:bg-green-500 hover:text-white transition-colors duration-300"
                >
                  Paid 
                </button>
              )}
            </div>
            {!item.cancelled && !item.payment && (
              <button
                onClick={() => appointmentRazorpay(item._id)}
                className="bg-green-500 text-white py-2 px-6 w-44 rounded-lg mb-2 hover:bg-green-600"
              >
                Pay Online
              </button>
            )}
            {item.cancelled ? (
              <button
                onClick={() =>
                  Swal.fire({
                    title: "Notice",
                    text: "Your appointment has already been cancelled.",
                    icon: "info",
                    confirmButtonText: "okay",
                  })
                }
                className="border border-red-500 text-red-500 py-2 px-6 w-44 rounded-lg hover:bg-red-600 hover:text-white"
              >
                appointment cancelled
              </button>
            ) : (
              <button
                onClick={() => cancelAppointmentHandler(item._id)} // Corrected usage
                className="bg-red-500 text-white py-2 px-6 w-44 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
