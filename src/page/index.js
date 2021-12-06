// Imports
import { initialCards } from "../scripts/utils/cardsData";
import Section from "../scripts/components/Section";
import Card from "../scripts/components/Cards";
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import UserInfo from "../scripts/components/UserInfo";
import FormValidator from "../scripts/components/FormValidator";
import {
  headerLogo,
  profileImage,
  popupEditProfile,
  popupAddCard,
  cardTemplate,
  placesElements,
  formSettings,
  profileEditButton,
  profileAddButton,
  profileName,
  profileDescription,
  popupInputName,
  popupInputDescription
} from "../scripts/utils/constants";

import '../page/index.css';

//Images
import logo from '../images/logo/logo.svg';
import profileImg from '../images/profile/profile.jpg';

headerLogo.src = logo;
profileImage.src = profileImg;

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', setProfileInfo);
const addNewCardPopup = new PopupWithForm('.popup_type_add-card', submitNewCardForm);
const imagePopup = new PopupWithImage('.popup_type_image-preview');
const profileFormValidator = new FormValidator(formSettings, popupEditProfile);
const cardFormValidator = new FormValidator(formSettings, popupAddCard);
const userInfo = new UserInfo(profileName, profileDescription);


const cardSection = new Section({
  items: initialCards, renderer: (element) => {
    const card = createCard(element);
    cardSection.addItem(card);
  }
}, placesElements);

init();

function init() {
  setEventListeners();
  enableValidations();

  cardSection.render();
}

function enableValidations() {
  cardFormValidator.enableValidation();
  profileFormValidator.enableValidation();
}

function setEventListeners() {
  imagePopup.setEventListeners();
  editProfilePopup.setEventListeners();
  addNewCardPopup.setEventListeners();

  profileEditButton.addEventListener('click', () => {
    editProfilePopup.open();
    
    getProfileInfo();
    profileFormValidator.resetValidation();  
  });
  
  profileAddButton.addEventListener('click', () => {
    addNewCardPopup.open();
    cardFormValidator.resetValidation();
  });
}

function createCard(cardInfo) {
  return new Card(cardInfo, cardTemplate, imagePopup.open).render();
}

function submitNewCardForm(formInfo) {
  const cardElement = createCard(formInfo);
  console.log(formInfo);

  cardSection.addItem(cardElement);
  addNewCardPopup.close();
}

function getProfileInfo() {
  const userData = userInfo.getUserInfo(); 
  popupInputName.value = userData.name;
  popupInputDescription.value = userData.description; 
}

function setProfileInfo(formInfo) {
  userInfo.setUserInfo(formInfo.name, formInfo.description);
  editProfilePopup.close();
}