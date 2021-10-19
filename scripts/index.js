// Wrappers
const popupWindow = document.querySelector('.popup');
const editForm = document.querySelector('.popup__form');

// Buttons and other DOM elements
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Form data
const titleInputValue = editForm.querySelector('.popup__input_type_name');
const descriptionInputValue = editForm.querySelector('.popup__input_type_description');

function togglePopupWindow() {
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

profileEditButton.addEventListener('click', togglePopupWindow);
popupCloseButton.addEventListener('click', togglePopupWindow);