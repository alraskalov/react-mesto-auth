import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn
      ? "grid-photo__delete-button_visible"
      : "grid-photo__delete-button_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${isLiked ? "grid-photo__like_active" : ""}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDeleteClick(props.card._id);
  }

  return (
    <div className="grid-photo__element">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="grid-photo__image"
      />
      <button
        type="button"
        onClick={handleDeleteClick}
        className={`grid-photo__delete-button ${cardDeleteButtonClassName} animation-button`}
      ></button>
      <div className="grid-photo__description">
        <h2 className="grid-photo__title">{props.card.name}</h2>
        <div className="like-container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`grid-photo__like animation-like ${cardLikeButtonClassName}`}
          ></button>
          <p className="like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
