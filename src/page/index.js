// Imports
import { initialCards } from "../components/cardsData";
import Section from "../components/Section.js";
import Card from "../components/Cards";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";

import '../page/index.css';

//Images
import logo from '../images/logo/logo.svg';
import profileImg from '../images/profile/profile.jpg';

//Popups
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', setProfileInfo);
const addNewCardPopup = new PopupWithForm('.popup_type_add-card', submitNewCardForm);
const imagePopup = new PopupWithImage('.popup_type_image-preview');
imagePopup.setEventListeners();

//Buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//DOM Elements
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const inputCardTitle = document.querySelector('.popup__input_type_card-name');
const inputUrl = document.querySelector('.popup__input_type_card-link');

const headerLogo = document.querySelector('.header__logo');
headerLogo.src = logo;
const profileImage = document.querySelector('.profile__profile-image');
profileImage.src = profileImg;

const userInfo = new UserInfo({ name: profileName.textContent, description: profileDescription.textContent });

const cardTemplate = '#element-template';
const placesElements = '.elements';

//Form
const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileFormValidator = new FormValidator(formSettings, popupEditProfile);
const cardFormValidator = new FormValidator(formSettings, popupAddCard);

profileEditButton.addEventListener('click', () => {
  getProfileInfo();
  editProfilePopup.open();
  editProfilePopup.setEventListeners();
  profileFormValidator.resetValidation();
});

profileAddButton.addEventListener('click', () => {
  addNewCardPopup.open();
  addNewCardPopup.setEventListeners();
  cardFormValidator.resetValidation();
});

function createCard(cardInfo) {
  return new Card(cardInfo, cardTemplate, imagePopup.open).render();
}

const cardSection = new Section({
  items: initialCards, renderer: (element) => {
    const card = createCard(element);
    cardSection.addItem(card);
  }
}, placesElements);

cardSection.render();

function submitNewCardForm(event) {
  event.preventDefault();
  const cardElement = createCard({
    name: inputCardTitle.value,
    link: inputUrl.value
  });

  cardSection.addItem(cardElement);
  addNewCardPopup.close();
}

function getProfileInfo() {
  const userData = userInfo.getUserInfo();
  popupInputName.value = userData.name;
  popupInputDescription.value = userData.description;
}

function setProfileInfo(event) {
  event.preventDefault();
  userInfo.setUserInfo({ name: popupInputName.value, description: popupInputDescription.value });
  editProfilePopup.close();
}

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();