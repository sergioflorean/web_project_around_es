interface SectionConfig<T> {
  renderer: (item: T) => void;
}

export class Section<T> {
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor({ renderer }: SectionConfig<T>, containerSelector: string) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector) as HTMLElement;
  }

  public renderItems(items: T[]): void {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}