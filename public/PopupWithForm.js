import { Popup } from "./PopupClass.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        // callback submit
        this._handleFormSubmit = handleFormSubmit;
        // formulario
        this._formElement = this._popupElement.querySelector(".popup__form");
        // inputs
        this._inputList = Array.from(this._formElement.querySelectorAll(".popup__input"));
    }
    // ---------------- PRIVATE METHOD ----------------
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });
        return inputValues;
    }
    // ---------------- PUBLIC METHODS ----------------
    setEventListeners() {
        // listeners del padre
        super.setEventListeners();
        // submit form
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        // reset form
        this._formElement.reset();
        // close popup padre
        super.close();
    }
}
