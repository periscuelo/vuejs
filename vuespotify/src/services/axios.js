import axios from 'axios';
import AuthService from './auth';

// Valida token
let token = '';
const makeToken = () => {
  if (!sessionStorage.getItem('valid')) {
    const opened = window.open('https://accounts.spotify.com/authorize?client_id=da18b610d64c4573be48c92fe8ae8eee&response_type=token&redirect_uri=https:%2F%2Fwww.eleganciachick.com.br%2Fgtoken.php', 'gtoken');

    const checkClosed = () => {
      if (opened.closed) {
        AuthService.getToken().then(response => {
          sessionStorage.setItem('token', response.request.response);
          sessionStorage.setItem('valid', true);
          token = JSON.parse(response.request.response);

          /* eslint no-use-before-define: ["error", { "variables": false }] */
          clearInterval(iId);
          window.location.reload();
        });
      }
    };

    const iId = setInterval(checkClosed, 1000);
  } else {
    token = JSON.parse(sessionStorage.getItem('token'));
  }
};

const myAxios = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

myAxios.interceptors.request.use(config => {
  makeToken();
  config.headers.Authorization = `${token.token_type} ${token.access_token}`;
  return config;
});

export default () => myAxios;
