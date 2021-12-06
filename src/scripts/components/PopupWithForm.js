import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submission) {
        super(popupSelector);

        this._submission = submission;

        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        
    }

    _getInputValues() {
        const inputInfo = {};
        
        this._inputList.forEach((item) => inputInfo[item.name] = item.value);
        return inputInfo;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submission(this._getInputValues());
        });
    }

    close() {        
        this._popupForm.reset();
        super.close();
    }
}