import React, { useContext, useEffect, useState } from "react";
import css from "./OfficersList.module.css";
import { StoreContext } from "../../context/store";
import { Link } from "react-router-dom";
import { Button } from "../common/Form/Form";

export const OfficersList = () => {
  const { authUrl } = useContext(StoreContext);
  const officersUrl = "officers/";
  const [officersList, setOfficersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOfficers = async () => {

    setIsLoading(true);
    
    const res = await authUrl.get(officersUrl);
    setOfficersList(res.data.officers);
    setIsLoading(false);
  };

  const deleteOfficer = (e) => {
    e.preventDefault();
    const officerId = e.target.attributes.getNamedItem("id_to_delete").value;
    authUrl
      .delete(officersUrl + officerId)
      .then(loadOfficers())
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadOfficers();
  }, [isLoading, deleteOfficer]);

  const renderOfficers = () => {
    return (
      <div className={css.officersList}>
        <div>
          <Link className={css.link} to="/add-officer">
            Добавить сотрудника
          </Link>
        </div>
        <table className={css.gridTable}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
              <th>Одобрен</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {officersList.map((officer) => (
              <tr key={officer._id}>
                <td aria-label="Имя">{officer.firstName}</td>
                <td aria-label="Фамилия">{officer.lastName}</td>
                <td aria-label="Email">{officer.email}</td>
                <td aria-label="Одобрен">{officer.approved ? "Да" : "Нет"}</td>
                <td>
                  <Button
                    className={css.deleteBtn}
                    onClick={deleteOfficer}
                    data
                    id_to_delete={officer._id}
                  >
                    Удалить
                  </Button>
                </td>
                <td>
                  <Link
                    className={css.detailLink}
                    to={`./${officer._id}`}
                    state={officer}
                  >
                    Подробнее
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderEmpty = () => {
    <div>
      <p>Сотрудников нет</p>
    </div>;
  };
  return (
    <div className={css.officersListWrapper}>
      <h1 className={css.title}>Ответственные сотрудники</h1>
      {officersList.length ? renderOfficers() : renderEmpty()}
    </div>
  );
};
