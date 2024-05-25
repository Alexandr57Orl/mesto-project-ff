import { clickLike, deleteLike,deleteThisCard } from "./api";

function createCard(item, { deleteCard, toggleLike, openImagePreview,userId }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  const likeCardButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  // добавляем обработчики событий карточки

  likeCardButton.addEventListener("click", toggleLike);

  cardImage.addEventListener("click", openImagePreview);

  deleteButton.addEventListener("click", () => {
    const listItem = deleteButton.closest(".card"); // создаем переменную которая будет принимать callback на удаление карточки
    deleteCard(listItem);
  });
  return cardElement;
}

// фун=ция для удаления карточки
function deleteCard(listItem) {
  listItem.remove();
}

// ф-ция лайка карточки

function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, toggleLike };
