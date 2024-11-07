import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.com/";

const getBalance = async (token) => {
  try {
    const response = await axios.get(`${API_URL}balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const topUp = async (token, amount) => {
  try {
    const response = await axios.post(`${API_URL}topup`, {
      top_up_amount: amount,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const transaction = async (token, service_code) => {
  try {
    const response = await axios.post(`${API_URL}transaction`, {
      service_code: service_code,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch(error) {
    return error.response.data
  }
}

const getHistoryTransactions = async (token, offset = 0, limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}transaction/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset: offset,
        limit: limit,
      },
    });
    return response.data
  } catch(error) {
    return error.response.data
  }
}

export default {
  getBalance,
  topUp,
  transaction,
  getHistoryTransactions,
};