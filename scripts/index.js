const profileName = document.querySelector('.profile__value-name');
const profileAbout = document.querySelector('.profile__value-about');

const profileEditButton = document.querySelector('.profile__button-edit');

const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSubmitButton = popup.querySelector('.popup__submit');
const popupInputName = popup.querySelector('.popup__input_type_name');
const popupInputAbout = popup.querySelector('.popup__input_type_about');

function openPopup() {
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
    popup.classList.add('popup_is-open');
}

function saveUserInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closePopup();
}

function closePopup() {
    popup.classList.remove('popup_is-open');
}

profileEditButton.addEventListener('click', openPopup);

popup.addEventListener('submit', saveUserInfo);

popupCloseButton.addEventListener('click', closePopup);