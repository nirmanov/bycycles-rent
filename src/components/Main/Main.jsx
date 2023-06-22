import React, { useContext } from "react";
import { Link } from "react-router-dom";
import css from "./Main.module.css";
import { StoreContext } from "../../context/store";

export const Main = () => {
  const { isLoggedIn } = useContext(StoreContext);
  return (
    <div className={css.mainWrapper}>
      <div className={css.main}>
        <h1 className={css.title}>Прокат велосипедов</h1>
        {isLoggedIn && (
          <div className={css.linkWrapper}>
            <Link className={css.link} to="/officers">
              Ответственные сотрудники
            </Link>

            <Link className={css.link} to="/cases">
              Список краж
            </Link>
          </div>
        )}

        <p className={css.descr}>
          Наш сервис прокатов велосипедов предлагает удобное и экологически
          чистое средство передвижения для любителей активного образа жизни и
          исследования окружающей среды. Мы предоставляем широкий выбор
          высококачественных велосипедов различных типов, подходящих для разных
          возрастов и уровней подготовки.
        </p>
        <p className={css.descr}>
          У нас вы можете арендовать велосипеды на часы, дни или даже на недели,
          чтобы наслаждаться здоровыми прогулками, тренировками на свежем
          воздухе или приключениями в городе или за его пределами. Наша цель -
          сделать прокат велосипедов максимально удобным и доступным, чтобы
          каждый мог воспользоваться преимуществами этой удивительной формы
          передвижения.
        </p>
      </div>
    </div>
  );
};
