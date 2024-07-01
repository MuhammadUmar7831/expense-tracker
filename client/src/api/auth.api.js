import axios from "axios";
import API_BASE_URL from "../config/API.config";

export const signup = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signin = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signin`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const signout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const googleOAuth = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/google-oauth`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
