const pageSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_type_disable",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

// Show and Hide Error
function showInputError(formElement, inputElement, errorMessage, pageSettings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(pageSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(pageSettings.errorClass);
}

function hideInputError(formElement, inputElement, pageSettings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(pageSettings.inputErrorClass);
    errorElement.classList.remove(pageSettings.errorClass);
    errorElement.textContent = "";
}

// Check the input validity
function checkInputValidity(formElement, inputElement, pageSettings) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, pageSettings);
    } else {
        hideInputError(formElement, inputElement, pageSettings);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
}

// Toggle button state
function toggleButtonState(inputList, buttonElement, pageSettings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(pageSettings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(pageSettings.inactiveButtonClass);
    }
}

// Event listener for validation
function setEventListeners(formElement, pageSettings) {
    const inputList = Array.from(formElement.querySelectorAll(pageSettings.inputSelector));
    const buttonElement = formElement.querySelector(pageSettings.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, pageSettings);
            toggleButtonState(inputList, buttonElement, pageSettings);
        });
    });
}

// Enable the validation
function enableValidation(pageSettings) {
    const formList = Array.from(document.querySelectorAll(pageSettings.formSelector));
    const inputList = Array.from(document.querySelectorAll(pageSettings.inputElement));
    const buttonElement = document.querySelector(pageSettings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, pageSettings);
    
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, pageSettings);
    });
}

// Reset
function resetPopup(popup) {
    const popupList = popup.querySelector(pageSettings.formSelector);
    const inputList = popup.querySelectorAll(pageSettings.inputSelector);
    const buttonList = popup.querySelector(pageSettings.submitButtonSelector);

    popupList.reset();
    [...inputList].forEach((inputElement) => hideInputError(inputElement.closest(pageSettings.formSelector), inputElement, pageSettings));
    buttonList.classList.add(pageSettings.inactiveButtonClass);
}