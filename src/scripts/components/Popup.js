const ESC_KEYCODE = 27

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this.close.bind(this)
  }

  setEventListeners () {
    this._popup.addEventListener('click', evt => {
      if (
        evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close')
      ) {
        this.close()
      }
    })
  }

  open () {
    this._popup.classList.add('popup_is-open')
    document.addEventListener('keyup', this._handleEscClose)
  }

  close () {
    this._popup.classList.remove('popup_is-open')
    document.removeEventListener('keyup', this._handleEscClose)
  }

  _handleEscClose = evt => {
    evt.preventDefault()

    if (evt.which === ESC_KEYCODE) {
      this.close()
    }
  }
}
