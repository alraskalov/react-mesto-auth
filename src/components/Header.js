import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      {props.location === "/sign-up" && (
        <Link to="sign-in" className="header__auth">
          Войти
        </Link>
      )}
      {props.location === "/sign-in" && (
        <Link to="sign-up" className="header__auth">
          Зарегистрироваться
        </Link>
      )}
    </header>
  );
}

export default Header;
