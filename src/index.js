import "./styles/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, toggleLike } from "./scripts/card";
import { openModal, closePopup } from "./scripts/modal.js";
import { clearValidation, enableValidation } from "./scripts/valid.js";
import {
  getUserData,
  editProfile,
  addThisCard,
  deleteThisCard,
  getInitialCards,
  changeAvatar,
  clickLike,
  deleteLike,
} from "./scripts/api.js";

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

// изменение информации в профиле с помощи формы
const profileForm = document.forms["edit-profile"];
const profileName = profileForm.elements.name;
const profileJob = profileForm.elements.description;

const createName = content.querySelector(".profile__title");
const createJob = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");
// добавление новой карточки
const cardForm = document.forms["new-place"];
const placeName = cardForm.elements["place-name"];
const placeLink = cardForm.elements.link;

const callbacks = {
  deleteCard: deleteCard,
  openImagePreview: openImagePreview,
  toggleLike: toggleLike,
};

// объект валидации

const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationObject);

// функция принимает в вызов карточку и метод вставки

function renderCard(item, method = "prepend") {
  // создаем карточку, передавая обработчики в виде объекта `callbacks`
  const cardElement = createCard(item, callbacks);

  // вставляем карточку, используя метод (вставится `prepend` или `append`)
  placeList[method](cardElement);
}

// ф-ция добавления карточки в проект

function renderInitialCards() {
  initialCards.forEach(function (item) {
    renderCard(item, "append");
  });
}
renderInitialCards();

// открытие модального окна  профиля

btnPopupProfile.addEventListener("click", () => {
  openModal(editPopupProfile);
  clearValidation(editPopupProfile, validationObject);
  getInfoProfile();
  handleProfileFormSubmit();
});

// открытие модального окна добавления карточки

btnPopupNewCard.addEventListener("click", () => {
  openModal(openPopupCard);
  clearValidation(openPopupCard, validationObject);
  getInfoProfile();
  handleCardFormSubmit();
});

// Открытие модального окна для изменения аватара пользователя
userPopapAvatar.addEventListener("click", function () {
  openModal(usenNewPopapAvatar);
  clearValidation(usenNewPopapAvatar, validationObject);
});
//открытие фото при клике на картинку

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

// плавный эффект при открытии закрытии popup

popups.forEach(function (modalWin) {
  modalWin.classList.toggle("popup_is-animated");
});

// получение информации профиля

function getInfoProfile() {
  profileName.value = createName.textContent;
  profileJob.value = createJob.textContent;
}

// создание новой карточки

function generateNewCard(evt) {
  evt.preventDefault();
  const cardName = placeName.value;
  const cardLink = placeLink.value;

  const newCardData = { name: cardName, link: cardLink };

  addNewCard(createCard(newCardData, callbacks));
  cardForm.reset();
  closePopup(openPopupCard);
}

function addNewCard(newCard) {
  placeList.prepend(newCard);
}

cardForm.addEventListener("submit", generateNewCard);

// функция запрашивающая на сохранение информации профиля

function askSave(loader, button) {
  if (loader) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

// промис для заполнения инфо профиля и карточки
let userId;

Promise.all([getUserData(), getInitialCards()])
  .then((data) => {
    const userProfile = data[0];
    const cardDate = data[1];

    userId = user._id;

    profileName.textContent = userProfile.name;
    profileJob.textContent = userProfile.about;
    profileImage.style = `background-image: url(${userProfile.avatar})`;

    return [userId, cardDate];
  })
  .then(([userId, cardDate]) => {
    cardDate.forEach(function (item) {
      placeList.append(createCard(item, callbacks, userId));
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Данные профиля
function handleProfileFormSubmit() {
  createName.textContent = profileName.value;
  createJob.textContent = profileJob.value;
}
// изменение страницы через попап с api, Promise
const handleProfileEditePromise = (evt) => {
  evt.preventDefault();
  const name = profileName.value;
  const about = profileJob.value;

  askSave(true, profileForm.querySelector(".popup__button"));
  editProfile(name, about)
    .then((data) => {
      createName.textContent = data.name;
      createJob.textContent = data.about;
      closePopup(editPopupProfile);
      editPopupProfile.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      askSave(false, profileForm.querySelector(".popup__button"));
    });
};

editPopupProfile.addEventListener("submit", handleProfileEditePromise);

// изменение аватарки

const handleAvatarEditePromise = (evt) => {
  evt.preventDefault();
  const avatarUrl = editAvatar.value;

  askSave(true, profileForm.querySelector(".popup__button"));
  changeAvatar(avatarUrl)
    .then((data) => {
      usenNewPopapAvatar.style = `background-image: url(${data.avatar})`;
      closePopup(userPopapAvatar);
      usenNewPopapAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      askSave(false, profileForm.querySelector(".popup__button"));
    });
};
userPopapForm.addEventListener("submit", handleAvatarEditePromise);
