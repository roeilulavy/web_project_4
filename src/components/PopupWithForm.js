import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submission) {
        super(popupSelector);

        this._submission = submission;
    }

    _getInputValues() {
        const inputInfo = {};
        const inputList = this._popup.querySelectorAll('.popup__input');
        
        inputList.forEach((item) => inputInfo[item.name] = item.value);
        return inputInfo;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector(".popup__close").addEventListener('click', () => {
            this.close(); 
        });
        this._popup.addEventListener('submit', this._submission);
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }
}