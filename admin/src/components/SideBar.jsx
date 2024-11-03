import React from "react";
import { useContext } from "react";
import { FaCalendarAlt, FaUserPlus, FaListUl } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  return (
    
    <div className="bg-white h-screen w-64 shadow-lg">
      {aToken && (
        <h2 className="text-purple-700 text-2xl font-bold p-4 border-b border-purple-300">
          Admin Panel
        </h2>
      )}
      {aToken && (
        <nav className="mt-6">
          <ul>
            <li className="group">
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-purple-100 transition duration-300"
              >
                <MdOutlineDashboardCustomize className="mr-3 text-purple-600 group-hover:text-purple-700" />
                Dashboard
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => navigate("all-appointments")}
                className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-purple-100 transition duration-300"
              >
                <FaCalendarAlt className="mr-3 text-purple-600 group-hover:text-purple-700" />
                Appointments
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => navigate("add-doctor")}
                className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-purple-100 transition duration-300"
              >
                <FaUserPlus className="mr-3 text-purple-600 group-hover:text-purple-700" />
                Add Doctor
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => navigate("doctor-list")}
                className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-purple-100 transition duration-300"
              >
                <FaListUl className="mr-3 text-purple-600 group-hover:text-purple-700" />
                Doctors List
              </button>
            </li>
          </ul>
        </nav>
      )}
      {dToken && (
        <h2 className="text-purple-700 text-2xl font-bold p-4 border-b border-purple-300">
          Doctor Panel
        </h2>
      )}
      {dToken && (
        <nav className="mt-6">
          <ul>
            <li className="group">
              <button
                onClick={() => navigate("/doctor-dashboard")}
                className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-purple-100 transition duration-300"
              >
                <MdOutlineDashboardCustomize className="mr-3 text-purple-600 group-hover:text-purple-700" />
                Dashboard
              </button>
            </li>
            <li className="group">
              <button
                onClick={() => navigate("doctor-appointments")}
                className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-purple-100 transition duration-300"
              >
                <FaCalendarAlt className="mr-3 text-purple-600 group-hover:text-purple-700" />
                Appointments
              </button>
            </li>

            <li className="group">
              <button
                onClick={() => navigate("doctor-profile")}
                className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-purple-100 transition duration-300"
              >
                <FaListUl className="mr-3 text-purple-600 group-hover:text-purple-700" />
                Profile
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default SideBar;
