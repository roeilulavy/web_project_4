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
      console.log('There was an Error!', response.status, response.statusText);
    }
  }

  async getUserData() {
    const response = await fetch(`${this._url}/users/me`, {
        headers: { authorization: this._token }
      })
  
      if (response.ok) {
        return response.json();
      } else {
        console.log('Somthing went wrong!', response.status, response.statusText);
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
        console.log('Somthing went wrong!', response.status, response.statusText);
      }
  }

}
