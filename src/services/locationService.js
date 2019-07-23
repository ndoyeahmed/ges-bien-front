import API from './api';

class LocationService {
  addLocation(location) {
    return new Promise((resolve, reject) => {
      API.post('locations', location)
        .then((response) => {
          resolve(response);
        }).catch((error) => {
        reject(error);
      });
    });
  }

  listLocations() {
    return new Promise((resolve, reject) => {
      API.get('locations')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  listMoisAnne() {
    return new Promise((resolve, reject) => {
      API.get('parametrage/moisannees/1')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}

export default new LocationService();
