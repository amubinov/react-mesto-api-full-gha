import { BASE_URL } from "./auth";

export class Api {
    constructor(options) {
        this._url = options.url;
    }

    _getServerReply(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }


    getMyInfo() {
        return fetch(`${this._url}/users/me`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => this._getServerReply(res));
    }

    getServerCards() {
        return fetch(`${this._url}/cards`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                },
            })
            .then(res => this._getServerReply(res));
    }

    changeProfileData({ name, about }) {
        return fetch(`${this._url}/users/me`,
            {
                method: 'PATCH',
                credentials: 'include',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, about })
            })
            .then(this._getServerReply)
    }

    changeUserAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`,
            {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ avatar })
            })
            .then(this._getServerReply)
    }

    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, link })
            })
            .then(this._getServerReply)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`,
            {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(this._getServerReply)
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${id}/likes`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(this._getServerReply)
        } else {
            return fetch(`${this._url}/cards/${id}/likes`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(this._getServerReply)
        }
    }
}

// const api = new Api({
//     url: "https://mesto.nomoreparties.co/v1/cohort-61",
//     headers: {
//         "authorization": "871afe4f-c0f9-41b9-8dd4-b2dbe91cbc7d",
//         "Content-Type": "application/json",
//     }
// });

const api = new Api
    ({
        url: BASE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

export default api;