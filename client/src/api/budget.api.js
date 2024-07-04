import axios from "axios";
import API_BASE_URL from "../config/API.config";

export const getUserAllBudgetsApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/budget/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBudgetByIdApi = async (budgetId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/budget/get/${budgetId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addBudgetsApi = async (body) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/budget/add`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
