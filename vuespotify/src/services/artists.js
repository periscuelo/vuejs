import Axios from './axios';

export default {
  getArtists: data => Axios().get('/artists', data),
  getArtist: id => Axios().get(`/artists/${id}`),
  getArtistAlbums: (id, data) => Axios().get(`/artists/${id}/albums`, data),
};
