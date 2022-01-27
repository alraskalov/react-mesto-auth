import Popup from "./Popup";

function PopupWithForm({ isOpen, name, onClose, ...props }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{props.title}</h2>
      <form
        onSubmit={props.onSubmit}
        name={`${props.name}`}
        className="popup__form"
      >
        <fieldset className="popup__fieldset">
          {props.children}
          <button type="submit" className="popup__submit-btn">
            {`${props.isLoading ? "Сохранение..." : props.buttonText}`}
          </button>
        </fieldset>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
