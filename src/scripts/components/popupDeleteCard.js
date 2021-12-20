import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, deleteCard) {
        super(popupSelector);
        this._deleteCard = deleteCard;

    }

    setEventListeners() {
        super.setEventListeners();
    }

    close() {
        super.close();
    }

    open(cardElement, cardId) {
        super.open();

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            cardElement.remove();
            this.close();
            this._deleteCard(cardId);
        })
    }
}