import "./styles/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, cardLikeActive } from "./scripts/card";
import { openModal, closePopup } from "./scripts/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placeList = document.querySelector(".places__list");
const page = document.querySelector(".page");
const content = page.querySelector(".content");

// открытие модального окна редактирования профиля
const EditPopupProfile = page.querySelector(".popup_type_edit");
const BtnPopupProfile = page.querySelector(".profile__edit-button");

// открытие модального окна добавления карточки
const OpenPopupCard = page.querySelector(".popup_type_new-card");
const BtnPopupNewCard = page.querySelector(".profile__add-button");

//открытие фото при клике на картинку
const cardImagePopup = page.querySelector(".popup_type_image");
const cardImagePopupSubtext = page.querySelector(".popup__caption");
const popupImage = page.querySelector(".popup__image");

// плавное закрытие и открытие Popup
const smoothEffect = document.querySelectorAll(".popup");

//  закрытия Popap на клик по крестику
const BtnclosePopapProfile = page.querySelector(
  ".popup_type_edit .popup__close"
);
const BtnclosePopapAddCard = page.querySelector(
  ".popup_type_new-card .popup__close"
);
const BtnCloseImagePopup = page.querySelector(
  ".popup_type_image .popup__close"
);

// изменение информации в профиле с помощи формы
const createProfileForms = document.forms["edit-profile"];
const profileName = createProfileForms.elements.name;
const profileJob = createProfileForms.elements.description;

// добавление новой карточки
const generateCardForms = document.forms["new-place"];
const placeName = generateCardForms.elements["place-name"];
const placeLink = generateCardForms.elements.link;

// ф-ция добавления карточки в проект

function renderInitialCards() {
  initialCards.forEach(function (item) {
    const cardElement = createCard(
      item,
      deleteCard,
      cardLikeActive,
      openImagePreview
    );
    placeList.append(cardElement);
  });
}
renderInitialCards();

// открытие модального окна  профиля

BtnPopupProfile.addEventListener("click", () => {
  openModal(EditPopupProfile);
  getInfoProfile();
});

// открытие модального окна добавления карточки

BtnPopupNewCard.addEventListener("click", () => {
  openModal(OpenPopupCard);
});

//открытие фото при клике на картинку

function openImagePreview(evt) {
  popupImage.src = evt.target.src;

  const popupText = evt.target.alt;
  popupImage.alt = popupText;
  cardImagePopupSubtext.textContent = popupText;

  openModal(cardImagePopup);
}

// закрытие Popup на крестик
BtnclosePopapProfile.addEventListener("click", () => {
  closePopup(EditPopupProfile);
});

BtnclosePopapAddCard.addEventListener("click", () => {
  closePopup(OpenPopupCard);
});

BtnCloseImagePopup.addEventListener("click", () => {
  closePopup(cardImagePopup);
});

// закрытие Popup при клике в на свободное простанство

EditPopupProfile.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) closePopup(EditPopupProfile);
});

OpenPopupCard.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) closePopup(OpenPopupCard);
});

cardImagePopup.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) closePopup(cardImagePopup);
});

// плавный эффект при открытии закрытии popup

smoothEffect.forEach(function (effect) {
  effect.classList.toggle("popup_is-animated");
});

// получение информации профиля

function getInfoProfile() {
  profileName.value = content.querySelector(".profile__title").textContent;
  profileJob.value = content.querySelector(".profile__description").textContent;
}

//Изменение страницы через попап
function handleFormSubmit(evt) {
  evt.preventDefault();
  content.querySelector(".profile__title").textContent = profileName.value;
  content.querySelector(".profile__description").textContent = profileJob.value;
  closePopup(EditPopupProfile);
}

createProfileForms.addEventListener("submit", handleFormSubmit);

// создание новой карточки

function generateNewCards(evt) {
  evt.preventDefault();
  const cardName = placeName.value;
  const cardLink = placeLink.value;

  const unification = { name: cardName, link: cardLink };

  initialCards.push(unification);

  makeNewCard(
    createCard(initialCards[0], deleteCard, cardLikeActive, openImagePreview)
  );
  generateCardForms.reset();
  closePopup(OpenPopupCard);
}

function makeNewCard(newCard) {
  placeList.prepend(newCard);
}

generateCardForms.addEventListener("submit", generateNewCards);
