interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;

  constructor({ nameSelector, jobSelector }: UserInfoSelectors) {
    this._nameElement = document.querySelector(nameSelector) as HTMLElement;
    this._jobElement = document.querySelector(jobSelector) as HTMLElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent || "",
      job: this._jobElement.textContent || "",
    };
  }

  public setUserInfo({ name, job }: UserData): void {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}