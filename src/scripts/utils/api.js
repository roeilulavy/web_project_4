export default class Api {
  constructor (options) {
    this._url = options.baseUrl
    this._token = options.token
  }

  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: { authorization: this._token }
    })

    if (response.ok) {
      return response.json();
    } else {
      console.log('Somthing went wrong initializing cards!', response.status, response.statusText);
    }
  }

  async getUserData() {
    const response = await fetch(`${this._url}/users/me`, {
        headers: { authorization: this._token }
      })
  
      if (response.ok) {
        return response.json();
      } else {
        console.log('Somthing went wrong getting user data!', response.status, response.statusText);
      }
  }

  async editUserData(name, about) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: { authorization: this._token, 'Content-Type': "application/json" },
      body: JSON.stringify({ name: name, about: about })
    })

    if (response.ok) {
      return response.json();
    } else {
      console.log('Somthing went wrong updating user data!', response.status, response.statusText);
    }
  }

  async editUserPicture(avatar) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: { authorization: this._token, 'Content-Type': "application/json" },
      body: JSON.stringify({avatar: avatar})
    })

    if (response.ok) {
      return response.json();
    } else {
      console.log('Somthing went wrong updating user data!', response.status, response.statusText);
    }
  }

  async addCard(name, link) {
    const response = await fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: { authorization: this._token, 'Content-Type': "application/json" },
        body: JSON.stringify({ name: name, link: link })
      })

      if (response.ok) {
        return response.json();
      } else {
        console.log('Somthing went wrong adding card!', response.status, response.statusText);
      }
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { authorization: this._token, },
    })

    if (response.ok) {
      return response.json();
    } else {
      console.log('Somthing went wrong deleting card!', response.status, response.statusText);
    }
  }

  async likeCard(cardId) {
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: { authorization: this._token, },
    })

    if (response.ok) {
      return response.json();
    } else {
      console.log('Somthing went wrong deleting card!', response.status, response.statusText);
    }
  }

  async dislikeCard(cardId) {
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: { authorization: this._token, },
    })

    if (response.ok) {
      return response.json();
    } else {
      console.log('Somthing went wrong deleting card!', response.status, response.statusText);
    }
  }

}
