import Popup from "./Popup.js";

const popupTypeImage = '.popup_type_image-preview';
export default class PopupWithImages extends Popup {
    constructor({ src, caption }, popupSelector = popupTypeImage) {
        super(popupSelector);
        this._src = src;
        this._caption = caption;
        
    }
}