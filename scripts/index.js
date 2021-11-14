// Imports
import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";

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

// Wrappers
const editForm = document.querySelector('.popup__form');
const elementForm = document.querySelector('.popup__form_type_add-card');
const placesElements = document.querySelector('.elements');
const cardTemplateSelector = '#element-template';
console.log(cardTemplateSelector);

// Buttons and other DOM elements
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


//Form data
const titleInputValue = editForm.querySelector('.popup__input_type_name');
const descriptionInputValue = editForm.querySelector('.popup__input_type_description');

//Element data
const addElementNameInput = elementForm.querySelector('.popup__input_type_card-name');
const addElementLinkInput = elementForm.querySelector('.popup__input_type_card-link');

function elementSubmitHandler(evt) {
  evt.preventDefault();
  const addElement = createCardElement({
    name: addElementNameInput.value,
    link: addElementLinkInput.value
  });
  placesElements.prepend(addElement);
  closePopup(popupAddCard);
}

elementForm.addEventListener('submit', elementSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closePopup(popupEditProfile);
}

editForm.addEventListener('submit', formSubmitHandler);

profileAddButton.addEventListener('click', function() { showPopup(popupAddCard) });

profileEditButton.addEventListener('click', () => { 
  showPopup(popupEditProfile);
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
});

closeButton.forEach(btn => btn.addEventListener('click', () => {
  const popup = btn.closest('.popup');
  closePopup(popup);
}));

//-----------//

initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardTemplateSelector);

  placesElements.prepend(card.render());
});

const formSelector = '.popup__form';
const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const getFormList = Array.from(document.querySelectorAll(formSelector));
getFormList.forEach((formElement) => {
  const formValidator = new FormValidator(formSettings, formElement);

  formValidator.enableValidation();
});