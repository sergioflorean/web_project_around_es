interface ApiOptions {
  baseUrl: string;
  headers: HeadersInit;
}

export interface ApiUserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface ApiCardData {
  isLiked: boolean;
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
}

export class Api {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  private async _handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }

    throw new Error(`Error: ${res.status}`);
  }

  public async getUserInfo(): Promise<ApiUserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    return await this._handleResponse<ApiUserData>(res);
  }

  public async getInitialCards(): Promise<ApiCardData[]> {
  const res = await fetch(`${this._baseUrl}/cards/`, {
    headers: this._headers,
  });

  return await this._handleResponse<ApiCardData[]>(res);
}
}