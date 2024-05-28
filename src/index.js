import "./pages/index.css";
import { createCard, deleteCard, toggleLike } from "./scripts/card.js";
import { closePopup, openModal } from "./scripts/modal.js";
import { clearValidation, enableValidation } from "./scripts/valid.js";
import {
  getUserData,
  getInitialCards,
  editProfile,
  addThisCard,
  changeAvatar,
} from "./scripts/api.js";
import { validationObject } from "./validationObject.js";
//DOM nodes
const placeList = document.querySelector(".places__list");
const page = document.querySelector(".page");
const content = page.querySelector(".content");

// общий класс Popup для закрытия на крестик и оверлей, а также для эфеекте плавности
const popups = document.querySelectorAll(".popup");

// открытие модального окна редактирования профиля
const editPopupProfile = page.querySelector(".popup_type_edit");
const btnPopupProfile = page.querySelector(".profile__edit-button");

// открытие модального окна изменения фотографии аватара
const userPopapAvatar = page.querySelector(".profile__image");
const usenNewPopapAvatar = page.querySelector(".popup_type_new-avatar");
const userPopapForm = document.forms["new-avatar"];
const editAvatar = userPopapForm.elements["avatar-link"];

// открытие модального окна добавления карточки
const openPopupCard = page.querySelector(".popup_type_new-card");
const btnPopupNewCard = page.querySelector(".profile__add-button");

//открытие фото при клике на картинку
const cardImagePopup = page.querySelector(".popup_type_image");
const cardImagePopupSubtext = page.querySelector(".popup__caption");
const popupImage = page.querySelector(".popup__image");

// изменение информации в профиле с помощи форм
const profileForm = document.forms["edit-profile"];
const profilePopapName = profileForm.elements.name;
const profilePopapJob = profileForm.elements.description;

// изменение значений  страницы

const createTitleName = content.querySelector(".profile__title");
const createDescriptionJob = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");

// добавление новой карточки
const cardForm = document.forms["new-place"];
const placeName = cardForm.elements["place-name"];
const placeLink = cardForm.elements.link;

// const callbacks = {
//   deleteCard: deleteCard,
//   toggleLike: toggleLike,
//   openImagePreview: openImagePreview,
// };

// объект валидации

enableValidation(validationObject);

//Открытие модального окна  профиля
btnPopupProfile.addEventListener("click", () => {
  openModal(editPopupProfile);
  clearValidation(editPopupProfile, validationObject);
  handleProfileFormSubmit();
});

//открытие модального окна  добавления  карточки
btnPopupNewCard.addEventListener("click", () => {
  openModal(openPopupCard);
  clearValidation(openPopupCard, validationObject);
});

//Открытие модального окна для изменения аватара пользователя
userPopapAvatar.addEventListener("click", function () {
  openModal(usenNewPopapAvatar);
  clearValidation(usenNewPopapAvatar, validationObject);
});

//открытие фото при клике на карточку
function openImagePreview(evt) {
  popupImage.src = evt.target.src;

  const popupTitle = evt.target.alt;
  popupImage.alt = popupTitle;
  cardImagePopupSubtext.textContent = popupTitle;
  openModal(cardImagePopup);
}

// закрытие Popup на крестик и на свободное простанство
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    } else if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//Плавное открытие и закрытие попапов
popups.forEach(function (currentModal) {
  currentModal.classList.toggle("popup_is-animated");
});

//Асинхронный общий промис для получения информации о пользователе и карточек
Promise.all([getUserData(), getInitialCards()])
  .then((data) => {
    const userData = data[0]; // данные о пользователе из промиса userInfo()
    const cardDate = data[1]; //массив карточек из промиса requestCardsArray()
    //далее работаем с этими переменными в текущем и следующем промисе
    const userId = userData._id;

    createTitleName.textContent = userData.name; //отрисовываем имя
    createDescriptionJob.textContent = userData.about; //отрисовываем подзаголовок
    profileImage.style = `background-image: url('${userData.avatar}')`; //отрисовываем аватар

    return [cardDate, userId];
  })
  .then(([cardDate, userId]) => {
    //работа с данными для отрисовки карточек
    cardDate.forEach(function (card) {
      placeList.append(
        createCard(card, deleteCard, toggleLike, openImagePreview, userId)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Заполнение полей формы именем/описанием значениями со страницы
function handleProfileFormSubmit() {
  createTitleName.textContent = profilePopapName.value;
  createDescriptionJob.textContent = profilePopapJob.value;
}

//Изменение данных профиля через попап + вызов промиса
function editProfileData(evt) {
  evt.preventDefault();

  let name = profilePopapName.value;
  let job = profilePopapJob.value;

  askSave(true, profileForm.querySelector(".popup__button"));
  editProfile(name, job)
    .then((data) => {
      createTitleName.textContent = data.name;
      createDescriptionJob.textContent = data.job;
      closePopup(editPopupProfile);
      profileForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => askSave(false, profileForm.querySelector(".popup__button")));
}

profileForm.addEventListener("submit", editProfileData);

//Изменение аватара пользователя + вызов промиса
function editAvatarImage(evt) {
  evt.preventDefault();

  const avatarLink = editAvatar.value;

  askSave(true, userPopapForm.querySelector(".popup__button"));
  changeAvatar(avatarLink)
    .then((data) => {
      let avatarImage = data.avatar;
      userPopapAvatar.style = `background-image: url(${avatarImage})`;
      closePopup(usenNewPopapAvatar);
      userPopapForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      askSave(false, userPopapForm.querySelector(".popup__button"));
    });
}

userPopapForm.addEventListener("submit", editAvatarImage);

//  создание новой карточки
function generateNewCard(evt) {
  evt.preventDefault();
  const cardName = placeName.value;
  const cardLink = placeLink.value;

  askSave(true, cardForm.querySelector(".popup__button"));
  addThisCard(cardName, cardLink)
    .then((data) => {
      addNewCard(
        createCard(data, deleteCard, toggleLike, openImagePreview, userId)
      );
      cardForm.reset();
      closePopup(openPopupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      askSave(false, cardForm.querySelector(".popup__button"));
    });
}

function addNewCard(newCard) {
  placeList.prepend(newCard);
}

cardForm.addEventListener("submit", generateNewCard);

//Отображение процесса обработки запроса на кнопках модальных окон
function askSave(loader, button) {
  if (loader) {
    button.textContent = "Сохранение.....";
  } else if (!loader) {
    button.textContent = "Сохранить";
  }
}
