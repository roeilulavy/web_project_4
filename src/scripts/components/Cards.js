import { ownerId } from "../../page";
import { deleteCardPopup } from "../../page";

export default class Card {
    constructor(cardData, cardSelector, onImageClick, like, dislike, deleteCard) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._cardId = cardData._id;
        this._ownerId = cardData.owner._id;

        this._cardSelector = cardSelector;

        this._onImageClick = onImageClick;
        this._like = like;
        this._dislike = dislike;
        this._deleteCard = deleteCard;

        this._element;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);

        return cardElement;
    }

    _getUserLikeStatus() {
        this._likes.forEach((like) => {
            if(like._id === ownerId) {
                this._element.querySelector('.elements__like-button').classList.add(`elements__like-button_active`);
            }
        })
    }

    _getLikeCount(likes) {
        const likesCount = likes.length;
        this._element.querySelector('.elements__like-counter').textContent = likesCount;
    }

    // _handleLikeClick(evt) {
    //     console.log('like clicked')
    //     const likeButton = document.querySelector('.elements__like-button');
        
    //     if(!likeButton.classList.contains(`elements__like-button_active`)){
    //         console.log('Like Activated')
    //     } else {   
    //         console.log('Like Deactivated')
    //     }
    //     evt.target.classList.toggle(`elements__like-button_active`);
    // }

    _handleDeleteCard() {
        console.log('Delete?')
        deleteCardPopup.open(this._element, this._cardId);
    }

    _handlePreviewPicture() {
        this._onImageClick({ link: this._link, name: this._name });
    }

    _addEventListeners() {
        const likeButton = this._element.querySelector('.elements__like-button');
        const deleteButton = this._element.querySelector('.elements__delete-button');
        const cardImage = this._element.querySelector('.elements__image');

        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.elements__caption').textContent = this._name;
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length;

        if(this._ownerId !== ownerId) {
            deleteButton.style.display = 'none';
        }

        // likeButton.addEventListener('click', this._handleLikeClick);
        deleteButton.addEventListener('click', () => this._handleDeleteCard());
        cardImage.addEventListener('click', () => this._handlePreviewPicture());


        likeButton.addEventListener('click', async (evt) => {
            evt.preventDefault();
            if(!likeButton.classList.contains(`elements__like-button_active`)){
                const like = await this._like(this._cardId);
                if(like){
                    evt.target.classList.add(`elements__like-button_active`);
                    this._getLikeCount(like);
                }
            } else {
                const dislike = await this._dislike(this._cardId);
                if(dislike){
                    evt.target.classList.remove(`elements__like-button_active`);
                    this._getLikeCount(dislike);
                }
            }
        });
    }

    render() {
        this._element = this._getTemplate();
        this._addEventListeners();
        this._getUserLikeStatus();

        return this._element;
    }
}