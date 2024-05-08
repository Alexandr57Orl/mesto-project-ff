const cardTemplate = document.querySelector("#card-template").content;

export function createCard(info, deleteCallBack, toggleLike, openImagePreview) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardElementContainer = cardElement.querySelector(".card__image");
  cardElementContainer.src = info.link; // добавляем картинку в проект
  cardElementContainer.alt = info.name; // добавляем текст для скринридера
  cardElement.querySelector(".card__title").textContent = info.name; // добавляем title под картинкой

  const likeCardButton = cardElement.querySelector(".card__like-button");
  likeCardButton.addEventListener("click", toggleLike);

  cardElementContainer.addEventListener("click", openImagePreview);

  const resetButton = cardElement.querySelector(".card__delete-button");
  resetButton.addEventListener("click", () => {
    const listItem = resetButton.closest(".card"); // создаем переменную которая будет принимать callback на удаление карточки
    deleteCallBack(listItem);
  });
  return cardElement;
}

// фун=ция для удаления карточки
export function deleteCard(listItem) {
  listItem.remove();
}

// ф-ция лайка карточки

export function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Если есть возможность и работа не имеет критических ошибок, поясните в "можно лучше" пожалуйста, как все ф-ции объединить в объект и передать его в качестве параметра
