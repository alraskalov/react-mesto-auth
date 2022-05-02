import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router";
import auth from "../utils/Auth";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [serverStatus, setServerStatus] = React.useState("");

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeletePlacePopup, setIsDeletePlacePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [cardIdForRemove, setСardIdForRemove] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const jwt = localStorage.getItem("jwt");

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCard(card, isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId, jwt)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfo(name, about, jwt)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }, callbackPromise) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar, jwt)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
        callbackPromise();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }, callbackPromise) {
    setIsLoading(true);
    api
      .addCard(name, link, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        callbackPromise();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCard(cardId) {
    setСardIdForRemove(cardId);
    setIsDeletePlacePopup(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleServerStatus(status) {
    setServerStatus(status);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  const handleTokenCheck = React.useCallback(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      Promise.all(
        [auth.checkToken(jwt),
        api.getUserInfo(jwt),
        api.getInitialCards(jwt)]
      )
        .then(([res, userData, cards]) => {
          setCurrentUser(userData);

          setCards(cards);
          setUserEmail(res.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => navigate("/"));
    }
  }, [navigate]);

  React.useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  function handleRegisterSubmit({ password, email }, callbackSetValues) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          callbackSetValues();
          handleServerStatus(true);
          setTimeout(navigate, 3000, "/sign-in");
          setTimeout(closeAllPopups, 3000);
        }
      })
      .catch((err) => {
        handleServerStatus(false);
        console.log(err);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  function handleLoginSubmit({ password, email }, callbackSetValues) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          callbackSetValues();
          handleLogin();
          localStorage.setItem("jwt", res.token);
          navigate("/");
        } else {
          handleInfoTooltip();
        }
      })
      .catch((err) => {
        handleServerStatus(false);
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopup(false);
    setSelectedCard({ name: "", link: "" });
    setСardIdForRemove("");
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          location={location.pathname}
          email={userEmail}
          loggedIn={loggedIn}
          onLogout={handleLogout}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <DeletePlacePopup
          isOpen={isDeletePlacePopup}
          onClose={closeAllPopups}
          onDeletePlace={handleCardDelete}
          cardId={cardIdForRemove}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        {serverStatus && (
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            serverStatus={serverStatus}
            onClose={closeAllPopups}
          />
        )}
        <Routes>
          <Route
            path="/sign-in"
            element={<Login onLoginSubmit={handleLoginSubmit} />}
          />
          <Route
            path="/sign-up"
            element={<Register onRegisterSubmit={handleRegisterSubmit} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCard={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDeleteClick={handleDeleteCard}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Navigate to="/" />
              </ProtectedRoute>
            }
          />
        </Routes>
        {loggedIn && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}
