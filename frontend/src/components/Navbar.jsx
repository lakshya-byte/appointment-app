import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
                             
const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken , userData} = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = () => setShowMenu(true);
  const handleMouseLeave = () => setShowMenu(false);

  const logoutHandler = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-white shadow-md">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="h-12 w-auto cursor-pointer"
        />

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-purple-700 font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-purple-700" : ""
            }
          >
            <li className="cursor-pointer">HOME</li>
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-purple-700" : ""
            }
          >
            <li className="cursor-pointer">ALL DOCTORS</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-purple-700" : ""
            }
          >
            <li className="cursor-pointer">ABOUT</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-purple-700" : ""
            }
          >
            <li className="cursor-pointer">CONTACT</li>
          </NavLink>
        </ul>

        {/* Mobile Menu Toggle */}
        {isMobileMenuOpen ? (
          <button onClick={toggleMobileMenu} className="md:hidden">
            <img src={assets.cross_icon} alt="Menu" className="h-6 w-6" />
          </button>
        ) : (
          <button onClick={toggleMobileMenu} className="md:hidden">
            <img src={assets.dropdown_icon} alt="Menu" className="h-6 w-6" />
          </button>
        )}
        {/* Button / Profile Section for Desktop */}
        <div
          className="hidden md:flex items-center relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {token ? (
            <div className="flex items-center">
              <img
                src={userData.image}
                alt="Profile"
                className="h-10 w-10 rounded-full border border-purple-700 cursor-pointer"
              />
              <img
                src={assets.dropdown_icon}
                alt="Dropdown"
                className="h-5 w-5 ml-2 cursor-pointer"
              />
              {showMenu && (
                <div className="absolute right-0 mt-44 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    <NavLink to={"/my-profile"}>
                      <li className="px-4 py-2 text-purple-700 hover:bg-purple-100 cursor-pointer">
                        MY Profile
                      </li>
                    </NavLink>
                    <NavLink to={"/my-appointments"}>
                      <li className="px-4 py-2 text-purple-700 hover:bg-purple-100 cursor-pointer">
                        My appointments
                      </li>
                    </NavLink>
                    <li
                      onClick={logoutHandler}
                      className="px-4 py-2 text-purple-700 hover:bg-purple-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-700 text-white hover:bg-purple-600 px-5 py-2 rounded-lg transition duration-300"
            >
              Create account
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center text-purple-700 font-semibold py-4 space-y-4">
            <NavLink
              to="/"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-purple-700" : ""
              }
            >
              <li className="cursor-pointer">HOME</li>
            </NavLink>
            <NavLink
              to="/doctors"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-purple-700" : ""
              }
            >
              <li className="cursor-pointer">ALL DOCTORS</li>
            </NavLink>
            <NavLink
              to="/about"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-purple-700" : ""
              }
            >
              <li className="cursor-pointer">ABOUT</li>
            </NavLink>
            <NavLink
              to="/contact"
              onClick={toggleMobileMenu}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-purple-700" : ""
              }
            >
              <li className="cursor-pointer">CONTACT</li>
            </NavLink>
            {token ? (
              <>
                <NavLink
                  to="/my-profile"
                  onClick={toggleMobileMenu}
                  className="text-purple-700 hover:bg-purple-100 cursor-pointer"
                >
                  MY Profile
                </NavLink>
                <NavLink
                  to="/my-appointments"
                  onClick={toggleMobileMenu}
                  className="text-purple-700 hover:bg-purple-100 cursor-pointer"
                >
                  My appointments
                </NavLink>
                <li
                  onClick={() => {
                    logoutHandler();
                    toggleMobileMenu();
                  }}
                  className="text-purple-700 hover:bg-purple-100 cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  toggleMobileMenu();
                }}
                className="bg-purple-700 text-white hover:bg-purple-600 px-5 py-2 rounded-lg transition duration-300"
              >
                Create account
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
