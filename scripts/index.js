const profileName = document.querySelector('.profile__value_type_name');
const profileAbout = document.querySelector('.profile__value_type_about');

const profileEditButton = document.querySelector('.profile__button-edit');

const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSubmitButton = popup.querySelector('.popup__submit');
const popupInputName = popup.querySelector('.popup__input_type_name');
const popupInputAbout = popup.querySelector('.popup__input_type_about');


profileEditButton.addEventListener('click', () => {
    popupInputName.value = profileName.textContent;
    popupInputAbout.value = profileAbout.textContent;
    openPopup();
});

popupSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closePopup();
});

popupCloseButton.addEventListener('click', closePopup);

function openPopup() {
    popup.classList.add('popup__is-open');
}

function closePopup() {
    popup.classList.remove('popup__is-open');
}