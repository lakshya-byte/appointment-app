import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(""); // State to store selected slot time
  const slotsRef = useRef(null);

  // Fetch doctor information based on docId
  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Fetch available slots
  const getAvailableSlots = async () => {
    let today = new Date();
    let slotsArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let month = currentDate.getMonth() + 1;

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsArray.push(timeSlots);
    }

    setDocSlots(slotsArray);
  };

  // Book appointment function
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      navigate("/login");
      return;
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error booking appointment:", error);
    }
  };

  useEffect(() => {
    getDoctorsData(); // Ensure doctors data is fetched
  }, []);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const handleDayClick = (index) => {
    setSlotIndex(index);
    setSlotTime(""); // Reset slotTime when changing day
    if (slotsRef.current) {
      slotsRef.current.scrollLeft = 0; // Reset scroll position on day change
    }
  };

  const handleSlotClick = (time) => {
    setSlotTime(time); // Set the selected slot time
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {docInfo ? (
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
          {/* Left Side - Doctor Image */}
          <div className="w-1/2 bg-purple-600 flex items-center justify-center">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Doctor Details */}
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-purple-600 mb-2">
              {docInfo.name}
            </h1>
            <h2 className="text-2xl text-gray-700 mb-4">
              {docInfo.speciality}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Degree:</strong> {docInfo.degree}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Experience:</strong> {docInfo.experience} years
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>About:</strong> {docInfo.about}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Fees:</strong> ${docInfo.fee}
            </p>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Address:
            </h3>
            <p className="text-lg text-gray-600">
              {docInfo?.address?.line1 || "Address line 1 not available"}
            </p>
            <p className="text-lg text-gray-600">
              {docInfo?.address?.line2 || "Address line 2 not available"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Loading doctor information...
        </p>
      )}

      {/* Day Selection */}
      <div className="flex space-x-4 mt-4">
        {daysOfWeek.map((day, index) => {
          const today = new Date();
          const date = new Date(today.setDate(today.getDate() + index));
          const formattedDate = `${date.getDate()}`; // format as dd-mm

          return (
            <button
              key={index}
              onClick={() => handleDayClick(index)}
              className={`px-4 py-2 rounded-lg ${
                slotIndex === index
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } transition duration-300 flex flex-col items-center`}
            >
              <span>{day}</span>
              <span className= "text-sm text-gray-500">{formattedDate}</span>
            </button>
          );
        })}
      </div>

      {/* Slots Display - Horizontal Carousel */}
      <div className="cursor-pointer mt-6 w-full flex justify-center">
        <div className="max-w-lg w-full overflow-hidden relative">
          <div
            ref={slotsRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hidden"
            style={{
              overflowY: "hidden",
              overflowX: "auto",
              scrollbarWidth: "none", // Hides scrollbar
            }}
          >
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSlotClick(item.time)} // Click to set slot time
                  className={`p-3 rounded-lg text-center shadow transition duration-300 ${
                    slotTime === item.time
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <p className="text-sm font-semibold">{item.time}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Book Appointment Button */}
      <div className="mt-4">
        <button
          onClick={bookAppointment}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-500 transition duration-300"
        >
          Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div>
        {docInfo && (
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        )}
      </div>
    </div>
  );
};

export default Appointments;
