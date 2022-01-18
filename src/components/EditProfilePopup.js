import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input"
          id="user-name"
          type="text"
          name="userName"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          value={`${name}`}
          onChange={handleChangeName}
          required
        />
        <span className="popup__input-error user-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input"
          id="user-job"
          type="text"
          name="userJob"
          placeholder="Ваша профессия"
          minLength="2"
          maxLength="200"
          value={`${description}`}
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__input-error user-job-error"></span>
      </label>
    </PopupWithForm>
  );
}
