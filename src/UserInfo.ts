interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
  avatarSelector: string;
}

interface UserData {
  name: string;
  job: string;
  avatar?: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;
  private _avatarElement: HTMLImageElement;

  constructor({ nameSelector, jobSelector, avatarSelector }: UserInfoSelectors) {
    this._nameElement = document.querySelector(nameSelector) as HTMLElement;
    this._jobElement = document.querySelector(jobSelector) as HTMLElement;
    this._avatarElement = document.querySelector(
      avatarSelector,
    ) as HTMLImageElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent || "",
      job: this._jobElement.textContent || "",
      avatar: this._avatarElement.src,
    };
  }

  public setUserInfo({ name, job, avatar }: UserData): void {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;

    if (avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = name;
    }
  }
}