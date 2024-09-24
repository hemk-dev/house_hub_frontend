import { NamePath } from "antd/lib/form/interface";
import axios from "axios";
import { notification as AntNotification } from "antd";
import { FormInstance } from "antd";

export type ErrorProps = {
  errors: {
    [key: string]: string[];
  };
  [key: string]: any;
};

export type FormattedErrorProps = {
  name: NamePath;
  errors: string[];
};

// Set your API base URL here
const BASE_URL = process.env.REACT_APP_API_URL;

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Add interceptors for request and response
api.interceptors.request.use(
  (config) => {
    let headers: any = config.headers;
    headers = {
      ...headers,
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const authToken = localStorage.getItem("token");
    headers = authToken
      ? {
          ...headers,
          Accept: "application/json",
          Authorization: "Bearer " + authToken,
        }
      : {
          ...headers,
          Accept: "application/json",
        };
    config.headers = headers;

    // Perform any operations before the request is sent
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.STATUS?.NOTIFICATION) {
      response.data.STATUS.NOTIFICATION.forEach((err: string) =>
        AntNotification.success({
          message: err,
        })
      );
    }
    // Process response data before returning
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();

        // Use React Router for navigation
        window.location.replace("/login"); // Replace with history.push if using react-router
      } else if (error.response.status === 422) {
        // Handle validation errors appropriately
      } else if (error.response.status === 500) {
        AntNotification.error({
          message: "Something Went Wrong",
        });
      } else if (error.response.data?.STATUS?.NOTIFICATION) {
        error.response.data.STATUS.NOTIFICATION.forEach((err: string) =>
          AntNotification.error({
            message: err,
          })
        );
      } else {
        AntNotification.error({
          message: "Network Issue",
        });
      }

      return Promise.reject(error.response);
    } else {
      AntNotification.error({
        message: "Network Issue",
      });
      return Promise.reject({
        data: [],
        message: "Network Issue",
      });
    }
  }
);

export const assignErrorToInput = (form: FormInstance, errors?: ErrorProps) => {
  const formattedErrors: FormattedErrorProps[] = [];
  if (errors) {
    Object.keys(errors).forEach((key) => {
      formattedErrors.push({
        name: key,
        errors: errors[key],
      });
    });
    formattedErrors.forEach((x) => {
      if (typeof x.name === "string" && x.name.indexOf(".") !== -1) {
        const name: any = x.name.split(".");
        name.forEach((e: any) => {
          if (!isNaN(parseInt(e))) {
            e = parseInt(e);
          }
        });
      }
    });
  }
  return form.setFields(formattedErrors);
};

export default api;
