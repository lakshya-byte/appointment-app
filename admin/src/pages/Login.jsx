import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin"); // Initial role set to Admin

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login successful!"); // Success toast
        } else {
          toast.error(data.message || "Login failed"); // Failure toast
        }
      } else {
        //for doctor
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message || "Login failed");
        }
      } 
    } catch (error) {
      toast.error("An error occurred during login"); // General error toast
      console.error("Login error:", error); // Log error to console for debugging
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "Admin" ? "Doctor" : "Admin"));
    setEmail(""); // Reset email and password fields
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <ToastContainer /> {/* Toast container added here */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-purple-300">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          {role} Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-purple-800 text-lg font-semibold"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              className="w-full px-4 py-3 mt-2 text-purple-900 border border-purple-300 rounded focus:outline-none focus:ring focus:ring-purple-300 transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-purple-800 text-lg font-semibold"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              className="w-full px-4 py-3 mt-2 text-purple-900 border border-purple-300 rounded focus:outline-none focus:ring focus:ring-purple-300 transition duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 transition duration-200 ease-in-out"
          >
            Login
          </button>
          <p
            onClick={toggleRole}
            className="text-center text-purple-700 underline cursor-pointer"
          >
            Switch to {role === "Admin" ? "Doctor" : "Admin"} Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
