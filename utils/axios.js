// utils/api.js
import axios from 'axios';

export const fetchData = async () => {
  try {
    const token = localStorage.getItem('token'); // get token from local storage
    const config = {
      method: 'get',
      url: 'http://localhost:5000/message/send',
      headers: { 
        'Authorization': `Bearer ${token}` // add token to headers
      }
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
