export default class Section {
    constructor({ items: data, renderer }, containerSelector) {
      this._renderedItems = data;
      this._renderer = renderer;
      
      this._container = document.querySelector(containerSelector);
    }
  
    addItem(element) {
      this._container.append(element);
    }
  
    // clear() {
    //   this._container.innerHTML = "";
    // }
  
    renderer() {
      // this.clear();
  
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
  }