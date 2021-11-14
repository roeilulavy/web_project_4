import {showPopup} from './utils.js';

export default class Card {
    constructor(cardData, cardTemplateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.elements__element');
    }

    _handleLikeIcon() {
        evt.target.classList.toggle(`elements__like-button_active`);
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _handlePreviewPicture() {
        const popupImagePreview = document.querySelector('.popup_type_image-preview');

        popupImagePreview.querySelector('.popup__image').src = this._link;
        popupImagePreview.querySelector('.popup__image').alt = this._name;
        popupImagePreview.querySelector('.popup__figure').textContent = this._name;
        showPopup(popupImagePreview);
    }

    _addEventListeners() {
        const likeButton = this._element.querySelector('.elements__like-button');
        const deleteButton = this._element.querySelector('.elements__delete-button');
        const cardImage = this._element.querySelector('.elements__image');

        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.elements__caption').textContent = this._name;

        likeButton.addEventListener('click', this._handleLikeIcon);
        deleteButton.addEventListener('click', this._handleDeleteCard);
        cardImage.addEventListener('click', () => this._handlePreviewPicture());
    }

    render() {
        this._element = this._template.cloneNode(true);

        this._addEventListeners();

        return this._element;
    }
}