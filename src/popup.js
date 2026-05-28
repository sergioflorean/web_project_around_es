console.log("popup.js loaded");

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscClose);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
};

export const handleEscClose = (event) => {
  if (event.key !== "Escape") return;

  const openedPopup = document.querySelector(".popup_is-opened");

  if (openedPopup) {
    openedPopup.classList.remove("popup_is-opened");

    //  avisar qué popup se cerró
    openedPopup.dispatchEvent(new CustomEvent("popupClosed"));
  }
};

export const handleOverlayClose = (event) => {
  if (event.target === event.currentTarget) {
    event.target.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", handleEscClose);
    event.target.dispatchEvent(new CustomEvent("popupClosed"));
  }
};
