import axios from "axios";
import API_BASE_URL from "../config/API.config";

export const getUserAllExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/expense/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
