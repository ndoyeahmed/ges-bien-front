import API from './api';

class Auth {

  login(userData) {
    return new Promise((resolve, reject) => {
      API.post('/user/login', userData)
        .then((response) => {
          resolve(response);
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
