import React, { useState } from "react";
import { useAppDispatch } from "../../Config/store";
import { doLogin } from "../../Config/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(doLogin(formData));
      navigate("/");
      // Optionally redirect or show success message here
    } catch (error) {
      console.error("Login failed", error);
      // Handle the error appropriately (show notification, etc.)
    }
  };

  return (
    <section className="flex min-h-screen">
      {/* Left Side Banner */}
      <div className="bg-red-500 text-white p-10 w-1/3 flex flex-col justify-start">
        <h2 className="text-4xl mb-6 leading-[3rem]">
          Things you Can Do with House Hub
        </h2>
        <ul className="space-y-4 text-lg font-light">
          <li>Post Property for FREE</li>
          <li>Get accessed by over 1 Lakh buyers</li>
          <li>Set Property alerts for your requirement</li>
          <li>Get instant queries over Phone, Email and SMS</li>
          <li>Showcase your property as Rental, PG or for Sale</li>
          <li>Add detailed property information & multiple photos</li>
        </ul>
      </div>

      {/* Login Form */}
      <div className="w-2/3 flex items-start justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-normal text-center mb-8">LOGIN</h2>

          <form onSubmit={handleSubmit}>
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
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                placeholder="Enter Email"
                required
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
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-red-500 focus:ring-transparent focus:ring-2"
                placeholder="Enter Password"
                required
              />
              <div className="text-right mt-1">
                <a
                  href="/forgot-password"
                  className="text-red-500 text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              LOGIN
            </button>

            <div className="mt-6 text-center text-gray-500">
              Don't have an account?{" "}
              <a href="/register" className="text-red-500 hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
