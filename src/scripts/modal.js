// ф-ция открытия модального окна

export function openModal(evt) {
  evt.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

// ф-ция закрытия модального окна на крестик

export function closePopup(evt) {
  evt.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
