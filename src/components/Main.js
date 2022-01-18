import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__info">
          <div onClick={props.onEditAvatar} className="avatar-container">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <button className="profile__avatar-edit"></button>
          </div>

          <div className="profile__user">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button animation-button"
              type="button"
            ></button>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button animation-button"
        ></button>
      </section>
      <section className="grid-photo page__grid-photo">
        {props.cards.map((card) => (
          <Card
            onCardClick={props.onCard}
            onCardLike={props.onCardLike}
            onCardDeleteClick={props.onCardDeleteClick}
            key={card._id}
            card={card}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
