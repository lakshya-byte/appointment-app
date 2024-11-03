import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import {useNavigate} from 'react-router-dom'
import AppContext from '../context/AppContext.jsx'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem("aToken");
    setAToken(null); 
  };

  return (
    <nav className="flex justify-between items-center bg-white text-gray-800 p-4 shadow-lg">
      <div className="flex items-center space-x-4">
        <img
        onClick={()=>navigate('/')}
          src={assets.admin_logo}
          alt="Logo"
          className="cursor-pointer" 
        />
        <h1 className="text-lg font-semibold border border-black bg-white text-black py-2 px-4 rounded-full shadow-md transform transition duration-300 hover:scale-105">
          Admin
        </h1>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md transform transition duration-300 hover:bg-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
