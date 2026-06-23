export class Card {
    _id;
    _name;
    _link;
    _isLiked;
    _cardSelector;
    _handleCardClick;
    _handleLikeClick;
    _element;
    _imageElement;
    _titleElement;
    _likeButton;
    _deleteButton;
    constructor(data, cardSelector, handleCardClick, handleLikeClick) {
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._isLiked = data.isLiked;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
    }
    _getTemplate() {
        const template = document.querySelector(this._cardSelector);
        const cardElement = template.content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    _updateLikeButtonState() {
        if (this._isLiked) {
            this._likeButton.classList.add("card__like-button_is-active");
        }
        else {
            this._likeButton.classList.remove("card__like-button_is-active");
        }
    }
    _handleDeleteButton() {
        this._element.remove();
    }
    _setEventListeners() {
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
    updateLikeStatus(isLiked) {
        this._isLiked = isLiked;
        this._updateLikeButtonState();
    }
    getView() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector(".card__image");
        this._titleElement = this._element.querySelector(".card__title");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._titleElement.textContent = this._name;
        this._updateLikeButtonState();
        this._setEventListeners();
        return this._element;
    }
}
