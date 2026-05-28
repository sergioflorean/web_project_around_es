import {
  setEventListeners,
  toggleButtonState,
  resetValidation,
} from "./validate.js";

import {
  openModal,
  closeModal,
  handleEscClose,
  handleOverlayClose,
} from "./popupold.js";

console.log("🚀 index.js cargado correctamente");

// ---------------- DATA ----------------
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

// ---------------- DOM ----------------
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");

const closeButtons = document.querySelectorAll(".popup__close");

const formElement = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const saveButton = formElement.querySelector(".popup__button");
const newCardSaveButton = newCardForm.querySelector(".popup__button");

const cardsContainer = document.querySelector(".cards__list");

// ---------------- MODAL CLOSES ----------------

// botón cerrar
closeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");

    closeModal(popup);

    if (popup === editPopup) {
      formElement.reset();
      resetValidation(formElement);
    }

    if (popup === newCardPopup) {
      newCardForm.reset();
      resetValidation(newCardForm);
    }
  });
});

// overlay + ESC
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClose);
});

document.addEventListener("keydown", handleEscClose);

newCardPopup.addEventListener("popupClosed", () => {
  newCardForm.reset();
  resetValidation(newCardForm);
});

// ---------------- PROFILE ----------------
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const fillProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
};

editButton.addEventListener("click", () => {
  fillProfileForm();
  toggleButtonState([nameInput, jobInput], saveButton);
  openModal(editPopup);
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(editPopup);
});

// ---------------- CARDS ----------------
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const handleLike = (e) => {
  e.currentTarget.classList.toggle("card__like-button_is-active");
};

const handleDelete = (e) => {
  e.currentTarget.closest(".card").remove();
};

const getCardElement = (data) => {
  const card = cardTemplate.cloneNode(true);

  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");

  img.src = data.link;
  img.alt = data.name;
  title.textContent = data.name;

  card
    .querySelector(".card__like-button")
    .addEventListener("click", handleLike);

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDelete);

  return card;
};

const renderCard = (item) => {
  cardsContainer.prepend(getCardElement(item));
};

initialCards.forEach(renderCard);

// ---------------- ADD CARD ----------------
addButton.addEventListener("click", () => {
  openModal(newCardPopup);
  toggleButtonState([cardNameInput, cardLinkInput], newCardSaveButton);
});

newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  renderCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });

  newCardForm.reset();
  closeModal(newCardPopup);
});

// ---------------- VALIDATION INIT ----------------
setEventListeners(formElement);
setEventListeners(newCardForm);
