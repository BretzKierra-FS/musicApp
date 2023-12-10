import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1/auth';

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
