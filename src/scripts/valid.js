const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationObject
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObject.inputErrorClass);
  errorElement.classList.add(validationObject.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObject.inputErrorClass);
  errorElement.classList.remove(validationObject.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationObject
    );
  } else {
    hideInputError(formElement, inputElement, validationObject);
  }
};

const setEventListeners = (formElement, validationObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationObject.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
};

export const enableValidation = (validationObject) => {
  const formList = Array.from(
    document.querySelectorAll(validationObject.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationObject);
  });
};

export function clearValidation(formElement, validationObject) {
  const buttonElement = formElement.querySelector(
    validationObject.submitButtonSelector
  );
  const inputList = Array.from(
    formElement.querySelectorAll(validationObject.inputSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationObject);
  });
  toggleButtonState(inputList, buttonElement, validationObject);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
  }
}
