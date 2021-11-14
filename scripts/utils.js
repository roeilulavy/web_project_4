const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImagePreview = document.querySelector('.popup_type_image-preview');


const closePopupWithEscKey = (evt) => {
    if (evt.key === "Escape"){
        closePopup(document.querySelector('.popup_is-open'));
    }
};

const closePopupByClickOutsideThePopup = (evt) => {
    if (evt.target.classList.contains(`popup_is-open`)){
        closePopup(evt.target);
    }
};

const resetPopup = (popup) => {
    const popupList = popup.querySelector(formSelector);
    const inputList = popup.querySelectorAll(formSettings.inputSelector);
    const buttonList = popup.querySelector(formSettings.submitButtonSelector);

    popupList.reset();
    [...inputList].forEach((inputElement) => hideInputError(inputElement.closest(formSelector), inputElement, formSettings));
    buttonList.classList.add(formSettings.inactiveButtonClass);
};

export function showPopup(popup) {
    popup.classList.add(`popup_is-open`);
    document.addEventListener('keydown',closePopupWithEscKey);
    document.addEventListener('mousedown',closePopupByClickOutsideThePopup);
};

const closePopup = (popup) => {
    popup.classList.remove(`popup_is-open`);
    document.removeEventListener('keydown',  closePopupWithEscKey);
    document.removeEventListener('mousedown',closePopupByClickOutsideThePopup);
    resetPopup(popup);
};