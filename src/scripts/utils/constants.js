export const cardTemplate = '#element-template';
export const placesElements = '.elements';

//Images
export const headerLogo = document.querySelector('.header__logo');
export const profileImage = document.querySelector('.profile__profile-image');

//Popups
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupDeleteCard = document.querySelector('.popup_type_delete-card');

//Buttons
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

//DOM Elements
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputDescription = document.querySelector('.popup__input_type_description');

//Form
export const formSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_type_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }