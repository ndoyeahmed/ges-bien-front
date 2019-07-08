import axios from "axios";
import API from './api';

class UtilisateurService {
    constructor() {
        this.BaseUrl = 'http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest';
    }

    async addUser(user) {
      const response = await  fetch(this.BaseUrl + '/user/add-user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
      // const response = await  API.post('/user/add-user', user);
      console.log('Returned data' + JSON.stringify(response))
    }
}

export default new UtilisateurService();
