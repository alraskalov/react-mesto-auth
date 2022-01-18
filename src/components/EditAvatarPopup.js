import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const getInputAvatarRef = React.useRef();
  const inputAvatarElement = getInputAvatarRef.current;

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(
      {
        avatar: inputAvatarElement.value,
      },
      () => {
        return Promise.resolve().then(() => {
          e.target.reset();
        });
      }
    );
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input-avatar"
          id="avatar-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          ref={getInputAvatarRef}
          required
        />
        <span className="popup__input-error avatar-link-error"></span>
      </label>
    </PopupWithForm>
  );
}
