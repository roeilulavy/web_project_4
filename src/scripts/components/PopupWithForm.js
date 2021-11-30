import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(submission, popupSelector) {
        super(popupSelector);

        this._submission = submission;
    }

    _getInputValues() {

    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close');
        const submitButton = this._popup.querySelector('.popup__submit');

        closeButton.addEventListener('click', this.close());
        submitButton.addEventListener('click', this.close());

        this._popup.classList.add('popup_is-open');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        console.log('11111');
        this._popup.classList.remove('popup_is-open');
        document.removeEventListener('keyup', this._handleEscClose);
    }
}