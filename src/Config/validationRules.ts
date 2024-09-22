// validationRules.js
import { Rule } from 'antd/es/form';

export const validationRules = {
  required: (message?: string): Rule => ({
    required: true,
    message: message || "This field is required!",
  }),
  email: {
    required: true,
    type: "email",
    message: "Please enter a valid email!",
  } as Rule,
  phone: (message?: string): Rule => ({
    required: true,
    message: message || "Please enter your phone number!",
  }),
  password: (message?: string): Rule => ({
    required: true,
    message: message || "Please enter your password!",
  }),
};
