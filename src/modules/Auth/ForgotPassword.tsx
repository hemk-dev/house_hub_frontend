import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../../Config/AuthSlice";
import { AppDispatch } from "../../Config/store";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format.";
  };

  const validateOtp = (otp: string) => {
    return otp.length === 6 ? "" : "OTP must be 6 digits.";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtp(value);
    setOtpError(validateOtp(value));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      await dispatch(forgotPassword({ email }));
      setStep(2);
    } catch (error) {
      setError("Error sending OTP. Please try again.");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otpError) {
      setError(otpError);
      return;
    }

    try {
      const response = await dispatch(verifyOtp({ email, otp }));
      if (response.status === 201) {
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      await dispatch(resetPassword({ email, password: newPassword }));
      setSuccess("Password reset successfully!");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      setError("Error resetting password. Please try again.");
    }
  };
  const validatePasswords = (password: string, confirmPassword: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
    } else if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    // Validate passwords on change
    setPasswordError(validatePasswords(value, confirmPassword));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    // Validate passwords on change
    setPasswordError(validatePasswords(newPassword, value));
  };

  return (
    <section className="flex min-h-screen">
      <div className="bg-red-500 text-white p-10 w-1/3 flex flex-col justify-start">
        <h2 className="text-4xl mb-6 leading-[3rem]">Reset Your Password</h2>
        <p className="text-lg font-light">
          {step === 1 && "Enter your email address to receive an OTP."}
          {step === 2 && "Enter the OTP sent to your email."}
          {step === 3 && "Set your new password."}
        </p>
      </div>

      <div className="w-2/3 flex items-start justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-normal text-center mb-8 uppercase">
            {step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"}
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-center mb-4">{success}</div>
          )}

          <form
            onSubmit={
              step === 1
                ? handleEmailSubmit
                : step === 2
                ? handleOtpSubmit
                : handlePasswordReset
            }
          >
            {step === 1 && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mt-6 mb-4">
                  <label
                    htmlFor="otp"
                    className="block text-md font-medium text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    required
                  />
                  {otpError && (
                    <p className="text-red-500 text-sm mt-1">{otpError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Verify OTP
                </button>
              </>
            )}
            {step === 3 && (
              <>
                {/* New Password Input */}
                <div className="mb-4">
                  <label
                    htmlFor="new-password"
                    className="block text-md font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="new-password"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer"
                    >
                      {showPassword ? (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                          <line x1="2" x2="22" y1="2" y2="22" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordError &&
                    passwordError !== "Passwords do not match." && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                </div>

                {/* Confirm Password Input */}
                <div className="mb-4">
                  <label
                    htmlFor="confirm-password"
                    className="block text-md font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:outline-red-500 focus:ring-transparent"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                          <line x1="2" x2="22" y1="2" y2="22" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordError === "Passwords do not match." && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Reset Password
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
