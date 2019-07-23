import axios from 'axios';

export default axios.create({
  baseURL: 'https://backend-immo.herokuapp.com/api/'
});

// this.BaseUrlprod = 'https://sene-bien-immo-api.herokuapp.com/rest/';
// this.BaseUrlprod = 'https://backend-immo.herokuapp.com/api/';
// baseURL: 'http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest/'
// baseURL: 'http://localhost:8080/immo/api/'
