import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../Config/store";
import api from "../../../Config/api";
import API_URL from "./apiUrl";

interface AuthState {
  isLoading: boolean;
  userData: any;
  propertyData: [];
  details: any; // Details of a specific record
}

const initialState: AuthState = {
  isLoading: false,
  userData: null,
  propertyData: [],
  details: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    setPropertyData: (state, action: PayloadAction<any>) => {
      state.propertyData = action.payload;
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
    setDetails: (state, action: PayloadAction<any>) => {
      state.details = action?.payload;
    },
  },
});

export const {
  start,
  success,
  failure,
  setUserData,
  setPropertyData,
  setDetails,
} = dashboardSlice.actions;

// Fetch user data
export const fetchUserData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(start());
    const response = await api.get(API_URL.USER_LIST);
    dispatch(success());
    dispatch(setUserData(response));
    return Promise.resolve(response.data);
  } catch (error: any) {
    dispatch(failure());
    return Promise.reject(error.response ? error.response.data : error.message);
  }
};

// Fetch property data
export const fetchPropertyData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(start());
    const response = await api.get(API_URL.PROPERTY_LIST);
    dispatch(success());
    dispatch(setPropertyData(response.data));
    return Promise.resolve(response.data);
  } catch (error: any) {
    dispatch(failure());
    return Promise.reject(error.response ? error.response.data : error.message);
  }
};

// Fetch property details by ID
export const propertyDetailsById =
  (id: any): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.get(API_URL.PROPERTY_DETAILS(id));
      dispatch(setDetails(response.data.data));
      dispatch(success());
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());

      return Promise.reject(error.data);
    }
  };

// create property
export const createProperty =
  (propertyData: any): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.post(API_URL.PROPERTY_CREATE, propertyData);
      dispatch(success());
      await dispatch(fetchPropertyData());
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(
        error.response ? error.response.data : error.message
      );
    }
  };

// property delete
export const propertyDelete =
  (id: string): AppThunk<any> =>
  async (dispatch) => {
    try {
      dispatch(start());
      const response = await api.delete(API_URL.PROPERTY_DELETE(id));

      await dispatch(fetchPropertyData());

      dispatch(success());
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(failure());
      return Promise.reject(
        error.response ? error.response.data : error.message
      );
    }
  };

const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
