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
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const placesElements = document.querySelector('.elements');

// Buttons and other DOM elements
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const elementTemplate = document.querySelector('#element-template').querySelector('.elements__element');

//Form data
const titleInputValue = editForm.querySelector('.popup__input_type_name');
const descriptionInputValue = editForm.querySelector('.popup__input_type_description');

function createCardElement(cardData) { //{ name, link }
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.elements__image');
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name
  element.querySelector('.elements__caption').textContent = cardData.name;

  return element;
}

function togglePopupWindow(popupWindow) {
  if (!popupWindow.classList.contains('popup_is')) {
    titleInputValue.value = profileTitle.textContent;
    descriptionInputValue.value = profileDescription.textContent;
  }
  popupWindow.classList.toggle('popup_is-open');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  togglePopupWindow();
}

editForm.addEventListener('submit', formSubmitHandler);

profileAddButton.addEventListener('click', function() { togglePopupWindow(popupAddCard) });
profileEditButton.addEventListener('click', function() { togglePopupWindow(popupEditProfile) });

closeButton.forEach(btn => btn.addEventListener('click', () => {
  const allPopups = document.querySelectorAll('.popup');
  allPopups.forEach(popup => popup.classList.remove('popup_is-open'))
}));

initialCards.forEach(initialCardData => {
  placesElements.prepend(createCardElement(initialCardData));
})