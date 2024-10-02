const baseURl = "http://localhost:5000";

const API_URL = {
  USER_LIST: `${baseURl}/user`,
  PROPERTY_LIST: `${baseURl}/properties`,
  PROPERTY_DETAILS: (id:any) => `${baseURl}/properties/${id}`,
  PROPERTY_DELETE: (id:any) => `${baseURl}/properties/${id}`
};

export default API_URL;
