import axios from 'axios';

const API_ENDPOINT = '/api';

export default {

  async callGET(path) {
    return axios.get(API_ENDPOINT+path)
      .then(response => response.data);
  },

  async callPOST(path, body) {
    return axios.post(API_ENDPOINT+path, body)
      .then(response => response.data);
  },

  async callPUT(path, body) {
    return axios.put(API_ENDPOINT+path, body)
      .then(response => response.data);
  },
};