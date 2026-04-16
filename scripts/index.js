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

initialCards.forEach((item) => {
  console.log(item.name);
});
// boton para abrir el modal de editar perfil
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

// referencia al formulario para manejar el submit
const formElement = document.querySelector("#edit-profile-form");

// elementos del formulario de editar perfil

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);

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
  openModal(editPopup);
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

//Utiliza el método addEventListener() para detectar cuándo envía el usuario el formulario y llama a la función handleProfileFormSubmit().
formElement.addEventListener("submit", handleProfileFormSubmit);
