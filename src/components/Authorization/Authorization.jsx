import React, { useContext, useState } from "react";
import css from "./Authorization.module.css";
import { Input, Button } from "../common/Form/Form";
import { StoreContext } from "../../context/store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Authorization = () => {
  const signInUrl = "auth/sign_in";
  const { apiDomain, setIsLoggedIn, setShowAuthForm } =
    useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const stop = (e) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    setShowAuthForm(false);
  };
  const signIn = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const data = {
      email,
      password,
    };
    axios
      .post(apiDomain + signInUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setEmail("");
        setPassword("");
        localStorage.setItem("token", res.data.data.token);
        setIsLoggedIn(true);
        setShowAuthForm(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className={css.authModal} onClick={closeModal}>
      <div className={css.authWrapper} onClick={(e) => e.stopPropagation()}>
        <span className={css.closeBtn} onClick={closeModal}>
          X
        </span>
        <h1 className={css.title}>Авторизация</h1>
        <form onSubmit={signIn} onClick={stop}>
          <Input
            type="text"
            label="E-mail"
            placeholder="Введите Email"
            value={email}
            onChange={changeEmail}
          />
          <Input
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={changePassword}
          />
          {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}

          <Link className={css.regLink} to="sign-up" onClick={closeModal}>
            Зарегистрироваться
          </Link>
          <Button>Войти</Button>
        </form>
      </div>
    </div>
  );
};
