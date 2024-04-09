const cardTemplate = document.querySelector("#card-template").content;
const placeList = document.querySelector(".places__list");

function createCard(info, delCallBack) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardElementContainer = cardElement.querySelector(".card__image");
  cardElementContainer.src = info.link; // добавляем картинку в проект
  cardElementContainer.alt = info.name; // добавляем текст для скринридера
  cardElement.querySelector(".card__title").textContent = info.name; // добавляем title под картинкой

  const resetButton = cardElement.querySelector(".card__delete-button");
  resetButton.addEventListener("click", () => {
    const listItem = resetButton.closest(".card"); // создаем переменную которая будет принимать callback на удаление карточки
    delCallBack(listItem);
  });
  return cardElement;
}

// фун=ция для удаления карточки
function deleteCard(listItem) {
  listItem.remove();
}

// функция для формирования новых карточек.
function renderInitialCards() {
  initialCards.forEach(function (item) {
    cardElement = createCard(item, deleteCard);
    placeList.append(cardElement);
  });
}
renderInitialCards();
