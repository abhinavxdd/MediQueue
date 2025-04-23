import api from "./api";

export const getAllClinics = async () => {
  try {
    const response = await api.get("/clinics");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getClinicById = async id => {
  try {
    const response = await api.get(`/clinics/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getClinicsByLocation = async location => {
  try {
    const response = await api.get(`/clinics/location/${location}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
