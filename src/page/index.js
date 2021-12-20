// Imports
import "regenerator-runtime/runtime";
import Api from '../scripts/utils/api'
import Section from '../scripts/components/Section'
import Card from '../scripts/components/Cards'
import PopupWithImage from '../scripts/components/PopupWithImage'
import PopupWithForm from '../scripts/components/PopupWithForm'
import PopupDeleteCard from "../scripts/components/popupDeleteCard";
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
headerLogo.src = logo

const editProfilePicturePopup = new PopupWithForm('.popup_type_edit-profile-picture', submitNewPicture);
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', setProfileInfo);
const addNewCardPopup = new PopupWithForm('.popup_type_add-card', submitNewCardForm);
const deleteCardPopup = new PopupDeleteCard('.popup_type_delete-card', deleteCard);
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
  // ownerId = userData._id;
  profileImage.src = userData.avatar;

  if(cards) {
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
  deleteCardPopup.setEventListeners()

  profileEditButton.addEventListener('click', () => {
    editProfilePopup.open()
    popupEditProfile.querySelector('.popup__submit').textContent = 'Save';
    getProfileInfo()
    profileFormValidator.resetValidation()
  })

  profileAddButton.addEventListener('click', () => {
    addNewCardPopup.open()
    popupAddCard.querySelector('.popup__submit').textContent = 'Create';
    cardFormValidator.resetValidation()
  })

  profileEditPicture.addEventListener('click', () => {
    editProfilePicturePopup.open();
    popupEditProfilePicture.querySelector('.popup__submit').textContent = 'Save';
    profilePictureValidator.resetValidation();
  })
}

function enableValidations() {
  cardFormValidator.enableValidation()
  profileFormValidator.enableValidation()
  profilePictureValidator.enableValidation()
}

function getProfileInfo() {
  const userData = userInfo.getUserInfo()
  popupInputName.value = userData.name
  popupInputDescription.value = userData.description
}

function createCard(cardInfo) {
  return new Card(
    cardInfo,
    cardTemplate,
    imagePopup.open,
    like,
    dislike,
    handleDeleteCard
    ).render();
}

async function submitNewCardForm(formInfo) {
  try {
    const card = await api.addCard(formInfo.name, formInfo.link);

    if(card){
      popupAddCard.querySelector('.popup__submit').textContent = 'Success!';
      const cardElement = createCard(card)
      cardSection.addItem(cardElement)
    }
  } catch(e) {
    popupAddCard.querySelector('.popup__submit').textContent = 'Failed!';
    console.log("something went wrong..", e);
  }
  
  addNewCardPopup.close()
}

async function like(cardId) {
  try {
    const like = await api.likeCard(cardId);
    if(like){
      return like.likes;
    }
  } catch(e) {
    console.log("something went wrong..", e);
  }
}

async function dislike(cardId) {
  try {
    const dislike = await api.dislikeCard(cardId);
    if(dislike){
      return dislike.likes;
    }
  } catch(e) {
    console.log("something went wrong..", e);
  }
}

function handleDeleteCard(){
// //   console.log('handleDeleteCard')
//   console.log(cardElement, cardId)
  deleteCardPopup.open();
}

async function deleteCard(cardId) {
  try {
    const deleteCard = await api.deleteCard(cardId);
    if(deleteCard){
      console.log(deleteCard);
    }
  } catch(e) {
    console.log("something went wrong..", e);
  }
}

async function setProfileInfo(formInfo) {
  try {
    const newUserData = await api.editUserData(formInfo.name, formInfo.description);

    if(newUserData) {
      popupEditProfile.querySelector('.popup__submit').textContent = 'Success!';
      userInfo.setUserInfo(newUserData.name, newUserData.about);
    }
  } catch(e) {
    popupEditProfile.querySelector('.popup__submit').textContent = 'Failed!';
    console.log("something went wrong..", e);
  }
  
  editProfilePopup.close()
}

async function submitNewPicture(avatar) {
  try {
    const newProfilePictue = await api.editUserPicture(avatar.avatar);

    if(newProfilePictue) {
      popupEditProfilePicture.querySelector('.popup__submit').textContent = 'Success!';
      const userData = await api.getUserData();
      profileImage.src = userData.avatar;
    }
  } catch(e) {
    popupEditProfilePicture.querySelector('.popup__submit').textContent = 'Failed!';
    console.log("something went wrong..", e);
  }
  
  editProfilePicturePopup.close();
}
