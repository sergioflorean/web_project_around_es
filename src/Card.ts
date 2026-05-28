export interface CardData {
  name: string;
  link: string;
}

type HandleCardClick = (name: string, link: string) => void;

export class Card {
  private _name: string;
  private _link: string;
  private _cardSelector: string;
  private _handleCardClick: HandleCardClick;

  private _element!: HTMLElement;
  private _imageElement!: HTMLImageElement;
  private _titleElement!: HTMLElement;
  private _likeButton!: HTMLElement;
  private _deleteButton!: HTMLElement;

  constructor(
    data: CardData,
    cardSelector: string,
    handleCardClick: HandleCardClick,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  private _getTemplate(): HTMLElement {
    const template = document.querySelector(
      this._cardSelector,
    ) as HTMLTemplateElement;

    const cardElement = template.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private _handleLikeButton(): void {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  private _handleDeleteButton(): void {
    this._element.remove();
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  public getView(): HTMLElement {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(
      ".card__image",
    ) as HTMLImageElement;

    this._titleElement = this._element.querySelector(
      ".card__title",
    ) as HTMLElement;

    this._likeButton = this._element.querySelector(
      ".card__like-button",
    ) as HTMLElement;

    this._deleteButton = this._element.querySelector(
      ".card__delete-button",
    ) as HTMLElement;

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}