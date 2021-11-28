export default class Card {
    constructor(cardData, cardSelector, onImageClick) {
        this._name = cardData.name;
        this._link = cardData.link;

        this._cardSelector = cardSelector;

        this._onImageClick = onImageClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeIcon(evt) {
        evt.target.classList.toggle(`elements__like-button_active`);
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
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

        likeButton.addEventListener('click', this._handleLikeIcon);
        deleteButton.addEventListener('click', () => this._handleDeleteCard());
        cardImage.addEventListener('click', () => this._handlePreviewPicture());
    }

    render() {
        this._element = this._getTemplate();
        this._addEventListeners();

        return this._element;
    }
}