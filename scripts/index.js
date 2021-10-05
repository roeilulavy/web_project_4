let profileName = document.querySelector('.profile__value_type_name');
let profileAbout = document.querySelector('.profile__value_type_about');

let profileEditButton = document.querySelector('.profile__button-edit');

let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close');
let popupSubmitButton = popup.querySelector('.popup__submit');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputAbout = popup.querySelector('.popup__input_type_about');


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