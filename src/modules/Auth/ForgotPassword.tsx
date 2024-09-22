import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { forgotPassword, verifyOtp, resetPassword } from "../../Config/AuthSlice"; 
import { AppDispatch } from "../../Config/store";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch<AppDispatch>(); // Type the dispatch

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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

    try {
      const response = await dispatch(verifyOtp({ email, otp }));
      if (response.success) {
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

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(resetPassword({ email, newPassword }));
      setSuccess("Password reset successfully! You can now log in.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <section className="flex min-h-screen">
      <div className="bg-red-500 text-white p-10 w-1/3 flex flex-col justify-start">
        <h2 className="text-4xl mb-6 leading-[3rem]">Reset Your Password</h2>
        <p className="text-lg font-light">
          {step === 1 && "Enter your email address to receive a OTP."}
          {step === 2 && "Enter the OTP sent to your email."}
          {step === 3 && "Set your new password."}
        </p>
      </div>

      <div className="w-2/3 flex items-start justify-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-normal text-center mb-8 uppercase">
            {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
          </h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}

          <form onSubmit={step === 1 ? handleEmailSubmit : step === 2 ? handleOtpSubmit : handlePasswordReset}>
            {step === 1 && (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-md font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mt-6 mb-4">
                  <label htmlFor="otp" className="block text-md font-medium text-gray-700">
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">
                  Verify OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <div className="mt-6 mb-4">
                  <label htmlFor="new-password" className="block text-md font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-6 mb-4">
                  <label htmlFor="confirm-password" className="block text-md font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="mt-1 w-full px-5 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full mt-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">
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
