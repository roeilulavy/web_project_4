import Card from "./Cards.js";
import PopupWithImage from "./PopupWithImage.js";

const cardTemplateSelector = '#element-template';
const imagePopup = new PopupWithImage('.popup_type_image-preview');
imagePopup.setEventListeners();

export default class Section {
    constructor({ items, renderer }, cardSelector) {
        this._items = items;
        this._renderer = renderer;

        this._container = document.querySelector(cardSelector);
    }

    renderer() {
        this._items.forEach(item => {
            const card = new Card(item, cardTemplateSelector, imagePopup.open);
            this.addItem(card.render());
        });
    }

    addItem(element) {
        this._container.append(element);
    }
}