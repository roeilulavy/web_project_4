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
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImagePreview = document.querySelector('.popup_type_image-preview');
const placesElements = document.querySelector('.elements');

// Buttons and other DOM elements
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const elementTemplate = document.querySelector('#element-template').content.querySelector('.elements__element');

// Open and Close popup
function showPopup(popup) {
  popup.classList.add(`popup_is-open`);
  document.addEventListener('keydown',closePopupWithEscKey);
  document.addEventListener('mousedown',closePopupByClickOutsideThePopup);
}

function closePopup(popup) {
  popup.classList.remove(`popup_is-open`);
  document.removeEventListener('keydown',  closePopupWithEscKey);
  document.removeEventListener('mousedown',closePopupByClickOutsideThePopup);
  resetPopupAndPopupValidation(pageSettings);
  toggleCardFormBtn();
}

function closePopupWithEscKey(evt){
  if (evt.key === "Escape"){
      closePopup(document.querySelector('.popup_is-open'));
  }
}

function closePopupByClickOutsideThePopup (evt){
  if (evt.target.classList.contains(`popup_is-open`)){
      closePopup(evt.target);
  }
}

//Form data
const titleInputValue = editForm.querySelector('.popup__input_type_name');
const descriptionInputValue = editForm.querySelector('.popup__input_type_description');

//Element data
const addElementNameInput = elementForm.querySelector('.popup__input_type_card-name');
const addElementLinkInput = elementForm.querySelector('.popup__input_type_card-link');

function createCardElement(cardData) { //{ name, link }
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.elements__image');
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name
  element.querySelector('.elements__caption').textContent = cardData.name;

  element.querySelector('.elements__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle(`elements__like-button_active`);
  });

  element.querySelector('.elements__delete-button').addEventListener('click', () => {
    element.remove();
  });

  elementImage.addEventListener('click', () => {
    popupImagePreview.querySelector('.popup__image').src = cardData.link;
    popupImagePreview.querySelector('.popup__image').alt = cardData.name;
    popupImagePreview.querySelector('.popup__figure').textContent = cardData.name;
    showPopup(popupImagePreview)
  });

  return element;
}

function elementSubmitHandler(evt) {
  evt.preventDefault();
  const addElement = createCardElement({
    name: addElementNameInput.value,
    link: addElementLinkInput.value
  });
  placesElements.prepend(addElement);
  closePopup(popupAddCard);
  toggleCardFormBtn();
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
  enableValidation(pageSettings);
});

closeButton.forEach(btn => btn.addEventListener('click', () => {
  const popup = btn.closest('.popup');
  closePopup(popup);
}));

initialCards.forEach(initialCardData => {
  placesElements.prepend(createCardElement(initialCardData));
});

function toggleCardFormBtn(){
  const submitButton = popupAddCard.querySelector('.popup__submit');
  submitButton.classList.add(pageSettings.inactiveButtonClass);
};