class Auth {
  constructor() {
    this.BaseUrl = 'http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest';
    this.BaseUrlprod = 'https://sene-bien-immo-api.herokuapp.com/rest';
  }

  login(userData) {
    return new Promise((resolve, reject) => {
      fetch(this.BaseUrlprod + '/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'origin, content-type, accept',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
        },
        body: JSON.stringify(userData)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  signOut(cb) {
    sessionStorage.clear();
    cb();
  }

  isAuthenticated() {
    return !!sessionStorage.getItem("userData");
  }
}

export default new Auth();
