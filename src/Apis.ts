// Apis.ts
interface ApiOptions {
  baseUrl: string;
  headers: HeadersInit;
}
// Interfaces for API responses and request data

export interface ApiUserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}
// Interfaces for API responses and request data

export interface ProfileFormData {
  name: string;
  about: string;
}
// Interfaces for API responses and request data
export interface ApiCardData {
  isLiked: boolean;
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
}
// Interfaces for API responses and request data
export interface CardFormData {
  name: string;
  link: string;
}

// Clase Api para interactuar con la API
export class Api {
    // Propiedades privadas para la URL base y los encabezados
  private _baseUrl: string;
  private _headers: HeadersInit;
// Constructor que inicializa la URL base y los encabezados
  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
// Manejar la respuesta de la API
  private async _handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
  }
// Obtener la información del usuario
  public async getUserInfo(): Promise<ApiUserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    return await this._handleResponse<ApiUserData>(res);
  }
// Obtener las tarjetas iniciales
  public async getInitialCards(): Promise<ApiCardData[]> {
  const res = await fetch(`${this._baseUrl}/cards/`, {
    headers: this._headers,
  });

  return await this._handleResponse<ApiCardData[]>(res);
}
// Actualizar la información del usuario
    public async updateUserInfo(data: ProfileFormData): Promise<ApiUserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });

    return await this._handleResponse<ApiUserData>(res);
  }
// Agregar una nueva tarjeta
  public async addCard(data: CardFormData): Promise<ApiCardData> {
  const res = await fetch(`${this._baseUrl}/cards/`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  });

  return await this._handleResponse<ApiCardData>(res);
}
// Cambiar el estado de "me gusta" de una tarjeta
    public async changeLikeCardStatus(
        cardId: string,
        isLiked: boolean,
    ): Promise<ApiCardData> {
         const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: this._headers,
});

  return await this._handleResponse<ApiCardData>(res);
}

 ///ELIMINAR TARJETA
    public async deleteCard(cardId: string): Promise<void> {
  const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  });

  await this._handleResponse<void>(res);
}
}