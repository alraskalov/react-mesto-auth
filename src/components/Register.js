import React from "react";
import { withRouter } from "react-router-dom"
import FormWithAuth from "./FormWithAuth";

function Register(props) {
  return (
    <FormWithAuth name="register" title="Регистрация" buttonText="Зарегистрироваться" />
  );
}

export default withRouter(Register);
