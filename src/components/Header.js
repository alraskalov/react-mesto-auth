import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {props.location === "/sign-up" && (
        <Link to="/sign-in" className="header__auth">
          Войти
        </Link>
      )}
      {props.location === "/sign-in" && (
        <Link to="/sign-up" className="header__auth">
          Зарегистрироваться
        </Link>
      )}
      {props.loggedIn && (
        <p className="header__login">{props.email}
          <Link to="/sign-in" className="header__logout" onClick={props.onLogout}>
            Выйти
          </Link>
        </p>

      )}
    </header>
  );
}

export default Header;
