export default class FormValidator {
    constructor (settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._formElement = formElement;
    }

    _showInputError(inputElement, validationMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _toggleButtonState(inputElements, buttonElement) {
        const hasInvalidInput = inputElements.some(inputElement => !inputElement.validity.valid);
        if (hasInvalidInput) {
          buttonElement.classList.add(this._inactiveButtonClass);
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
        }
      }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        const inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    resetValidation() {
        const inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        
        inputList.forEach(inputElement => {
          this._hideInputError(inputElement);
        });

        this._toggleButtonState(inputList, buttonElement);
      }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}