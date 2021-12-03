// Imports
import { initialCards } from "../scripts/utils/cardsData";
import Section from "../scripts/components/Section";
import Card from "../scripts/components/Cards";
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import UserInfo from "../scripts/components/UserInfo";
import FormValidator from "../scripts/components/FormValidator";
import {cardTemplate, placesElements} from "../scripts/utils/constants";

import '../page/index.css';

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
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const inputCardTitle = document.querySelector('.popup__input_type_card-name');
const inputUrl = document.querySelector('.popup__input_type_card-link');

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
const userInfo = new UserInfo(profileName.textContent, profileDescription.textContent);


profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();
  getProfileInfo();
  profileFormValidator.resetValidation();
  editProfileEventListener();
});

profileAddButton.addEventListener('click', () => {
  addNewCardPopup.open();
  addNewCardEventListener();
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

function submitNewCardForm(formInfo) {
  const cardElement = createCard(formInfo);

  cardSection.addItem(cardElement);
  addNewCardPopup.close();
}

function getProfileInfo() {
  const userData = userInfo.getUserInfo(); 
  popupInputName.value = userData.name;
  popupInputDescription.value = userData.description; 
}

function setProfileInfo(formInfo) {
  // userInfo.setUserInfo(formInfo);
  console.log(formInfo);
  profileName.value = formInfo.name;
  
}

function editProfileEventListener() {
  editProfilePopup.setEventListeners();
}

function addNewCardEventListener() {
  addNewCardPopup.setEventListeners();
}

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();



