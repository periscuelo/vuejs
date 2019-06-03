import axios from 'axios';

const Axios = () => axios.create({
  baseURL: 'https://www.eleganciachick.com.br',
  withCredentials: true,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'text/html; charset=UTF-8',
  },
});

export default {
  getToken: () => Axios().get('/spot.php'),
};
