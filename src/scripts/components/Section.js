export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;

        this.__container = document.querySelector(containerSelector);
    }

    render() {
        console.log('Section is now Rendering...');
        this._items.forEach(element => {
           this._element = this._renderer(element);
        });
    }

    addItem(element) {
        this.__container.prepend(element);
    }
}