import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._imageElement = this._popup.querySelector('.popup__image');
        this._imageCaption = this._popup.querySelector('.popup__figure');
    }

    open = ({ link, name }) => {
        this._imageElement.src = link;
        this._imageElement.alt = `Image ${name}`;
        this._imageCaption.textContent = name;

        super.open();
    }
}