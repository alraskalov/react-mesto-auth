import React from "react";
import FormWithAuth from "./FormWithAuth";
import { useNavigate } from "react-router-dom";
import * as auth from "../auth.js";

function Login(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          setValues({ email: "", password: "" });
          props.onLogin();
          localStorage.setItem("jwt", res.token);
          navigate("/");
        } else {
          props.onInfoTooltip();
          props.onServerStatus(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FormWithAuth
      name="login"
      title="Вход"
      buttonText="Войти"
      email={values.email}
      password={values.password}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}

export default Login;
