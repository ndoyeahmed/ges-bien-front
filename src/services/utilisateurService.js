import API from './api';

class UtilisateurService {

  addUser(user) {
    return new Promise((resolve, reject) => {
      API.post('users', user)
        .then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
      });
    });
  }

  listProfil() {
    return new Promise((resolve, reject) => {
      API.get('profils')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  listUser() {
    return new Promise((resolve, reject) => {
      API.get('users')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}

export default new UtilisateurService();
