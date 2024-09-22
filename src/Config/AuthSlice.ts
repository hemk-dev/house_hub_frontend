import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "./api";
import { AppThunk } from "./store";
import { stringEncryption } from "./Global";
import API_URL from "./apiUrl";

interface AuthState {
  appLoading: boolean;
  initialData: object | null;
  isLoading: boolean;
  userDetail: any;
  token: string | null;
  forgotEmail: string | null;
  otpNumber: string | null;
}

const initialState = {
  appLoading: true,
  initialData: {},
  isLoading: false,
  userDetail: null,
  token: null,
  forgotEmail: null,
  otpNumber: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
    setInitialData: (state, action: PayloadAction<any>) => {
      state.initialData = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserDetail: (state, action: PayloadAction<any>) => {
      state.userDetail = action.payload;
    },
    setForgotEmail: (state, action: PayloadAction<any>) => {
      state.forgotEmail = action.payload;
    },
    setOtpNumber: (state, action: PayloadAction<any>) => {
      state.otpNumber = action.payload;
    },
    resetAuthStore: () => {
      return initialState; // Reset the state to the initial state
    },
    start: (state) => {
      state.isLoading = true;
    },
    success: (state) => {
      state.isLoading = false;
    },
    failure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  start,
  success,
  failure,
  resetAuthStore,
  setAppLoading,
  setInitialData,
  setUserDetail,
  setUserToken,
  setForgotEmail,
  setOtpNumber,
} = authSlice.actions;

export const doLogin =
  (action: any): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.LOGIN, action);
      if (action?.remember) {
        const string = JSON.stringify({
          email: action.username,
          password: action.password,
        });
        localStorage.setItem("remember_me", stringEncryption(string));
      } else {
        localStorage.removeItem("remember_me");
      }
      localStorage.setItem("token", response.data.token);
      dispatch(success(response.data));
      dispatch(setUserToken(response.data.token));

      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

export const doLogout = (): AppThunk<any> => async (dispatch) => {
  try {
    const response = await api.get(API_URL.LOGOUT);
    dispatch(setUserToken(null));
    dispatch(setUserDetail(null));
    dispatch(setInitialData(null));
    localStorage.removeItem("token");
    return Promise.resolve(response.data);
  } catch (error: any) {
    return Promise.reject(error.data);
  }
};

export const forgotPassword =
  (action: any): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.FORGOT_PASSWORD, action);
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

  export const verifyOtp =
  (action: any): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.VERIFY_OTP, action);
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

  export const resetPassword =
  (action: any): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.RESET_PASSWORD, action);
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };

export const register =
  (action: any): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.REGISTER, action);
      dispatch(success(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(error.data);
    }
  };
const authReducer = authSlice.reducer;
export default authReducer;
