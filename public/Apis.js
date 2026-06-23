// Clase Api para interactuar con la API
export class Api {
    // Propiedades privadas para la URL base y los encabezados
    _baseUrl;
    _headers;
    // Constructor que inicializa la URL base y los encabezados
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    // Manejar la respuesta de la API
    async _handleResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    // Obtener la información del usuario
    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
        return await this._handleResponse(res);
    }
    // Obtener las tarjetas iniciales
    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards/`, {
            headers: this._headers,
        });
        return await this._handleResponse(res);
    }
    // Actualizar la información del usuario
    async updateUserInfo(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        });
        return await this._handleResponse(res);
    }
    // Agregar una nueva tarjeta
    async addCard(data) {
        const res = await fetch(`${this._baseUrl}/cards/`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        });
        return await this._handleResponse(res);
    }
    // Cambiar el estado de "me gusta" de una tarjeta
    async changeLikeCardStatus(cardId, isLiked) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers,
        });
        return await this._handleResponse(res);
    }
    ///ELIMINAR TARJETA
    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
        await this._handleResponse(res);
    }
}
