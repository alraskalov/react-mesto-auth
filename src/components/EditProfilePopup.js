import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [values, setValues] = React.useState({
    userName: "",
    userJob: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values.userName,
      about: values.userJob,
    });
  }

  React.useEffect(() => {
    setValues({
      userName: currentUser.name,
      userJob: currentUser.about
    })
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
          value={values.userName || ""}
          onChange={handleChange}
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
          value={values.userJob || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__input-error user-job-error"></span>
      </label>
    </PopupWithForm>
  );
}
