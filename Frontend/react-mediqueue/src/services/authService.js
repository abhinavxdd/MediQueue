import api from "./api";

export const registerUser = async userData => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });

    // Save auth data in localStorage
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("userRole", "patient");

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginDoctor = async (email, password) => {
  try {
    const response = await api.post("/doctors/login", { email, password });

    // Save auth data in localStorage
    localStorage.setItem("doctorAuthToken", response.data.token);
    localStorage.setItem("userRole", "doctor");

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("doctorAuthToken");
  localStorage.removeItem("userRole");
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDoctorProfile = async () => {
  try {
    const response = await api.get("/doctors/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
