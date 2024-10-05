const baseURl = "http://localhost:5000";

const API_URL = {
  USER_LIST: `${baseURl}/user`,
  PROPERTY_LIST: `${baseURl}/properties`,
  PROPERTY_CREATE: `${baseURl}/properties/register`,
  PROPERTY_DETAILS: (id: any) => `${baseURl}/properties/${id}`,
  PROPERTY_DELETE: (id: any) => `${baseURl}/properties/${id}`,
  USER_DELETE: (id: any) => `${baseURl}/user/${id}`,
};

export default API_URL;
