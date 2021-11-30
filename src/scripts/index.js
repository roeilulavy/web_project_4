// Imports
import {initialCards} from "./data/cardsData";
import Card from "./components/Cards";
import FormValidator from "./components/FormValidator";
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";
import Section from "./components/Section.js";
import {profileEditButton, profileAddButton} from "./utils.js";
import '../pages/index.css';


const cardTemplateSelector = '#element-template';
const placesElements = '.elements';

const formSelector = '.popup__form';
const formSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// const cardFormValidator = new FormValidator(formSettings, popupAddCard);
// const profileFormValidator = new FormValidator(formSettings, popupEditProfile);

const cardSection = new Section({ data: initialCards }, placesElements);
cardSection.renderer();

// const imagePopup = new PopupWithImage('.popup_type_image-preview');
// imagePopup.setEventListeners();

// const renderCard = (cardData, wrap) => {
//   const card = new Card(cardData, cardTemplateSelector, imagePopup.open);
//   wrap.prepend(card.render());
// };

// initialCards.forEach((cardData) => {
//   renderCard(cardData, placesElements);
// });

profileEditButton.addEventListener('click', () => {
  console.log('profileEditButton');
  const editProfilePopup = new PopupWithForm(formSelector, '.popup_type_edit-profile');
  editProfilePopup.setEventListeners();
});

profileAddButton.addEventListener('click', () => {
  console.log('profileAddButton');
  const addCardPopup = new PopupWithForm(formSelector, '.popup_type_add-card');
  addCardPopup.setEventListeners();
});

// function newCardSubmitHandler(evt) {
//   evt.preventDefault();
//   const newCardElement = createNewCard({name: newCardNameInput.value, link: newCardLinkInput.value});
//   placesElements.prepend(newCardElement);
  // closePopup(popupAddCard);
// }

// newCardForm.addEventListener('submit', newCardSubmitHandler);

// function formSubmitHandler(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = titleInputValue.value;
//   profileDescription.textContent = descriptionInputValue.value;
  // closePopup(popupEditProfile);
// }

// editProfileForm.addEventListener('submit', formSubmitHandler);

// profileEditButton.addEventListener('click', () => {
//   profileData();
//   profileFormValidator.resetValidation();
  // showPopup(popupEditProfile);
// });

// profileAddButton.addEventListener('click', () => {
//   resetNewCardForm();
//   cardFormValidator.resetValidation();
  // showPopup(popupAddCard);
// });

// cardFormValidator.enableValidation();
// profileFormValidator.enableValidation();