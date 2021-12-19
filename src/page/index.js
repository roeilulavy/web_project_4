// Imports
import "regenerator-runtime/runtime";
import Api from '../scripts/utils/api'
import Section from '../scripts/components/Section'
import Card from '../scripts/components/Cards'
import PopupWithImage from '../scripts/components/PopupWithImage'
import PopupWithForm from '../scripts/components/PopupWithForm'
import UserInfo from '../scripts/components/UserInfo'
import FormValidator from '../scripts/components/FormValidator'
import {
  headerLogo,
  profileImage,
  popupEditProfile,
  popupAddCard,
  cardTemplate,
  placesElements,
  formSettings,
  profileEditPicture,
  profileEditButton,
  profileAddButton,
  profileName,
  profileDescription,
  popupEditProfilePicture,
  popupInputName,
  popupInputDescription
} from '../scripts/utils/constants'

import '../page/index.css'

//Images
import logo from '../images/logo/logo.svg'
// import profileImg from '../images/profile/profile.jpg'

//Token: 03197c45-af19-4b1d-a978-69b8bedd3378 Group ID: group-12q

headerLogo.src = logo
// profileImage.src = profileImg

const editProfilePicturePopup = new PopupWithForm('.popup_type_edit-profile-picture', submitNewPicture);
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', setProfileInfo);
const addNewCardPopup = new PopupWithForm('.popup_type_add-card', submitNewCardForm);
const imagePopup = new PopupWithImage('.popup_type_image-preview');
const profilePictureValidator = new FormValidator(formSettings, popupEditProfilePicture)
const profileFormValidator = new FormValidator(formSettings, popupEditProfile)
const cardFormValidator = new FormValidator(formSettings, popupAddCard)
const userInfo = new UserInfo(profileName, profileDescription)

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  token: '03197c45-af19-4b1d-a978-69b8bedd3378'
})

const cardSection = new Section(
  {
    renderer: element => {
      const card = createCard(element)
      cardSection.addItem(card)
    }
  },
  placesElements
)


init()

async function init() {
  const [userData, cards] = await Promise.all([
    api.getUserData(),
    api.getInitialCards()
  ])

  userInfo.setUserInfo(userData.name, userData.about);
  profileImage.src = userData.avatar;

  if (cards){
    cardSection.render(cards);
  }

  setEventListeners()
  enableValidations()
}

function setEventListeners() {
  imagePopup.setEventListeners()
  editProfilePicturePopup.setEventListeners()
  editProfilePopup.setEventListeners()
  addNewCardPopup.setEventListeners()

  profileEditButton.addEventListener('click', () => {
    editProfilePopup.open()
    getProfileInfo()
    profileFormValidator.resetValidation()
  })

  profileAddButton.addEventListener('click', () => {
    addNewCardPopup.open()
    cardFormValidator.resetValidation()
  })

  profileEditPicture.addEventListener('click', () => {
    editProfilePicturePopup.open();
    profilePictureValidator.resetValidation();
  })
}

function enableValidations() {
  cardFormValidator.enableValidation()
  profileFormValidator.enableValidation()
  profilePictureValidator.enableValidation()
}

function createCard(cardInfo) {
  return new Card(cardInfo, cardTemplate, imagePopup.open).render();
}

async function submitNewCardForm(formInfo) {
  const card = await api.addCard(formInfo.name, formInfo.link);

  if(card){
    const cardElement = createCard(card)
    cardSection.addItem(cardElement)
  }
  addNewCardPopup.close()
}

function getProfileInfo() {
  const userData = userInfo.getUserInfo()
  popupInputName.value = userData.name
  popupInputDescription.value = userData.description
}

async function setProfileInfo(formInfo) {
  const newUserData = await api.editUserData(formInfo.name, formInfo.description);
  if(newUserData) {
    userInfo.setUserInfo(newUserData.name, newUserData.about);
  }

  editProfilePopup.close()
}

async function submitNewPicture(avatar) {
  console.log(avatar.avatar);
  const newProfilePictue = await api.editUserPicture(avatar.avatar);
  if(newProfilePictue) {
    const userData = await api.getUserData();
    profileImage.src = userData.avatar;
  }
  editProfilePicturePopup.close();
}
