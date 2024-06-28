import axios from 'axios';

const API_URL = '/api/auth/';

const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const signin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}signin`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const signout = async () => {
  try {
    const response = await axios.post(`${API_URL}signout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const googleOAuth = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}google-oauth`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  signup,
  signin,
  signout,
  googleOAuth
};
