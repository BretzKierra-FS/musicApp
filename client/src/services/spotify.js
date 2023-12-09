import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1/auth';

export const login = async (code) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, { code });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refresh = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/refresh?refresh_token=${refreshToken}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const search = async (query, accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
