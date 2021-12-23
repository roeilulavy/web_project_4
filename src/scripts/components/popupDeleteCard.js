import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
  }

  handleDeleteConfirm(submit) {
    this._deleteCard = submit
  }

  setEventListeners () {
    super.setEventListeners()

    this._popup.addEventListener('submit', evt => {
      evt.preventDefault()
      this._deleteCard()
    })
  }
    
}
