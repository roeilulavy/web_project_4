export default class Section {
    constructor({ items, renderer }, cardSelector) {
        this._items = items;
        this._renderer = renderer;

        this._cardSelector = document.querySelector(cardSelector);
    }

    render() {
        this._items.forEach(item => {
           this._element = this._renderer(item);
        });
    }

    addItem(element) {
        this._cardSelector.prepend(element);
    }
}