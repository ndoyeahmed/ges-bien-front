class Auth {
    constructor() {
        this.BaseUrl = 'http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest';
    }

    login(userData) {
        return new Promise((resolve, reject) => {
            fetch(this.BaseUrl + '/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
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