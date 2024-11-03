import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [edit, setEdit] = useState(false);
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  // Populate state fields with `userData` values on component mount
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      const address =
        typeof userData.address === "string"
          ? JSON.parse(userData.address.replace(/'/g, '"'))
          : userData.address || {};
      setAddressLine1(address.line1 || "");
      setAddressLine2(address.line2 || "");
      setGender(userData.gender || "");
      setDob(userData.dob || "");
    }
  }, [userData]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append(
        "address",
        JSON.stringify({ line1: addressLine1, line2: addressLine2 })
      );
      formData.append("gender", gender);
      formData.append("dob", dob);
      if (image) formData.append("image", image);

      console.log("FormData contents:");
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setEdit(false);
        // setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateUserProfileData();
    }
  };

  return (
    userData && (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg p-10 rounded-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

          <div className="flex items-start">
            <div className="mr-8">
              {edit ? (
                <label htmlFor="image">
                  <div className="cursor-pointer">
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : userData.image || assets.default_profile
                      }
                      alt="Profile"
                      className="w-48 h-48 object-cover shadow-md rounded-full border-4 border-purple-300"
                    />
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                    />
                  </div>
                </label>
              ) : (
                <img
                  src={userData.image || assets.default_profile}
                  alt="Profile"
                  className="w-48 h-48 object-cover shadow-md rounded-full border-4 border-purple-300"
                />
              )}
            </div>

            <div className="flex flex-col flex-grow">
              <div className="mb-4">
                <span className="font-semibold">Name:</span>
                {edit ? (
                  <input
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    value={name}
                    className="border-b-2 border-gray-300 p-2 w-full"
                  />
                ) : (
                  <p>{userData.name || "N/A"}</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-semibold">Email:</span>
                {edit ? (
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="email"
                    value={email}
                    className="border-b-2 border-gray-300 p-2 w-full"
                  />
                ) : (
                  <p>{userData.email || "N/A"}</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-semibold">Phone:</span>
                {edit ? (
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    value={phone}
                    className="border-b-2 border-gray-300 p-2 w-full"
                  />
                ) : (
                  <p>{userData.phone || "N/A"}</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-semibold">Address Line 1:</span>
                {edit ? (
                  <input
                    onChange={(e) => setAddressLine1(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    value={addressLine1}
                    className="border-b-2 border-gray-300 p-2 w-full"
                  />
                ) : (
                  <p>{userData.address?.line1 || "N/A"}</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-semibold">Address Line 2:</span>
                {edit ? (
                  <input
                    onChange={(e) => setAddressLine2(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    value={addressLine2}
                    className="border-b-2 border-gray-300 p-2 w-full"
                  />
                ) : (
                  <p>{userData.address?.line2 || "N/A"}</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-semibold">Gender:</span>
                {edit ? (
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={gender}
                    className="border-b-2 border-gray-300 p-2 w-full"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p>{userData.gender || "N/A"}</p>
                )}
              </div>

              <div className="mb-4">
                <span className="font-semibold">Date of Birth:</span>
                {edit ? (
                  <input
                    onChange={(e) => setDob(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="date"
                    value={dob}
                    className="border-b-2 border-gray-300 p-2 w-full"
                  />
                ) : (
                  <p>{userData.dob || "N/A"}</p>
                )}
              </div>

              <div className="mt-6">
                {edit ? (
                  <button
                    onClick={updateUserProfileData}
                    className="bg-purple-600 text-white w-full py-2 rounded-lg"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEdit(true)}
                    className="bg-purple-600 text-white w-full py-2 rounded-lg"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
