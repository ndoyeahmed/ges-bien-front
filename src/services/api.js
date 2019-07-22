import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/immo/api/'
});

// this.BaseUrlprod = 'https://sene-bien-immo-api.herokuapp.com/rest/';
// baseURL: 'http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest/'
// baseURL: 'http://localhost:8080/immo/api/'
