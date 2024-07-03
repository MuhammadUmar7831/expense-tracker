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

export const updateUserExpensesApi = async (expenseId, data) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/expense/update/${expenseId}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUserExpensesApi = async (expenseId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/expense/delete/${expenseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
