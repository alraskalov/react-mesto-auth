import React from "react";
import FormWithAuth from "./FormWithAuth";

function Login(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

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
    props.onLoginSubmit(
      {
        password: values.password,
        email: values.email,
      },
      () => {
        setValues({ email: "", password: "" });
      }
    );
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
