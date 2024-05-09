import "./styles/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, toggleLike } from "./scripts/card";
import { openModal, closePopup } from "./scripts/modal.js";

const placeList = document.querySelector(".places__list");
const page = document.querySelector(".page");
const content = page.querySelector(".content");

// общий класс Popup для закрытия на крестик и оверлей, а также для эфеекте плавности
const popups = document.querySelectorAll(".popup");

// открытие модального окна редактирования профиля
const editPopupProfile = page.querySelector(".popup_type_edit");
const btnPopupProfile = page.querySelector(".profile__edit-button");

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

// добавление новой карточки
const cardForm = document.forms["new-place"];
const placeName = cardForm.elements["place-name"];
const placeLink = cardForm.elements.link;

// функция принимает в вызов карточку и метод вставки

function renderCard(item, method = "prepend") {
  const callbacks = {
    deleteCard,
    toggleLike,
    openImagePreview,
  };
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
  getInfoProfile();
});

// открытие модального окна добавления карточки

btnPopupNewCard.addEventListener("click", () => {
  openModal(openPopupCard);
});

//открытие фото при клике на картинку

function openImagePreview(evt) {
  popupImage.src = evt.target.src;

  const popupText = evt.target.alt;
  popupImage.alt = popupText;
  cardImagePopupSubtext.textContent = popupText;

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

//Изменение страницы через попап
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  createName.textContent = profileName.value;
  createJob.textContent = profileJob.value;
  closePopup(editPopupProfile);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// создание новой карточки

function generateNewCard(evt) {
  evt.preventDefault();
  const cardName = placeName.value;
  const cardLink = placeLink.value;

  const newCardData = { name: cardName, link: cardLink };

  addNewCard(createCard(newCardData, deleteCard, toggleLike, openImagePreview));
  cardForm.reset();
  closePopup(openPopupCard);
}

function addNewCard(newCard) {
  placeList.prepend(newCard);
}

cardForm.addEventListener("submit", generateNewCard);
