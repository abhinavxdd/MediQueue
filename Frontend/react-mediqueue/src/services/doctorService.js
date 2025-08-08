import api from "./api";

export const getAllDoctors = async () => {
  try {
    const response = await api.get("/doctors");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDoctorById = async id => {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDoctorAvailableSlots = async (doctorId, date) => {
  try {
    const response = await api.get(`/doctors/${doctorId}/slots/${date}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
