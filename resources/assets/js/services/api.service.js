import axios from 'axios';

const API_ENDPOINT = '/api';

export default {

  callGET(path) {
    return axios.get(API_ENDPOINT+path)
      .then(response => response.data);


  }
};