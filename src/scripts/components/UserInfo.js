import {profileName, profileDescription} from '../index';

export default class UserInfo {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }

    getUserInfo() {
        const userInfo = { name: profileName.textContent, description: profileDescription.textContent };
        return userInfo;
    }

    setUserInfo({name, description}) {
        profileName.textContent = name;
        profileDescription.textContent = description;
    }
}