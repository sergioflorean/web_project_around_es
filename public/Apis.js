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
}
