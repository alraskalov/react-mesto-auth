import fail from "../images/fail.svg";
import success from "../images/success.svg";

export default function InfoTooltip(props) {
  return (
    <div className={`popup popup-auth ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <div className="popup__wrapper">
          {props.serverStatus ? <img src={success} alt="success" className="popup__status" /> : <img src={fail} alt="fail" className="popup__status" />}
          <figcaption className="popup__description">
          {props.serverStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          </figcaption>
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close-btn animation-button"
          ></button>
        </div>
      </div>
    </div>
  );
}
