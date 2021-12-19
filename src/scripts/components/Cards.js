import { ownerId } from "../../page";
import { deleteCardConfirm } from "../../page";
import Api from "../utils/api";

export default class Card {
    constructor(cardData, cardSelector, onImageClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._cardId = cardData._id;
        this._ownerId = cardData.owner._id;

        this._cardSelector = cardSelector;

        this._onImageClick = onImageClick;

        this._element;
        this._likeButton = document.querySelector('.elements__like-button');
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);

        return cardElement;
    }

    _getLikeStatus() {
        this._likes.forEach((like) => {
            if(like._id === ownerId) {
                this._likeButton.classList.add(`elements__like-button_active`);
            }
        })
    }

    _handleLikeClick(evt) {
        console.log('Like Clicked');
        evt.target.classList.toggle(`elements__like-button_active`);
    }

    _handleDeleteCard() {
        console.log('Delete?')
        deleteCardConfirm(this._cardId);

        // this._element.remove();
        // this._element = null;
    }

    _handlePreviewPicture() {
        this._onImageClick({ link: this._link, name: this._name });
    }

    _addEventListeners() {
        const likeButton = this._element.querySelector('.elements__like-button');
        const deleteButton = this._element.querySelector('.elements__delete-button');
        const cardImage = this._element.querySelector('.elements__image');
        const likesCount = this._likes;

        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.elements__caption').textContent = this._name;
        this._element.querySelector('.elements__like-counter').textContent = likesCount.length;

        if(this._ownerId !== ownerId) {
            deleteButton.style.display = 'none';
        }

        likeButton.addEventListener('click', this._handleLikeClick);
        deleteButton.addEventListener('click', () => this._handleDeleteCard());
        cardImage.addEventListener('click', () => this._handlePreviewPicture());
    }

    render() {
        this._element = this._getTemplate();
        this._addEventListeners();
        this._getLikeStatus();

        return this._element;
    }
}