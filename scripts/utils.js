import {editProfileData, formSelector, formSettings} from "./index.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

profileEditButton.addEventListener('click', () => {
    showPopup(popupEditProfile);
    editProfileData();
});

profileAddButton.addEventListener('click', () => {
    showPopup(popupAddCard);
});

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

// const resetPopup = (popup) => {
//     const popupList = popup.querySelector(formSelector);
//     const inputList = popup.querySelectorAll(formSettings.inputSelector);
//     const buttonList = popup.querySelector(formSettings.submitButtonSelector);

//     popupList.reset();

//     [...inputList].forEach((inputElement) => hideError(inputElement.closest(formSelector), inputElement, formSettings));
//     buttonList.classList.add(formSettings.inactiveButtonClass);
// };

export function showPopup(popup) {
    popup.classList.add(`popup_is-open`);
    document.addEventListener('keydown',closePopupWithEscKey);
    document.addEventListener('mousedown',closePopupByClickOutsideThePopup);
};

export function closePopup(popup) {
    popup.classList.remove(`popup_is-open`);
    document.removeEventListener('keydown',  closePopupWithEscKey);
    document.removeEventListener('mousedown',closePopupByClickOutsideThePopup);
    // resetPopup(popup);
};

closeButton.forEach(btn => btn.addEventListener('click', () => {
    const popup = btn.closest('.popup');
    closePopup(popup);
  }));