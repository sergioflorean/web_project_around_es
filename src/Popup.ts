export class Popup {
  protected _popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this._popupElement = document.querySelector(popupSelector) as HTMLElement;

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  private _handleEscClose(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.close();
    }
  }

  public open(): void {
    this._popupElement.classList.add("popup_is-opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  public close(): void {
    this._popupElement.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton = this._popupElement.querySelector(
      ".popup__close",
    ) as HTMLButtonElement;

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}