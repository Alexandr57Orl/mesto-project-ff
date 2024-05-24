const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "6d4bcd20-cb9e-4c9e-ba0d-b3254b4e51de",
    "Content-Type": "application/json",
  },
};

// проверка ответа от сервера
const checkedAnswerServer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// получение данных о пользователе

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkedAnswerServer);
};

// получение карточек

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkedAnswerServer);
};

// редактирование профиля

export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkedAnswerServer);
};

// изменение аватара

export const changeAvatar = (itemAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      itemAvatar: itemAvatar,
    }),
  }).then(checkedAnswerServer);
};

// добавление карточки

export const addThisCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkedAnswerServer);
};

// удаление карточки

export const deleteThisCard = (name, link) => {
  return (
    fetch(`${config.baseUrl}/cards`),
    {
      method: "DELETE",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }.then(checkedAnswerServer)
  );
};

// добавление лайка
export const clickLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkedAnswerServer);
};

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkedAnswerServer);
};
