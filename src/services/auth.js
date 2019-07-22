import API from './api';

class Auth {

  login(userData) {
    const bodyFormData = new FormData();
    bodyFormData.append('username', userData.username);
    bodyFormData.append('password', userData.password);
    return new Promise((resolve, reject) => {
      API.post('/users/login', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
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
