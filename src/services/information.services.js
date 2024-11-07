import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.com/";

// services
const getServices = async (token) => {
    try {
        const response = await axios.get(`${API_URL}services`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export default {
    getServices,
};