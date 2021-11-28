import Popup from "./Popup";

export default class UserInfo extends Popup {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        console.log('Get user info')
        const userName = this._popup.querySelector('.popup__input_type_name');
        const userJob = this._popup.querySelector('.popup__input_type_description');

    }

    setUserInfo() {

    }
}