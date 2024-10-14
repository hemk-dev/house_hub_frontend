import React, { useState } from "react";
import { useAppDispatch } from "../../Config/store";
import { register } from "../../Config/AuthSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate input
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fname":
      case "lname":
        if (!value.trim()) {
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/; // Exactly 10 digits
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!phoneRegex.test(value)) {
          error =
            "Phone number must be exactly 10 digits and contain only numbers";
        }
        break;
      case "password":
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        if (!value.trim()) {
          error = "Password is required";
        } else if (!passwordRegex.test(value)) {
          error =
            "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
        }
        break;
      case "role":
        if (!value) {
          error = "Role is required";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    for (const field in formData) {
      validateInput(field, formData[field as keyof typeof formData]);
    }

    // Check for any validation errors
    if (Object.values(errors).some((error) => error !== "")) {
      return; // Stop submission if there are errors
    }

    try {
      const roleId = formData.role === "owner" ? 2 : 3; // Example IDs
      const payload = {
        ...formData,
        role_id: roleId,
      };

      await dispatch(register(payload));
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed", error);
      // Display SweetAlert with error message
      Swal.fire({
        icon: "error",
        title: "Registration Error",
        text: error?.message || "An error occurred while registering.",
      });
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
              {errors.role && <p className="text-red-500">{errors.role}</p>}
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
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                  placeholder="Enter First Name"
                  value={formData.fname}
                  onChange={handleChange}
                />
                {errors.fname && <p className="text-red-500">{errors.fname}</p>}
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
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                  placeholder="Enter Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                />
                {errors.lname && <p className="text-red-500">{errors.lname}</p>}
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
                  className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
                >
                  <svg
                    className="shrink-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                      className={showPassword ? "hidden" : ""}
                    />
                    <path
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                      className={showPassword ? "hidden" : ""}
                    />
                    <path
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                      className={showPassword ? "hidden" : ""}
                    />
                    <line
                      x1="2"
                      x2="22"
                      y1="2"
                      y2="22"
                      className={showPassword ? "hidden" : ""}
                    />
                    <path
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      className={!showPassword ? "hidden" : ""}
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      className={!showPassword ? "hidden" : ""}
                    />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
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
