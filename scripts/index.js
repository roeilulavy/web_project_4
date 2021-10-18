const elementTemplate = document.querySelector("#template").content;
const elements = document.querySelector('.elements');

const profileName = document.querySelector('.profile__value-name');
const profileAbout = document.querySelector('.profile__value-about');

const profileEditButton = document.querySelector('.profile__button-edit');
const cardEditButton = document.querySelector('.profile__button-add');

function openPopup(popup) {
  popup.classList.add('popup_is-open');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-open');
}

// image popup
const imagePopup = document.querySelector('.image-popup');
const imagePopupFigure = document.querySelector('.popup__figure');
const imageUrl = document.querySelector('.popup__image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');


function createCard(cardInfo) {
  const cardTemplate = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const imageTemplate = cardTemplate.querySelector(".elements__image");
  const likeButton = cardTemplate.querySelector('.elements__like-button');
  const deleteButton = cardTemplate.querySelector('.elements__delete-button');

  cardTemplate.querySelector('.elements__caption').textContent = cardInfo.name;
  imageTemplate.src = cardInfo.link;
  imageTemplate.alt = cardInfo.name;

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle(`elements__like-button_active`);
  });

  deleteButton.addEventListener('click', (evt) => {
    cardTemplate.remove();
  });

  cardTemplate.querySelector('.elements__image').addEventListener('click', () => {
    openPopup(imagePopup);
    imagePopupFigure.textContent = cardInfo.name;
    imageUrl.src = cardInfo.link;
    imageUrl.alt = cardInfo.name;
  });

  return cardTemplate;
}

initialCards.forEach(cardInfo => {
  elements.append(createCard(cardInfo));
})

imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
})

//create card popup
const cardPopup = document.querySelector('.card-popup');
const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close');
const cardPopupSubmitButton = cardPopupForm.querySelector('.popup__submit');
const popupInputTitle = cardPopupForm.querySelector('.popup__input_type_card-title');
const popupInputUrl = cardPopupForm.querySelector('.popup__input_type_card-url');

cardEditButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

cardPopupCloseButton.addEventListener('click', () => {
  closePopup(cardPopup);
});

function saveNewCard(event) {
  event.preventDefault();
  const cardElement = createCard({
    name: popupInputTitle.value,
    link: popupInputUrl.value
  });

  elements.prepend(cardElement);
  closePopup(cardPopup);
  cardPopupForm.reset();
}

cardPopupForm.addEventListener('submit', saveNewCard);

//profile popup
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupCloseButton = popup.querySelector('.popup__close');
const popupInputName = popupForm.querySelector('.popup__input_type_name');
const popupInputAbout = popupForm.querySelector('.popup__input_type_about');

function fillProfileForm() {
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
}

function saveUserInfo(event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  closePopup(popup);
}

profileEditButton.addEventListener('click', () => {
  openPopup(popup);
  fillProfileForm();
});

popupCloseButton.addEventListener('click', () => {
  closePopup(popup)
});

popupForm.addEventListener('submit', saveUserInfo);