import axios from 'axios';

const API_URL = '/api/budget/';

const createBudget = async (budgetData) => {
  try {
    const response = await axios.post(`${API_URL}create`, budgetData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getBudgets = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getBudgetById = async (budgetId) => {
  try {
    const response = await axios.get(`${API_URL}${budgetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateBudget = async (budgetId, budgetData) => {
  try {
    const response = await axios.put(`${API_URL}${budgetId}`, budgetData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteBudget = async (budgetId) => {
  try {
    const response = await axios.delete(`${API_URL}${budgetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget
};
