import Axios from './axios';

export default {
  getAlbums: data => Axios().get('/albums', data),
  getAlbum: id => Axios().get(`/albums/${id}`),
};
