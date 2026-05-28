export class Card {
  constructor(data, cardSelector, handleCardClick) {
    // datos
    this._name = data.name;
    this._link = data.link;

    // template
    this._cardSelector = cardSelector;

    // callback para abrir imagen
    this._handleCardClick = handleCardClick;
  }

  // ---------------- PRIVATE METHODS ----------------

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _setEventListeners() {
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

  // ---------------- PUBLIC METHOD ----------------

  getView() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");

    this._titleElement = this._element.querySelector(".card__title");

    this._likeButton = this._element.querySelector(".card__like-button");

    this._deleteButton = this._element.querySelector(".card__delete-button");

    // datos
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._titleElement.textContent = this._name;

    // listeners
    this._setEventListeners();

    return this._element;
  }
}
