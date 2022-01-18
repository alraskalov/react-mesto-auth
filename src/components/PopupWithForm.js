function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form onSubmit={props.onSubmit} name={`${props.name}`} className="popup__form form-avatar">
          <fieldset className="popup__fieldset">
            {props.children}
            <button type="submit" className="popup__submit-btn">
              {`${props.isLoading ? "Сохранение..." : props.buttonText}`}
            </button>
          </fieldset>
        </form>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-btn animation-button"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
