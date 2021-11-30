// Buttons
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
// const allCloseButtons = document.querySelectorAll('.popup__close');

// Popups
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupImagePreview = document.querySelector('.popup_type_image-preview');

// Forms
export const newCardForm = document.querySelector('#add-card-form');
export const editProfileForm = document.querySelector('#edit-profile-form');

//Form data
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// export const titleInputValue = editProfileForm.querySelector('.popup__input_type_name');
// export const descriptionInputValue = editProfileForm.querySelector('.popup__input_type_description');

//New card data
// export const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
// export const newCardLinkInput = newCardForm.querySelector('.popup__input_type_card-link');

export const userData = [{
    userName: profileTitle.textContent,
    userJob: profileDescription.textContent
}]

// export function profileData() {
//     titleInputValue.value = profileTitle.textContent;
//     descriptionInputValue.value = profileDescription.textContent;
// };

export function resetNewCardForm(formElement, inputElement, settings) {
    newCardForm.reset();
}
