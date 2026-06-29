import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    _formElement;
    _handleSubmit = () => { };
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector(".popup__form");
    }
    setSubmitAction(action) {
        this._handleSubmit = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleSubmit();
        });
    }
}
