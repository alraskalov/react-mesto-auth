import React from "react";
import { Link } from "react-router-dom"

function FormWithAuth(props) {
  return (
    <div className="auth page__auth">
      <p className="auth__title">{props.title}</p>
      <form onSubmit={props.onSubmit} name={`${props.name}`} className="auth__form">
        <fieldset className="auth__fieldset">
          <div className="auth__container">
            <label className="auth__label">
              <input
                className="auth__input"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={props.onChange}
                value={props.email}
                required
              />
            </label>
            <label className="auth__label">
              <input
                className="auth__input"
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={props.onChange}
                value={props.password}
                required
              />
            </label>
            <button type="submit" className="auth__submit-btn">
              {props.buttonText}
            </button>
            {props.name === "register" && <Link to="sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>}
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default FormWithAuth;
