import axios from 'axios';

export default axios.create({
  baseURL: 'https://sene-bien-immo-api.herokuapp.com/rest/'
});

// this.BaseUrlprod = 'https://sene-bien-immo-api.herokuapp.com/rest/';
// baseURL: 'http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest/'
