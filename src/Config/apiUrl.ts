const baseURL = "http://localhost:5000/user";

const API_URL = {
  LOGIN: `${baseURL}/login`,
  REGISTER: `${baseURL}/register`,
  LOGOUT: `${baseURL}/logout`,
  FORGOT_PASSWORD: `${baseURL}/forget-password`,
  VERIFY_OTP: `${baseURL}/verify-otp`,
  RESET_PASSWORD: `${baseURL}/reset-password`,
};

export default API_URL;
