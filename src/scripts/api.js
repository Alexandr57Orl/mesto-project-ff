const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "6d4bcd20-cb9e-4c9e-ba0d-b3254b4e51de",
    "Content-Type": "application/json",
  },
};

//общая функция-обработчик ответа сервера
const showErrop = (res) => {
  return Promise.reject(`Ошибка: ${res.status}`);
};

//запрос на получение данных пользователя
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(showErrop);
};

//запрос на получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(showErrop);
};

//запрос на редактирование профиля
export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(showErrop);
};

//Обновление аватара пользователя
export const changeAvatar = (itemAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: itemAvatar,
    }),
  }).then(showErrop);
};

//Добавление новой карточки
export const addThisCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(showErrop);
};

//Постановка лайка
export const clickLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(showErrop);
};

//Cнятие лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(showErrop);
};

//Удаление карточки
export const deleteThisCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(showErrop);
};
