import React, { useContext, useState } from "react";
import css from "./AddOfficer.module.css";
import axios from "axios";
import { Input, Button } from "../common/Form/Form";
import { StoreContext } from "../../context/store";
import { Link } from "react-router-dom";

export const AddOfficer = () => {
  const { apiDomain, userToken, authUrl } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [approved, setApproved] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeApproved = (e) => {
    setApproved(!approved);
  };

  const sendData = (e) => {
    e.preventDefault();

    const addOfficerUrl = "officers";

    setErrorMessage("");
    setMessage("");

    if (!email) {
      setErrorMessage("Введите Email.");
    }

    if (password) {
      if (password.length < 3 || password.length > 12) {
        setErrorMessage("Пароль должен быть от 3 до 12 символов.");
        return;
      }
    }

    if (!password) {
      setErrorMessage("Введите пароль.");
    }

    const data = {
      password,
      email,
      firstName,
      lastName,
      approved,
    };

    const dataToSend = Object.keys(data).reduce((acc, key) => {
      if (data[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    // axios
    //   .post(apiDomain + addOfficerUrl, dataToSend, {
    //     headers: {
    //       Authorization: "bearer " + userToken,
    //     },
    //   })
    authUrl
    .post(addOfficerUrl, dataToSend)
      .then((res) => {
        setErrorMessage("");
        setMessage("Сотрудник успешно зарегистрирован");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className={css.addOfficerWrapper}>
      <div>
        <Link to="/officers">Список сотрудников</Link>
      </div>
      <h1>Добавить сотрудника</h1>
      <form className={css.addOfficerForm} onSubmit={sendData}>
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
        <Input
          type="checkbox"
          label="Одобрить"
          inputGroupClassName={css.inputCheck}
          checked={approved}
          onChange={changeApproved}
        ></Input>
        {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
        <Button>Зарегистрировать</Button>
      </form>
      <p>{message}</p>
    </div>
  );
};
