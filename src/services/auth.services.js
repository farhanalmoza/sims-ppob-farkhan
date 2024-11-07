import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.com/";

// register
const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}registration`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// login
const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}login`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const updateProfile = async (token, data) => {
  try {
    const response = await axios.put(`${API_URL}profile/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const updateImage = async (token, formData) => {
  try {
    const response = await axios.put(`${API_URL}profile/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export default {
  register,
  login,
  getUser,
  updateProfile,
  updateImage,
};