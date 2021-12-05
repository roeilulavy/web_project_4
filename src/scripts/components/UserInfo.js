export default class UserInfo {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }

    getUserInfo() {
        const getUserData = { name: this._name, description: this._description };
        return getUserData;
    }

    setUserInfo(name, description) {
        this._name = name;
        this._description = description;
    }
}