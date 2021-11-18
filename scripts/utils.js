import {profileData as getProfileData, formSettings, popupEditProfile, popupAddCard} from "./index.js";
import FormValidator from "./FormValidator.js";

// Buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');

// Popups
const popupImagePreview = document.querySelector('.popup_type_image-preview');

profileEditButton.addEventListener('click', () => {
    showPopup(popupEditProfile);
    getProfileData();
});

profileAddButton.addEventListener('click', () => {
    showPopup(popupAddCard);
});

closeButton.forEach(btn => btn.addEventListener('click', () => {
    const popup = btn.closest('.popup');
    closePopup(popup);
}));

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

export function showPopup(popup) {
    const resetValidation = new FormValidator(formSettings, popup);
    if(popup != popupImagePreview){
        resetValidation.resetValidation();
    }

    popup.classList.add(`popup_is-open`);
    document.addEventListener('keydown',closePopupWithEscKey);
    document.addEventListener('mousedown',closePopupByClickOutsideThePopup);
};

export function closePopup(popup) {
    popup.classList.remove(`popup_is-open`);
    document.removeEventListener('keydown',  closePopupWithEscKey);
    document.removeEventListener('mousedown',closePopupByClickOutsideThePopup);
};