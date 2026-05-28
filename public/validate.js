console.log("validate.js loaded");
export const hasInvalidInput = (inputList) => {
    return inputList.some((input) => !input.validity.valid);
};
export const toggleButtonState = (inputList, buttonElement) => {
    buttonElement.disabled = hasInvalidInput(inputList);
};
export const showInputError = (form, input, message) => {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.add("popup__input_type_error");
    errorElement.textContent = message;
    errorElement.classList.add("popup__error_visible");
};
export const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__error_visible");
};
export const checkInputValidity = (form, input) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
    }
    else {
        hideInputError(form, input);
    }
};
// SOLO VALIDACIÓN DE FORMULARIOS
export const setEventListeners = (form) => {
    const inputs = Array.from(form.querySelectorAll(".popup__input"));
    const button = form.querySelector(".popup__button");
    toggleButtonState(inputs, button);
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(form, input);
            toggleButtonState(inputs, button);
        });
    });
};
// REESTABLECER FORMULARIOS
export const resetValidation = (form) => {
    const inputs = Array.from(form.querySelectorAll(".popup__input"));
    const button = form.querySelector(".popup__button");
    inputs.forEach((input) => {
        const errorElement = form.querySelector(`.${input.name}-error`);
        input.classList.remove("popup__input_type_error");
        errorElement.textContent = "";
        errorElement.classList.remove("popup__error_visible");
    });
    // desactivar botón al resetear
    button.disabled = true;
};
