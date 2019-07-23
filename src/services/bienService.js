import API from './api';

class BienService {
  listTypeBien() {
    return new Promise((resolve, reject) => {
      API.get('biens/all-type-bien')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  listBien() {
    return new Promise((resolve, reject) => {
      API.get('biens')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  listBienByTypeBien(id) {
    return new Promise((resolve, reject) => {
      API.get('biens/all-bien-by-type/'+id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  listBailleur() {
    return new Promise((resolve, reject) => {
      API.get('biens/bailleurs')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  addBailleur(bailleur) {
    return new Promise((resolve, reject) => {
      API.post('biens/bailleurs', bailleur)
        .then((response) => {
          resolve(response);
        }).catch((error) => {
        reject(error);
      });
    });
  }

  addBien(bien) {
    const body = new FormData();
    body.append('description', bien.description);
    body.append('photo', bien.photo);
    body.append('prix_bailleur', bien.prixBailleur);
    body.append('surface', bien.surface);
    body.append('bailleur_id', bien.bailleur);
    body.append('typebien_id', bien.typebien);
    return new Promise((resolve, reject) => {
      API.post('biens/add-bien-new', body,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        })
        .then((response) => {
          resolve(response);
        }).catch((error) => {
        reject(error);
      });
    });
  }

  listClient() {
    return new Promise((resolve, reject) => {
      API.get('clients')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  addClient(client) {
    return new Promise((resolve, reject) => {
      API.post('clients', client)
        .then((response) => {
          resolve(response);
        }).catch((error) => {
        reject(error);
      });
    });
  }
}

export default new BienService();
