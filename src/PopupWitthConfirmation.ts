import { Popup } from "./Popup.js";

type SubmitAction = () => void | Promise<void>;

export class PopupWithConfirmation extends Popup {
  private _formElement: HTMLFormElement;
  private _handleSubmit: SubmitAction = () => {};

  constructor(popupSelector: string) {
    super(popupSelector);

    this._formElement = this._popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;
  }

  public setSubmitAction(action: SubmitAction): void {
    this._handleSubmit = action;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}