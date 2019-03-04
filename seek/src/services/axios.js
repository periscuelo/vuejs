import axios from 'axios';

export default () => axios.create({
  baseURL: 'https://localhost:8081/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
