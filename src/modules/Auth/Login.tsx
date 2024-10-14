import { useState } from "react";
import { useAppDispatch } from "../../Config/store";
import { doLogin } from "../../Config/AuthSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

  // Validation logic
  const validateField = (name: string, value: string) => {
    let error = "";

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address.";
      }
    }

    // Password validation
    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

      if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Trigger validation for the field on change
    validateField(name, value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Final validation before submission
    if (!validateForm()) return;

    try {
      await dispatch(doLogin(formData));
      navigate("/");
    } catch (error: any) {
      console.error("Login failed", error);

      // Display SweetAlert with error message
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error?.message || "An error occurred while logging in.",
      });
    }
  };

  const validateForm = () => {
    let valid = true;

    // Validate email and password on submit
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      validateField(key, value);

      if (errors[key as keyof typeof errors]) {
        valid = false;
      }
    });

    return valid;
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                className={`mt-1 w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent`}
                placeholder="Enter Email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input with Eye Icon */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent`}
                  placeholder="Enter Password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showPassword ? (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    ) : (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
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
