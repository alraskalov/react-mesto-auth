import React from "react";
import FormWithAuth from "./FormWithAuth";

function Register(props) {
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
    props.onRegisterSubmit(
      {
        password: values.password,
        email: values.email,
      },
      () =>
        setValues({
          email: "",
          password: "",
        })
    );
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
