import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submission) {
        super(popupSelector);

        this._submission = submission;

        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');

        this._deletePopup = document.querySelector('.popup_type_delete-card');
    }

    _getInputValues() {
        const inputInfo = {};
        
        this._inputList.forEach((item) => inputInfo[item.name] = item.value);
        return inputInfo;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            if(this._popup !== this._deletePopup){
                this._submission(this._getInputValues());   
            } else {
                this._submission();
            }
        });
    }

    close() {
        super.close();
        if(this._popup !== this._deletePopup){
           this._popupForm.reset();  
        } 
    }
}