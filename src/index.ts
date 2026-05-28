import { Card } from "./Card.js";
import type { CardData } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";

const initialCards: CardData[] = [
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

const editButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;
const addButton = document.querySelector(".profile__add-button") as HTMLButtonElement;

const editForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const newCardForm = document.querySelector("#new-card-form") as HTMLFormElement;

const nameInput = editForm.querySelector(".popup__input_type_name") as HTMLInputElement;
const jobInput = editForm.querySelector(".popup__input_type_description") as HTMLInputElement;

const imagePopup = new PopupWithImage("#image-popup");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editFormValidator = new FormValidator(defaultFormConfig, editForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);

const createCard = (data: CardData): HTMLElement => {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });

  return card.getView();
};

const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".cards__list",
);

const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.description,
  });

  editProfilePopup.close();
});

const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  cardSection.addItem(
    createCard({
      name: data["place-name"],
      link: data.link,
    }),
  );

  newCardPopup.close();
});

editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;

  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();

editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

cardSection.renderItems();