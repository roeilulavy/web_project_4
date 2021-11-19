// Imports
import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";
import {
  profileEditButton,
  profileAddButton,
  profileData,
  showPopup,
  closePopup,
  popupEditProfile, 
  popupAddCard,
  editProfileForm,
  profileTitle,
  profileDescription,
  titleInputValue,
  descriptionInputValue,
  newCardForm,
  newCardNameInput,
  newCardLinkInput,
  resetNewCardForm
} from "./utils.js"; 

const initialCards = [{
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
},
{
  name: "Lake Louise",
  link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
},
{
  name: "Bald Mountains",
  link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
},
{
  name: "Latemar",
  link: "https://code.s3.yandex.net/web-code/latemar.jpg"
},
{
  name: "Vanoise National Park",
  link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
},
{
  name: "Lago di Braies",
  link: "https://code.s3.yandex.net/web-code/lago.jpg"
}
];

const cardTemplateSelector = '#element-template';
const placesElements = document.querySelector('.elements');

const formSelector = '.popup__form';
const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardFormValidator = new FormValidator(formSettings, popupAddCard);
const profileFormValidator = new FormValidator(formSettings, popupEditProfile);

initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardTemplateSelector);
  placesElements.prepend(card.render());
});

function newCardSubmitHandler(evt) {
  evt.preventDefault();
  const addElement = {name: newCardNameInput.value, link: newCardLinkInput.value};
  const newCard = new Card(addElement, cardTemplateSelector);
  placesElements.prepend(newCard.render());
  closePopup(popupAddCard);
}

newCardForm.addEventListener('submit', newCardSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closePopup(popupEditProfile);
}

editProfileForm.addEventListener('submit', formSubmitHandler);

profileEditButton.addEventListener('click', () => {
  profileData();
  profileFormValidator.resetValidation();
  showPopup(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  resetNewCardForm();
  cardFormValidator.resetValidation();
  showPopup(popupAddCard);
});

const getFormList = Array.from(document.querySelectorAll(formSelector));
getFormList.forEach((formElement) => {
  const formValidator = new FormValidator(formSettings, formElement);
  formValidator.enableValidation();
});