import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  return (
    <div className="login page__login">
      <p className="login__title">Вход</p>
      <form name="login" className="login__form">
        <fieldset className="login__fieldset">
          <div className="login__container">
            <label className="login__label">
              <input
                className="login__input"
                id="username"
                type="text"
                name="username"
                placeholder="Email"
                required
              />
            </label>
            <label className="login__label">
              <input
                className="login__input"
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                required
              />
            </label>
            <button type="submit" className="login__submit-btn">
              Войти
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default withRouter(Login);
