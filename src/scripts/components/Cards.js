export default class Card {
  constructor (
    cardData,
    cardSelector,
    onImageClick,
    like,
    dislike,
    handleDeleteCard,
    userId
  ) {
    this._name = cardData.name
    this._link = cardData.link
    this._likes = cardData.likes
    this._cardId = cardData._id
    this._cardOwnerId = cardData.owner._id
    this._userId = userId._id

    this._cardSelector = cardSelector

    this._onImageClick = onImageClick
    this._like = like
    this._dislike = dislike
    this._handleDeleteCard = handleDeleteCard

    this._element
  }

  _getTemplate () {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true)

    return cardElement
  }

  _getUserLikeStatus () {
    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this._element.querySelector('.elements__like-button').classList.add(`elements__like-button_active`)
      }
    })
  }

  _getLikeCount (likes) {
    const likesCount = likes.length
    this._element.querySelector('.elements__like-counter').textContent = likesCount
  }

  _handlePreviewPicture () {
    this._onImageClick({ link: this._link, name: this._name })
  }

  _addEventListeners () {
    const likeButton = this._element.querySelector('.elements__like-button')
    const deleteButton = this._element.querySelector('.elements__delete-button')
    const cardImage = this._element.querySelector('.elements__image')

    cardImage.src = this._link
    cardImage.alt = this._name
    this._element.querySelector('.elements__caption').textContent = this._name
    this._element.querySelector('.elements__like-counter').textContent = this._likes.length

    if (this._cardOwnerId !== this._userId) {
      deleteButton.style.display = 'none'
    }

    cardImage.addEventListener('click', () => this._handlePreviewPicture())

    likeButton.addEventListener('click', async evt => {
      evt.preventDefault()
      try {
        if (!likeButton.classList.contains(`elements__like-button_active`)) {
          const like = await this._like(this._cardId)
          if (like) {
            evt.target.classList.add(`elements__like-button_active`)
            this._getLikeCount(like)
          }
        } else {
          const dislike = await this._dislike(this._cardId)
          if (dislike) {
            evt.target.classList.remove(`elements__like-button_active`)
            this._getLikeCount(dislike)
          }
        }
      } catch (e) {
        return Promise.reject(`Error ${e.status}, ${e.statusText}`)
      }
    })

    deleteButton.addEventListener('click', async evt => {
      evt.preventDefault()
      await this._handleDeleteCard(this._element, this._cardId)
    })
  }

  render () {
    this._element = this._getTemplate()
    this._addEventListeners()
    this._getUserLikeStatus()

    return this._element
  }
}
