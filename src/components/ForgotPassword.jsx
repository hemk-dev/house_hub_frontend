import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <section className="flex min-h-screen">
        {/* Left Side Banner */}
        <div className="bg-red-500 text-white p-10 w-1/3 flex flex-col justify-start">
          <h2 className="text-4xl mb-6 leading-[3rem]">Reset Your Password</h2>
          <p className="text-lg font-light">
            Enter your email address to receive a OTP to Set a new password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="w-2/3 flex items-start justify-center p-10">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-normal text-center mb-8 uppercase">Reset Password</h2>


            {/* send OTP in mail */}
            <form>
              {/* <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Send OTP
              </button>

              <div className="mt-6 text-center text-gray-500">
                Remembered your password?{" "}
                <a href="/login" className="text-red-500 hover:underline">
                  Login
                </a>
              </div> */}

              {/* Verify OTP Field */}
              {/* <div className="mt-6 mb-4">
                <label
                  htmlFor="otp"
                  className="block text-md font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter OTP"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Verify OTP
              </button>

              <div className="mt-6 text-center text-gray-500">
                Remembered your password?{" "}
                <a href="/login" className="text-red-500 hover:underline">
                  Login
                </a>
              </div> */}

              {/* reset-update new password */}
              {/* New Password Field */}
              <div className="mt-6 mb-4">
                <label
                  htmlFor="new-password"
                  className="block text-md font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter New Password"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mt-6 mb-4">
                <label
                  htmlFor="confirm-password"
                  className="block text-md font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="mt-1 w-full px-5 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Confirm New Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
