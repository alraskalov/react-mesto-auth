import React from "react";
import { withRouter } from "react-router-dom";
import FormWithAuth from "./FormWithAuth";

function Login(props) {
  return (
    <FormWithAuth name="login" title="Вход" buttonText="Войти" />
  );
}

export default withRouter(Login);
