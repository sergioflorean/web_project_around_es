import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./Apis.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import type { ApiUserData, ApiCardData } from "./Apis.js";



const editButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;
const addButton = document.querySelector(".profile__add-button") as HTMLButtonElement;

const editForm = document.querySelector("#edit-profile-form") as HTMLFormElement;
const newCardForm = document.querySelector("#new-card-form") as HTMLFormElement;

const avatarButton = document.querySelector(
  ".profile__avatar-button",
) as HTMLButtonElement;

const avatarForm = document.querySelector(
  'form[name="avatar-form"]',
) as HTMLFormElement;

const nameInput = editForm.querySelector(".popup__input_type_name") as HTMLInputElement;
const jobInput = editForm.querySelector(".popup__input_type_description") as HTMLInputElement;

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
const imagePopup = new PopupWithImage("#image-popup");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",

});

const editFormValidator = new FormValidator(defaultFormConfig, editForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);


const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "fb77c790-d10c-4d94-974d-1fba8ca79c2b",
    "Content-Type": "application/json",
  },
});

// const createCard = (data: CardData): HTMLElement => {
//   const card = new Card(data, "#card-template", (name, link) => {
//     imagePopup.open(name, link);
//   });

//   return card.getView();
// };
let currentUserId = "";
const createCard = (data: ApiCardData): HTMLElement => {
  const card = new Card(
    data,
    "#card-template",
    currentUserId,
    (name, link) => {
      imagePopup.open(name, link);
    },
    async (cardId, isLiked) => {
      try {
        const updatedCard = await api.changeLikeCardStatus(cardId, isLiked);

        card.updateLikeStatus(updatedCard.isLiked);
      } catch (err: unknown) {
        console.error("Error changing like status:", err);
      }
    },
    (cardId) => {
      deleteCardPopup.setSubmitAction(async () => {
        try {
          await api.deleteCard(cardId);

          card.removeCard();
          deleteCardPopup.close();
        } catch (err: unknown) {
          console.error("Error deleting card:", err);
        }
      });

      deleteCardPopup.open();
    },
  );

  return card.getView();
};

const cardSection = new Section<ApiCardData>(
  {
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".cards__list",
);

// const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
//   userInfo.setUserInfo({
//     name: data.name,
//     job: data.description,
//   });

//   editProfilePopup.close();
// });

const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
  try {
    editProfilePopup.renderLoading(true);

    const data = {
      name: inputValues.name,
      about: inputValues.description,
    };

    const newUserData = await api.updateUserInfo(data);

    userInfo.setUserInfo({
      name: newUserData.name,
      job: newUserData.about,
      avatar: newUserData.avatar,
    });

    editProfilePopup.close();
  } catch (err: unknown) {
    console.error("Error updating profile:", err);
  } finally {
    editProfilePopup.renderLoading(false);
  }
});

// const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
//   cardSection.addItem(
//     createCard({
//       name: data["place-name"],
//       link: data.link,
//     }),
//   );

//   newCardPopup.close();
// });
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
  try {
    newCardPopup.renderLoading(true, "Creando...");

    const data = {
      name: inputValues["place-name"],
      link: inputValues.link,
    };

    const newCard = await api.addCard(data);

    cardSection.addItem(createCard(newCard));
    newCardPopup.close();
  } catch (err: unknown) {
    console.error("Error adding card:", err);
  } finally {
    newCardPopup.renderLoading(false);
  }
});

// avatar popup

const avatarPopup = new PopupWithForm("#avatar-popup", async (inputValues) => {
  try {
    avatarPopup.renderLoading(true);

    const newUserData = await api.updateAvatar({
      avatar: inputValues.avatar,
    });

    userInfo.setUserInfo({
      name: newUserData.name,
      job: newUserData.about,
      avatar: newUserData.avatar,
    });

    avatarPopup.close();
  } catch (err: unknown) {
    console.error("Error updating avatar:", err);
  } finally {
    avatarPopup.renderLoading(false);
  }
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


avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});



const initApp = async (): Promise<void> => {
  try {
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardSection.renderItems(initialCards);
  } catch (err: unknown) {
    console.error("Error initializing app:", err);
  }
};



initApp();

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
avatarPopup.setEventListeners();

editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

