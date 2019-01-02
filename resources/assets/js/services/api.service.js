import axios from 'axios';

const API_ENDPOINT = '/api';

export default {

  callGET(path) {
    return axios.get(API_ENDPOINT+path)
      .then(response => response.data);
  },

  callPOST(path, body) {
    return axios.post(API_ENDPOINT+path, body)
      .then(response => response.data);
  },

  callPUT(path, body) {
    return axios.put(API_ENDPOINT+path, body)
      .then(response => response.data);
  },
};