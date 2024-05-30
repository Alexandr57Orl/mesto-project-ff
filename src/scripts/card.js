import { clickLike, deleteThisCard, deleteLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export function createCard(
  card,
  deleteCard,
  toggleLike,
  openImagePreview,
  userId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  const likeCardButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCount = cardElement.querySelector(".like_counter");

  const cardId = card._id;
  const cardOwnerId = card.owner._id;

  //ищем элемент в массиве лайков для которого истинно условие (id пользователя есть среди массива лайкнувших карточку). Возвращаем true  в переменной.
  const likeOwner = card.likes.some(function (likes) {
    return likes._id === userId;
  });

  if (likeOwner) {
    likeCardButton.classList.add("card__like-button_is-active");
  } else {
    likeCardButton.classList.remove("card__like-button_is-active");
  }

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikeCount.textContent = card.likes.length;

  comparisonDeleteButton(userId, cardOwnerId, deleteButton);

  // добавляем обработчики событий карточки
  likeCardButton.addEventListener("click", (evt) => {
    toggleLike(evt, cardId, cardLikeCount);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardId, cardElement);
  });

  cardImage.addEventListener("click", openImagePreview);

  // возвращаем готовую карточку
  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  deleteThisCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Произошла ошибка при удалении карточки:`, err);
    });
}

//Функция лайка карточки
export function toggleLike(evt, cardId, cardLikeCount) {
  const btnForLike = evt.target.classList.contains("card__like-button");
  const checkLike = evt.target.classList.contains(
    "card__like-button_is-active"
  );
  if (btnForLike && !checkLike) {
    evt.target.classList.toggle("card__like-button_is-active");
    clickLike(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(`Произошла ошибка при лайке:`, err);
        evt.target.classList.remove("card__like-button_is-active");
      });
  } else if (btnForLike && checkLike) {
    evt.target.classList.remove("card__like-button_is-active");
    deleteLike(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(`Произошла ошибка при удаления лайка:`, err);
      });
  }
}

//Логика отображения и дизейбла иконки удаления карточки
function comparisonDeleteButton(userId, cardOwnerId, button) {
  if (cardOwnerId !== userId) {
    button.disabled = true;
    button.style.display = "none";
  }
}
