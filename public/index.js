import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./Apis.js";
import { PopupWithConfirmation } from "./PopupWitthConfirmation.js";
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");
const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
const imagePopup = new PopupWithImage("#image-popup");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
const editFormValidator = new FormValidator(defaultFormConfig, editForm);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
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
const createCard = (data) => {
    const card = new Card(data, "#card-template", currentUserId, (name, link) => {
        imagePopup.open(name, link);
    }, async (cardId, isLiked) => {
        try {
            const updatedCard = await api.changeLikeCardStatus(cardId, isLiked);
            card.updateLikeStatus(updatedCard.isLiked);
        }
        catch (err) {
            console.error("Error changing like status:", err);
        }
    }, (cardId) => {
        deleteCardPopup.setSubmitAction(async () => {
            try {
                await api.deleteCard(cardId);
                card.removeCard();
                deleteCardPopup.close();
            }
            catch (err) {
                console.error("Error deleting card:", err);
            }
        });
        deleteCardPopup.open();
    });
    return card.getView();
};
const cardSection = new Section({
    renderer: (item) => {
        cardSection.addItem(createCard(item));
    },
}, ".cards__list");
// const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
//   userInfo.setUserInfo({
//     name: data.name,
//     job: data.description,
//   });
//   editProfilePopup.close();
// });
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    try {
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
    }
    catch (err) {
        console.error("Error updating profile:", err);
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
        const data = {
            name: inputValues["place-name"],
            link: inputValues.link,
        };
        const newCard = await api.addCard(data);
        cardSection.addItem(createCard(newCard));
        newCardPopup.close();
    }
    catch (err) {
        console.error("Error adding card:", err);
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
const initApp = async () => {
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
    }
    catch (err) {
        console.error("Error initializing app:", err);
    }
};
initApp();
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
