import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function DeletePlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onDeletePlace(props.cardId);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isLoading={props.isLoading}
    />
  );
}
