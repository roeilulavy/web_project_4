// Imports
import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";
import { closePopup } from "./utils.js"; 

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

// Popups
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');

// Wrappers
const editForm = document.querySelector('.popup__form');
const newCardForm = document.querySelector('.popup__form_type_add-card');
const placesElements = document.querySelector('.elements');
const cardTemplateSelector = '#element-template';

// Buttons and other DOM elements
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Form data
const titleInputValue = editForm.querySelector('.popup__input_type_name');
const descriptionInputValue = editForm.querySelector('.popup__input_type_description');

//New card data
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_card-link');


export const formSelector = '.popup__form';
export const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardTemplateSelector);

  placesElements.prepend(card.render());
});

const getFormList = Array.from(document.querySelectorAll(formSelector));
getFormList.forEach((formElement) => {
  const formValidator = new FormValidator(formSettings, formElement);

  formValidator.enableValidation();
});

export function profileData() {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
}

function createNewCard(cardData) {
  return new Card(cardData, cardTemplateSelector).render();
}

function newCardSubmitHandler(evt) {
  evt.preventDefault();

  const addElement = createNewCard({
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  });
  placesElements.prepend(addElement);
  closePopup(popupAddCard);
}

newCardForm.addEventListener('submit', newCardSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closePopup(popupEditProfile);
}

editForm.addEventListener('submit', formSubmitHandler);