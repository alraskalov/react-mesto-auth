function ImagePopup(props) {
  return (
    <div
      className={`popup popup-image ${props.card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container-image">
        <figure className="popup__figure">
          {props.card.link && (
            <img
              src={props.card.link}
              alt={props.card.name}
              className="popup__image"
            />
          )}
          <figcaption className="popup__subtitle">{props.card.name}</figcaption>
        </figure>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-btn animation-button"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
