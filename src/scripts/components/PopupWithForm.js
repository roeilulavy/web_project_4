import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submission) {
        super(popupSelector);

        this._submission = submission;

        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__submit');
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
            this._submitButton.textContent = 'Saving...';

            this._submission(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset(); 
    }
}