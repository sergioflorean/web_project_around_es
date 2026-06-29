import { Popup } from "./Popup.js";

type FormSubmitHandler = (data: Record<string, string>) => void | Promise<void>;

export class PopupWithForm extends Popup {
  private _handleFormSubmit: FormSubmitHandler;
  private _formElement: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _submitButton: HTMLButtonElement;
  private _defaultButtonText: string;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._formElement = this._popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll<HTMLInputElement>(".popup__input"),
    );

    this._submitButton = this._formElement.querySelector(
      ".popup__button",
    ) as HTMLButtonElement;

    this._defaultButtonText = this._submitButton.textContent || "";
  }

  private _getInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};

    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  public renderLoading(isLoading: boolean, loadingText = "Guardando..."): void {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  public close(): void {
    this._formElement.reset();

    super.close();
  }
}