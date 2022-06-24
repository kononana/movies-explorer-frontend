class MainApi {
    constructor({ url }) {
        this.url = url;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getToken = () => {
        return `Bearer ${localStorage.getItem('token')}`;
    }

    register({ name, password, email }) {
        return fetch(`${this.url}signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, password, email })
        })
            .then(this._getResponseData);
    }

    login({ password, email }) {
        return fetch(`${this.url}signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._getResponseData);
    }

    getUserData() {
        return fetch(`${this.url}users/me`, {
            headers: {
                authorization: this.getToken()
            }
        })
            .then(this._getResponseData);
    }

    editUserData(data) {
        return fetch(`${this.url}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(this._getResponseData)
    }

    getSavedMovies() {
        return fetch(`${this.url}movies`, {
            headers: {
                authorization: this.getToken()
            }
        })
            .then(this._getResponseData);
    }

    addMovieToSaved(data) {
        return fetch(`${this.url}movies`, {
            method: 'POST',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: data.country || 'Нет данных',
                director: data.director || 'Нет данных',
                duration: data.duration || 'Нет данных',
                year: data.year || 'Нет данных',
                description: data.description || 'Нет данных',
                image: `https://api.nomoreparties.co${data.image.url}` || 'Нет данных',
                trailerLink: data.trailerLink || 'https://www.youtube.com/',
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}` || 'Не данных',
                movieId: data.id,
                nameRU: data.nameRU || 'Нет данных',
                nameEN: data.nameEN || 'Нет данных',
            })
        })
            .then(this._getResponseData);
    }

    deleteFromSaved(data) {
        return fetch(`${this.url}movies/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.getToken(),
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData);
    }

    tokenCheck() {
        return fetch(`${this.url}users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            }
        })
            .then(this._getResponseData)
    }
}


const mainApi = new MainApi({
    url: 'https://cinema.nomoredomains.xyz/',
});

export default mainApi;
