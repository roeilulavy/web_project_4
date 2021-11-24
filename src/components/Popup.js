export default class Card {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    _handleOutsideClose() {
        if (evt.target.classList.contains(`popup_is-open`)){
            this.close();
        }
    }

    _handleEscClose() {
        if (evt.key === "Escape"){
            this.close();
        }
    }

    open() {
        this_popupSelector.classList.add(`popup_is-open`);
        this.setEventListeners();
    }

    close() {
        this_popupSelector.classList.remove(`popup_is-open`);
    }

    setEventListeners() {
        this._popupSelector.removeEventListener('keydown',this._handleEscClose());
        this._popupSelector.removeEventListener('mousedown',this._handleOutsideClose());
    }

    setEventListeners() {
        this._popupSelector.addEventListener('keydown',this._handleEscClose());
        this._popupSelector.addEventListener('mousedown',this._handleOutsideClose());
    }
}