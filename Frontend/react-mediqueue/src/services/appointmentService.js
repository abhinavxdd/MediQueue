import api from "./api";

export const createAppointment = async appointmentData => {
  try {
    const response = await api.post("/appointments", appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserAppointments = async () => {
  try {
    const response = await api.get("/appointments");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDoctorAppointments = async () => {
  try {
    const response = await api.get("/appointments/doctor");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const cancelAppointment = async id => {
  try {
    const response = await api.put(`/appointments/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
