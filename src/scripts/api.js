const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "6d4bcd20-cb9e-4c9e-ba0d-b3254b4e51de",
    "Content-Type": "application/json",
  },
};

export {getUserData, getInitialCards, editProfile, changeAvatar, addThisCard, deleteThisCard, clickLike, deleteLike};

// проверка ответа от сервера
const checkedAnswerServer = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

// получение данных о пользователе

 const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkedAnswerServer);
};

// получение карточек

 const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkedAnswerServer);
};

// редактирование профиля

const editProfile = (name, about)=> {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers:config.headers,
    body: json.stringify({
      name:name,
      about:about
    }),
  }).then(checkedAnswerServer);
}

// изменение аватара

 const changeAvatar = (itemAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      itemAvatar: itemAvatar,
    }),
  }).then(checkedAnswerServer);
};

// добавление карточки

 const addThisCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkedAnswerServer);
};


// добавление лайка
 const clickLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkedAnswerServer);
};

// удаление лайка
 const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkedAnswerServer);
};

// удаление карточки

 const deleteThisCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`,
    {
      method: "DELETE",
      headers: config.headers,
    }).then(checkedAnswerServer)
};
