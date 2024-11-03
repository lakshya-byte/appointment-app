import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { RxCross1 } from "react-icons/rx";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [about, setAbout] = useState("");
  const [fee, setFee] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
  });
  const { aToken, backendUrl } = useContext(AdminContext);

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // console.log(address);

    e.preventDefault();

    // console.log(FormData);

    try {
      if (!image) {
        return toast.error("image not selected");
      }
      //form data
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("speciality", speciality);
      formData.append("about", about);
      formData.append("fee", Number(fee));
      formData.append("address", JSON.stringify(address));

      // formData.append("address[line1]", address.line1);
      // formData.append("address[line2]", address.line2);
      //form data end

      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        console.log(data);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setDegree("");
    setExperience("");
    setSpeciality("");
    setAbout("");
    setFee("");
    setAddress({ line1: "", line2: "" });
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Doctor</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2">
            Upload Doctor Picture
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
            <input
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded p-2 w-full"
              hidden
            />
            <div className="relative">
              {image && (
                <button
                  onClick={() => setImage(null)}
                  className="bg-gray-200 rounded-full p-1 text-red-600 hover:bg-gray-300 mt-1"
                >
                  <RxCross1 />
                </button>
              )}
            </div>
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Degree:</label>
          <input
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            type="text"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Experience:</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Experience</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={`${i + 1} years`}>
                {i + 1} year{i > 0 && "s"}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Speciality:</label>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Speciality</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">About:</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Fee:</label>
          <input
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            type="text"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address:</label>
          <input
            value={address.line1}
            onChange={handleAddressChange}
            type="text"
            name="line1"
            placeholder="Address Line 1"
            required
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <input
            value={address.line2}
            onChange={handleAddressChange}
            type="text"
            name="line2"
            placeholder="Address Line 2"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
