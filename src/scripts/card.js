import { clickLike, deleteLike,deleteThisCard } from "./api";

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

function createCard(item, { deleteCard, toggleLike, openImagePreview,userId }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  const likeCardButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCount = cardElement.querySelector(".like__count");

  // получения id овенера и соответственно id карточки

  const ownerId = card.owner._id;
  const cardId = card._id;
  ;

  //ищем элемент в массиве лайков для которого истинно условие (id пользователя есть среди массива лайкнувших карточку). Возвращаем true  в переменной.
  const likeOwner = card.likes.some(function(likes) { 
    return likes._id === userId;
}); 

// проверяем лайкнул ли пользователь карточку. Если да, то добавляем активный класс к лайку. Иначе нет.

  if (likeOwner) {
    likeCardButton.classList.add("card__like-button_is-active");
  }
  else {
    likeCardButton.classList.remove("card__like-button_is-active");
  }

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLikeCount.textContent = item.likes.length;

  renderDeleteCardButton(userId, ownerId, deleteButton);
  // добавляем обработчики событий карточки

  likeCardButton.addEventListener("click", (evt) => {
    toggleLike(evt,cardId, cardLikeCount);
  });

  cardImage.addEventListener("click", openImagePreview);

  deleteButton.addEventListener("click", () => {
    deleteCard(cardId, cardElement);
  });

  // возвращаем готовую карточку
  return cardElement;
}

// фун=ция для удаления карточки
 function deleteCard(cardId,cardElement) {
  deleteThisCard(cardId);
  cardElement.remove();
}

// ф-ция лайка карточки

function toggleLike(evt, cardId, cardLikeCount) {
  if(evt.target.classList.contains('card__like-button') && !(evt.target.classList.contains('card__like-button_is-active'))){
    evt.target.classList.toggle('card__like-button_is-active');
    clickLike(cardId)
        .then ((data) => {
        cardLikeCount.textContent = data.likes.length;
 })
        .catch((err) => {
        console.log(err);
})
} else if(evt.target.classList.contains('card__like-button') && (evt.target.classList.contains('card__like-button_is-active'))) {
    evt.target.classList.remove('card__like-button_is-active');
    deleteLike(cardId) 
        .then ((data) => {
        cardLikeCount.textContent = data.likes.length;
 })
        .catch((err) => {
        console.log(err);
})
}
}


//Логика отображения/скрытия иконки удаления карточки 
function renderDeleteCardButton(userId, ownerId, button) {
  if (userId == ownerId) {
      button.hidden = false;
  }
  else if(!(userId == ownerId)){
      button.hidden = true;
  };
}

export { createCard, deleteCard, toggleLike };
