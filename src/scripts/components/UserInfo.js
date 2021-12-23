export default class UserInfo {
  constructor (name, description, avatar) {
    this._name = name
    this._description = description
    this._avatar = avatar
  }

  getUserInfo () {
    const getUserData = {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar,
      id: this._id
    }
    return getUserData
  }

  setUserInfo (name, description, avatar, id) {
    this._name.textContent = name
    this._description.textContent = description
    this._avatar.src = avatar
    this._id = id
  }
}
