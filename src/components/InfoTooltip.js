import fail from "../images/fail.svg";
import success from "../images/success.svg";
import Popup from "./Popup";

export default function InfoTooltip({ isOpen, onClose, ...props }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__wrapper">
        {props.serverStatus ? (
          <img src={success} alt="success" className="popup__status" />
        ) : (
          <img src={fail} alt="fail" className="popup__status" />
        )}
        <figcaption className="popup__description">
          {props.serverStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </figcaption>
      </div>
    </Popup>
  );
}
