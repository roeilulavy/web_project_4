const profileName = document.querySelector('.profile__value-name');
const profileAbout = document.querySelector('.profile__value-about');

const profileEditButton = document.querySelector('.profile__button-edit');

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSubmitButton = popupForm.querySelector('.popup__submit');
const popupInputName = popupForm.querySelector('.popup__input_type_name');
const popupInputAbout = popupForm.querySelector('.popup__input_type_about');

function openPopup() {
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
    popup.classList.add('popup_is-open');
}

function closePopup() {
    popup.classList.remove('popup_is-open');
}

function saveUserInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closePopup();
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', saveUserInfo);