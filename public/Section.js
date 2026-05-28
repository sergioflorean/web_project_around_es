export class Section {
    constructor({ items, renderer }, containerSelector) {
        // datos iniciales
        this._items = items;
        // función para renderizar cada item
        this._renderer = renderer;
        // contenedor DOM
        this._container = document.querySelector(containerSelector);
    }
    // ---------------- PUBLIC METHODS ----------------
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}
