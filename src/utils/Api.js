class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}`},
    }).then((res) => this._getResponse(res));
  }

  addCard(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: { ...this._headers, authorization: `Bearer ${token}`},
      body: JSON.stringify({name, link}),
    }).then((res) => this._getResponse(res));
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: { ...this._headers, authorization: `Bearer ${token}`},
    }).then((res) => this._getResponse(res));
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}`},
    }).then((res) => this._getResponse(res));
  }

  setUserInfo(userName, userAbout, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, authorization: `Bearer ${token}`},
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then((res) => this._getResponse(res));
  }

  setUserAvatar(userAvatar, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this._headers, authorization: `Bearer ${token}`},
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    }).then((res) => this._getResponse(res));
  }

  changeLikeCard(card, isLiked, token) {
    return fetch(`${this._url}/cards/${card._id}/likes/`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: { ...this._headers, authorization: `Bearer ${token}`},
    }).then((res) => this._getResponse(res));
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

const api = new Api({
  baseUrl: "https://api-mesto.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
