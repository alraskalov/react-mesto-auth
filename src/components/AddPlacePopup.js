import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardImageLink, setCardImageLink] = React.useState("");

  function handleChangeName(e) {
    setCardName(e.target.value);
  }

  function handleChangeLink(e) {
    setCardImageLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(
      {
        name: cardName,
        link: cardImageLink,
      },
      () => {
        return Promise.resolve().then(() => {
          setCardName("");
          setCardImageLink("");
        });
      }
    );
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input"
          id="image-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={`${cardName}`}
          onChange={handleChangeName}
          required
        />
        <span className="popup__input-error image-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input"
          id="image-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={`${cardImageLink}`}
          onChange={handleChangeLink}
          required
        />
        <span className="popup__input-error image-link-error"></span>
      </label>
    </PopupWithForm>
  );
}
