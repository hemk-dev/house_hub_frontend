const baseURl = "http://localhost:5000";

const API_URL = {
  USER_LIST: `${baseURl}/user`,
  PROPERTY_LIST: `${baseURl}/properties`,
  PAYMENT_LIST: `${baseURl}/properties/transaction`,
  INQUIRY_LIST: `${baseURl}/inquiry/list`,
  PROPERTY_CREATE: `${baseURl}/properties/register`,
  PROPERTY_DETAILS: (id: any) => `${baseURl}/properties/${id}`,
  PROPERTY_DELETE: (id: any) => `${baseURl}/properties/${id}`,
  USER_DELETE: (id: any) => `${baseURl}/user/${id}`,
  INQUIRY_STATUS: (id: any) => `${baseURl}/inquiry/status/${id}`,
};

export default API_URL;
