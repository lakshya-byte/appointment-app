import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Store dToken in localStorage whenever it changes
    localStorage.setItem("dToken", dToken);
  }, [dToken]);

  // Get all appointments from the API
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        { headers: { Authorization: `Bearer ${dToken}` } }
      );

      if (data.success) {
        const reversedAppointments = [...data.appointments].reverse();
        setAppointments(reversedAppointments);
        console.log(reversedAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments. Please try again later.");
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      console.log("Completing appointment with ID:", appointmentId);
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } } // Fixed header to use correct token
      );
      console.log("Response data:", data);

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error("Failed to complete appointment. Please try again.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      console.log("Canceling appointment with ID:", appointmentId);
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } } // Fixed header to use correct token
      );
      console.log("Response data:", data);

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error("Failed to cancel appointment. Please try again.");
    }
  };

  const value = {
    backendUrl,
    dToken,
    setDToken,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
