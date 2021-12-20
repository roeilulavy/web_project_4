import { ownerId } from "../../page";
import { deleteCardPopup } from "../../page";

export default class Card {
    constructor(cardData, cardSelector, onImageClick, like, dislike) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._cardId = cardData._id;
        this._ownerId = cardData.owner._id;

        this._cardSelector = cardSelector;

        this._onImageClick = onImageClick;
        this._like = like;
        this._dislike = dislike;

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

    _getLikeCount() {
        const likesCount = this._likes;
        this._element.querySelector('.elements__like-counter').textContent = likesCount.length;
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

        if(this._ownerId !== ownerId) {
            deleteButton.style.display = 'none';
        }

        // likeButton.addEventListener('click', this._handleLikeClick);
        deleteButton.addEventListener('click', () => this._handleDeleteCard());
        cardImage.addEventListener('click', () => this._handlePreviewPicture());


        likeButton.addEventListener('click', async (evt) => {
            if(!likeButton.classList.contains(`elements__like-button_active`)){
                console.log('Like Activated')
                const like = await this._like(this._cardId);
                if(like){
                    evt.target.classList.toggle(`elements__like-button_active`);
                    this._getLikeCount();
                }
            } else {
                console.log('Like Deactivated')
                const dislike = await this._dislike(this._cardId);
                if(dislike){
                    evt.target.classList.toggle(`elements__like-button_active`);
                    this._getLikeCount();
                }
            }
            console.log('Like func Done!')
        });
    }

    render() {
        this._element = this._getTemplate();
        this._addEventListeners();
        this._getLikeCount();
        this._getLikeStatus();

        return this._element;
    }
}