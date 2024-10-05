import React, { useState } from "react";
import { useAppDispatch } from "../../Config/store";
import { register } from "../../Config/AuthSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Adjust role_id based on the selected role
      const roleId = formData.role === "owner" ? 2 : 3; // Example IDs
      const payload = {
        ...formData,
        role_id: roleId,
      };

      // Dispatch the register action with the payload
      await dispatch(register(payload));
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      // Handle the error appropriately (show notification, etc.)
    }
  };

  return (
    <section className="flex min-h-screen">
      {/* Left Side Banner */}
      <div className="bg-red-500 text-white p-10 w-1/3 flex flex-col justify-start">
        <h2 className="text-4xl mb-6 leading-[3rem]">Join House Hub</h2>
        <ul className="space-y-4 text-lg font-light">
          <li>Post Property for FREE</li>
          <li>Get access to thousands of buyers</li>
          <li>Receive instant queries over Phone, Email, and SMS</li>
          <li>Showcase your property with detailed information</li>
          <li>Stay updated with property alerts</li>
        </ul>
      </div>

      {/* Signup Form */}
      <div className="w-2/3 flex items-start justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-normal text-center mb-8">SIGN UP</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <span className="block font-medium text-gray-700 mb-2">
                I am:
              </span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="owner"
                    name="role"
                    value="owner"
                    className="mr-2"
                    onChange={handleChange}
                  />
                  Owner
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    id="buyer"
                    name="role"
                    value="buyer"
                    className="mr-2"
                    onChange={handleChange}
                  />
                  Buyer
                </label>
              </div>
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter First Name"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Sign Up
            </button>

            <div className="mt-6 text-center text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-red-500 hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
