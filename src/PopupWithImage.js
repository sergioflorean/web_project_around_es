import { Popup } from "./PopupClass.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popupElement.querySelector(".popup__image");

    this._captionElement = this._popupElement.querySelector(".popup__caption");
  }

  // ---------------- PUBLIC METHOD ----------------

  open(name, link) {
    this._imageElement.src = link;

    this._imageElement.alt = name;

    this._captionElement.textContent = name;

    super.open();
  }
}
