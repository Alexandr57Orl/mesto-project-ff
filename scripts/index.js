const cardTemplate = document.querySelector("#card-template").content;

function addCard(info, delCallBack) {
  const cardElement = cardTemplate
    .querySelector(".places__item ")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = info.link;
  cardElement.querySelector(".card__image").alt = info.name;
  cardElement.querySelector(".card__title").textContent = info.name;

  const resetButton = cardElement.querySelector(".card__delete-button");
  resetButton.addEventListener("click", () => {
    delCallBack(cardElement);
  });

  return cardElement;
}

function cleanerCard(card) {
  card.remove();
}

function renderCards() {
  const placesList = document.querySelector(".places__list");
  initialCards.forEach(function (element) {
    cardElement = addCard(element, cleanerCard);
    placesList.append(cardElement);
  });
}

renderCards();
