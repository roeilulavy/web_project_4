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
        console.log("Error");
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

    toggleButtonState(inputList, buttonElement, pageSettings);  
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, pageSettings);
            toggleButtonState(inputList, buttonElement, pageSettings);
        })
    })
}

// Enable the validation
function enableValidation(pageSettings) {
    const formList = Array.from(document.querySelectorAll(pageSettings.formSelector));
    
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, pageSettings)
    });
}

enableValidation(pageSettings);

// Reset
function resetPopup(popup) {
    const popupList = popup.querySelector(pageSettings.formSelector);
    const inputList = popup.querySelectorAll(pageSettings.inputSelector);

    popupList.reset();
    [...inputList].forEach((inputElement) => hideInputError(inputElement.closest(pageSettings.formSelector), inputElement, pageSettings));
}