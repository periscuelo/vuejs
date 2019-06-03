import Axios from './axios';

export default {
  getTracks: data => Axios().get('/tracks', data),
};
