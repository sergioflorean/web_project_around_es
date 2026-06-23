export class Api {
    _baseUrl;
    _headers;
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    async _handleResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
        return await this._handleResponse(res);
    }
    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards/`, {
            headers: this._headers,
        });
        return await this._handleResponse(res);
    }
    async updateUserInfo(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        });
        return await this._handleResponse(res);
    }
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
    async changeLikeCardStatus(cardId, isLiked) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers,
        });
        return await this._handleResponse(res);
    }
}
