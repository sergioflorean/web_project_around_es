export interface CardData {
  _id: string;
  name: string;
  link: string;
  isLiked: boolean;
}

type HandleCardClick = (name: string, link: string) => void;
type HandleLikeClick = (cardId: string, isLiked: boolean) => void;

export class Card {
  private _id: string;
  private _name: string;
  private _link: string;
  private _isLiked: boolean;
  private _cardSelector: string;
  private _handleCardClick: HandleCardClick;
  private _handleLikeClick: HandleLikeClick;

  private _element!: HTMLElement;
  private _imageElement!: HTMLImageElement;
  private _titleElement!: HTMLElement;
  private _likeButton!: HTMLElement;
  private _deleteButton!: HTMLElement;

  constructor(
    data: CardData,
    cardSelector: string,
    handleCardClick: HandleCardClick,
    handleLikeClick: HandleLikeClick,
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
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

  private _updateLikeButtonState(): void {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  private _handleDeleteButton(): void {
    this._element.remove();
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  public updateLikeStatus(isLiked: boolean): void {
    this._isLiked = isLiked;
    this._updateLikeButtonState();
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

    this._updateLikeButtonState();
    this._setEventListeners();

    return this._element;
  }
}