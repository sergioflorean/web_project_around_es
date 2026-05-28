import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    _handleFormSubmit;
    _formElement;
    _inputList;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._inputList = Array.from(this._formElement.querySelectorAll(".popup__input"));
    }
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        this._formElement.reset();
        super.close();
    }
}
