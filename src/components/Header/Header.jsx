import React, { Fragment, useContext } from "react";
import { StoreContext } from "../../context/store";
import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { Authorization } from "../Authorization/Authorization";

export const Header = () => {
  const { isLoggedIn, setIsLoggedIn, showAuthForm, setShowAuthForm } =
    useContext(StoreContext);

  const showModal = () => {
    setShowAuthForm(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <Fragment>
      <div className={css.header}>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to="/">
              Главная{" "}
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to="caseform">
              Сообщить о краже{" "}
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link className={css.link} onClick={logOut} to="/">
                Выйти
              </Link>
            </li>
          ) : (
            <li>
              <Link className={css.link} onClick={showModal}>
                Войти
              </Link>
            </li>
          )}
        </ul>
      </div>
      {showAuthForm && <Authorization />}
    </Fragment>
  );
};
