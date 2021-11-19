// Buttons
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');

// Popups
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupImagePreview = document.querySelector('.popup_type_image-preview');

// Forms
export const newCardForm = document.querySelector('#add-card-form');
export const editProfileForm = document.querySelector('#edit-profile-form');

//Form data
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

export const titleInputValue = editProfileForm.querySelector('.popup__input_type_name');
export const descriptionInputValue = editProfileForm.querySelector('.popup__input_type_description');

//New card data
export const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
export const newCardLinkInput = newCardForm.querySelector('.popup__input_type_card-link');

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

export function profileData() {
    titleInputValue.value = profileTitle.textContent;
    descriptionInputValue.value = profileDescription.textContent;
};

export function resetNewCardForm(formElement, inputElement, settings) {
    newCardForm.reset();
}

export function showPopup(popup) {
    popup.classList.add(`popup_is-open`);
    document.addEventListener('keydown',closePopupWithEscKey);
    document.addEventListener('mousedown',closePopupByClickOutsideThePopup);
};

export function closePopup(popup) {
    popup.classList.remove(`popup_is-open`);
    document.removeEventListener('keydown',  closePopupWithEscKey);
    document.removeEventListener('mousedown',closePopupByClickOutsideThePopup);
};