export class Popup {
    _popupElement;
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    setEventListeners() {
        const closeButton = this._popupElement.querySelector(".popup__close");
        closeButton.addEventListener("click", () => {
            this.close();
        });
        this._popupElement.addEventListener("click", (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        });
    }
}
