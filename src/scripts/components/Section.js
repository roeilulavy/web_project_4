export default class Section {
    constructor({ items, renderer }, cardSelector) {
        this._items = items;
        this._renderer = renderer;

        this._cardSelector = document.querySelector(cardSelector);
    }

    render() {
        this._items.forEach(element => {
           this._element = this._renderer(element);
        });
    }

    addItem(element) {
        this._cardSelector.prepend(element);
    }
}