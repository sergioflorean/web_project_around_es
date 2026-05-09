console.log("🚀 index.js cargado correctamente");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// boton para abrir el modal de editar perfil
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

//botones para agregar nuevas tarjeta
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");

// elementos del modal de imagen
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imageCloseButton = imagePopup.querySelector(".popup__close");

// referencia al formulario para manejar el submit
const formElement = document.querySelector("#edit-profile-form");

// elementos del formulario de editar perfil
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// referencia al formulario para agregar nuevas tarjetas
const newCardForm = document.querySelector("#new-card-form");

// elementos del formulario de agregar nuevas tarjetas
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);

// contenedor de tarjeta
const cardsContainer = document.querySelector(".cards__list");

// funciones para abrir y cerrar el modal de editar perfil
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
};
// eventos para abrir y cerrar el modal de editar perfil
editButton.addEventListener("click", () => {
  handleOpenEditModal();
});

closeButton.addEventListener("click", () => {
  closeModal(editPopup);
});
// popup para agregar nuevas tarjetas
addButton.addEventListener("click", () => {
  openModal(newCardPopup);

  toggleButtonState(cardInputList, newCardSaveButton);

  cardInputList.forEach((input) => {
    checkInputValidity(newCardForm, input);
  });
});
// cerrar popup para agregar nuevas tarjetas
newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardPopup);
});

// template de la tarjeta
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//Crear una función llamada getCardElement() que creará un elemento de tarjeta a partir de un objeto de datos.
const getCardElement = (data) => {
  //Hacer que la función getCardElement() maneje datos potencialmente incompletos utilizando parámetros predeterminados.
  const { name = "Sin título", link = "../images/placeholder.jpg" } = data;

  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // 1. Selecciona el botón "Me gusta" del elemento de la tarjeta.
  const likeButton = cardElement.querySelector(".card__like-button");
  // 2. Establece un detector de clics en él
  likeButton.addEventListener("click", handleLikeEvent);

  // 1. Selecciona el botón "Eliminar" del elemento de la tarjeta.
  const deleteButton = cardElement.querySelector(".card__delete-button");
  // 2. Establece un detector de clics en él
  deleteButton.addEventListener("click", handleDeleteEvent);

  /// Establecer un detector de clics en la imagen del elemento de la tarjeta en tu función getCardElement().
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
};

//Implementar la función handler para cambiar la apariencia del botón like.
const handleLikeEvent = (event) => {
  const likeButton = event.currentTarget;
  likeButton.classList.toggle("card__like-button_is-active");
  console.log("like clickeado");
};
///implementar la funcion para eliminar la tarjeta
const handleDeleteEvent = (event) => {
  const deleteButton = event.currentTarget;
  const cardElement = deleteButton.closest(".card");
  cardElement.remove();
  console.log("tarjeta eliminada");
};
//Implementar la función handler para abrir la imagen en un modal.
const handleImageClick = (event) => {
  const cardImage = event.currentTarget;

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  openModal(imagePopup);

  // agegar un listener SOLO cunado se abre
  imageCloseButton.addEventListener("click", handleImageCloseClick);
};

//nueva funcion para cerrar la imagen al hacer clic fuera de ella
const handleImageCloseClick = () => {
  closeModal(imagePopup);

  // eliminar el listener al cerrar
  imageCloseButton.removeEventListener("click", handleImageCloseClick);
};
//rear una función llamada renderCard() que tomará el nombre de la tarjeta, su enlace y el contenedor de la tarjeta como argumentos, y antepondrá el nuevo elemento creado con getCardElement() al contenedor HTML apropiado (en el que se ubicaron las tarjetas que estaban hardcoded).

const renderCard = (name, link, container) => {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
};

//En el bucle forEach() llama a renderCard() con todos los parámetros necesarios.
initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});

//funcion que solo rellene los campos de entrada del formulario con los valores mostrados en la pagina

const fillProfileForm = () => {
  console.log("Valor actual nombre:", profileTitle.textContent);
  console.log("Valor actual descripción:", profileDescription.textContent);

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

// Implementar otra función handleOpenEditModal() que rellenará el formulario y abrirá la ventana emergente, llamando a otras dos funciones existentes.

const handleOpenEditModal = () => {
  console.log("Abriendo modal de edición");

  fillProfileForm();
  toggleButtonState(inputList, saveButton);
  openModal(editPopup);

  inputList.forEach((input) => {
    checkInputValidity(formElement, input);
  });
};

//Implementa la función handleProfileFormSubmit().

const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  console.log("Formulario enviado");

  console.log("Valor del input nombre:", nameInput.value);
  console.log("Valor del input descripción:", descriptionInput.value);

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);

  console.log("Perfil actualizado en la página");
};
//Implementar la función handleCardFormSubmit().
const handleCardFormSubmit = (event) => {
  event.preventDefault();
  console.log("Formulario de nueva tarjeta enviado");

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsContainer);

  newCardForm.reset();
  closeModal(newCardPopup);
  console.log("Nueva tarjeta agregada a la página");
};
//Utiliza el método addEventListener() para detectar cuándo envía el usuario el formulario y llama a la función handleProfileFormSubmit().
formElement.addEventListener("submit", handleProfileFormSubmit);
//utiliza el método addEventListener() para detectar cuándo envía el usuario el formulario de nueva tarjeta y llama a la función handleCardFormSubmit().
newCardForm.addEventListener("submit", handleCardFormSubmit);

/// VALIDACIONES DEFORMULKARIOS

const inputList = [nameInput, descriptionInput];
const cardInputList = [cardNameInput, cardLinkInput];

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);

  if (buttonElement.disabled) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
};

const saveButton = formElement.querySelector(".popup__button");
const newCardSaveButton = newCardForm.querySelector(".popup__button");

const showInputError = (form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`.${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.name}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
};

const checkInputValidity = (form, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement);
  }
};

inputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(formElement, input);
    toggleButtonState(inputList, saveButton);
  });
});

cardInputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(newCardForm, input);
    toggleButtonState(cardInputList, newCardSaveButton);
  });
});

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    // si el click fue directamente en el fondo (overlay)
    if (event.target === event.currentTarget) {
      closeModal(popup);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});
