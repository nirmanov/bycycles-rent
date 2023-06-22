import React, { useContext, useState } from "react";
import css from "./SignUp.module.css";
import axios from "axios";
import { Input, Button } from "../common/Form/Form";
import { StoreContext } from "../../context/store";

export const SignUp = () => {
  const { apiDomain } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeClientId = (e) => {
    setClientId(e.target.value);
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();

    const signUpUrl = "auth/sign_up";

    setErrorMessage("");
    setMessage("");

    const data = {
      email,
      password,
      clientId,
      firstName,
      lastName,
    };

    axios
      .post(apiDomain + signUpUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setErrorMessage("");
        setMessage("Пользователь успешно зарегистрирован");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className={css.signUpWrapper}>
      <h1>Регистрация</h1>
      <form className={css.signUpForm} onSubmit={sendData}>
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="Введите Email"
          value={email}
          onChange={changeEmail}
        ></Input>
        <Input
          type="password"
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={password}
          onChange={changePassword}
        ></Input>
        <Input
          type="text"
          name="clientId"
          label="ClientId"
          placeholder="Введите clientId"
          value={clientId}
          onChange={changeClientId}
        ></Input>
        <Input
          type="text"
          name="firstName"
          label="Имя"
          placeholder="Введите Имя"
          value={firstName}
          onChange={changeFirstName}
        ></Input>
        <Input
          type="text"
          name="lastName"
          label="Фамилия"
          placeholder="Введите Фамилию"
          value={lastName}
          onChange={changeLastName}
        ></Input>
        {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
        <Button>Зарегистрировать</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
