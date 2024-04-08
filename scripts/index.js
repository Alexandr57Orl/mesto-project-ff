const cardTemplate = document.querySelector("#card-template").content;

function addCard(info, delCallBack) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = info.link; // добавляем картинку в проект
  cardElement.querySelector(".card__image").alt = info.name; // добавляем текст для скринридера
  cardElement.querySelector(".card__title").textContent = info.name; // добавляем title под картинкой

  const resetButton = cardElement.querySelector(".card__delete-button");
  resetButton.addEventListener("click", () => {
    const listItem = resetButton.closest(".card"); // создаем переменную которая будет принимать callback на удаление карточки
    delCallBack(listItem);
  });
  return cardElement;
}

// фун=ция для удаления карточки
function cleanerCard(listItem) {
  listItem.remove();
}

// функция для формирования новых карточек.
function renderLiCards() {
  const placeList = document.querySelector(".places__list");
  initialCards.forEach(function (item) {
    cardElement = addCard(item, cleanerCard);
    placeList.append(cardElement);
  });
}
renderLiCards();
