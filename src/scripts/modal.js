// ф-ция открытия модального окна

export function openModal(popup) {
  popup.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

// ф-ция закрытия модального окна на крестик

export function closePopup(popup) {
  popup.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

export function closePopupEsc(popup) {
  if (popup.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
