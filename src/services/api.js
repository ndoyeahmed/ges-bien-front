import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest',
  responseType: 'json'
});
