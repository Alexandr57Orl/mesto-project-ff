const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  info,
  delCallBack,
  cardLikeActive,
  openImagePreview
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardElementContainer = cardElement.querySelector(".card__image");
  cardElementContainer.src = info.link; // добавляем картинку в проект
  cardElementContainer.alt = info.name; // добавляем текст для скринридера
  cardElement.querySelector(".card__title").textContent = info.name; // добавляем title под картинкой

  const likeCardButton = cardElement.querySelector(".card__like-button");
  likeCardButton.addEventListener("click", cardLikeActive);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", openImagePreview);

  const resetButton = cardElement.querySelector(".card__delete-button");
  resetButton.addEventListener("click", () => {
    const listItem = resetButton.closest(".card"); // создаем переменную которая будет принимать callback на удаление карточки
    delCallBack(listItem);
  });
  return cardElement;
}

// фун=ция для удаления карточки
export function deleteCard(listItem) {
  listItem.remove();
}

// ф-ция лайка карточки

export function cardLikeActive(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
