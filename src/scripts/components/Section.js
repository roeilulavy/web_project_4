export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        
        this.__container = document.querySelector(containerSelector);
    }

    render(cards) {
        console.log('Section is now Rendering...');
        cards.forEach(element => {
           this._element = this._renderer(element);
        });
    }

    addItem(element) {
        this.__container.prepend(element);
    }
}