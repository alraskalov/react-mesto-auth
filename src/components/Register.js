import React from "react";
import FormWithAuth from "./FormWithAuth";
import { useNavigate } from "react-router-dom";
import * as auth from "../auth.js";

function Register(props) {
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
    auth
      .register(values.password, values.email)
      .then((res) => {
        if (res.data) {
          props.onInfoTooltip();
          props.onServerStatus(true);
          setValues({ email: "", password: "" });
          setTimeout(navigate, 3000, "/sign-in");
          setTimeout(props.onCloseTooltip, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FormWithAuth
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      email={values.email}
      password={values.password}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}

export default Register;
