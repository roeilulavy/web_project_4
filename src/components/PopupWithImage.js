import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open = ({ link, name }) => {
        const imageElement = this._popup.querySelector('.popup__image');
        const imageCaption = this._popup.querySelector('.popup__figure');

        imageElement.src = link;
        imageElement.alt = `Image ${name}`;
        imageCaption.textContent = name;

        this._popup.classList.add('popup_is-open');
        document.addEventListener('keyup', this._handleEscClose);
    }
}