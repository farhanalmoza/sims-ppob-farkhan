import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.com/";

// register
const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}registration`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
  }
};

// login
const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user", error);
  }
};

export default {
  register,
  login,
};