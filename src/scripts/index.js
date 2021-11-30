// Imports
import { initialCards } from "./data/cardsData";
import Card from "./components/Cards";
import FormValidator from "./components/FormValidator";
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";
import Section from "./components/Section.js";
import '../pages/index.css';

//Popups
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', saveUserInfo);
const addNewCardPopup = new PopupWithForm('.popup_type_add-card', submitNewCardForm);
const imagePopup = new PopupWithImage('.popup_type_image-preview');
imagePopup.setEventListeners();

//Buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//DOM Elements
const cardTemplate = '#element-template';
const placesElements = '.elements';

const formSelector = '.popup__form';
const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();
  editProfilePopup.setEventListeners();
  
});

profileAddButton.addEventListener('click', () => {
  addNewCardPopup.open();
  addNewCardPopup.setEventListeners();

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


function saveUserInfo(event) {
  event.preventDefault();
  infoAboutUser.setUserInfo({ name: inputName.value, description: inputDescription.value });
  editProfilePopup.close();
}

function submitNewCardForm(event) {
  event.preventDefault();
  const cardElement = createCard({
    name: inputCardTitle.value,
    link: inputUrl.value
  });

  cardSection.addItem(cardElement);
  addNewCardPopup.close();
}