import React, { useContext, useEffect, useState } from "react";
import css from "./CaseList.module.css";
import { StoreContext } from "../../context/store";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button } from "../common/Form/Form";

export const CaseList = () => {
  const { bikeTypes, caseStates, isLoggedIn, authUrl } =
    useContext(StoreContext);
  const casesUrl = "cases/";
  const [casesList, setCasesList] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getCases = () => {
    setErrorMessage("")
    if (!isLoggedIn) {
      setErrorMessage("Доступ запрещен");
      return;
    }
    authUrl
      .get(casesUrl)
      .then((res) => {
        setCasesList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCases();
  }, [setCasesList]);

  const deleteCase = (e) => {
    e.preventDefault();
    const caseId = e.target.attributes.getNamedItem("id_to_delete").value;
    authUrl
      .delete(casesUrl + caseId)
      .then(getCases())
      .catch((error) => {
        console.log(error);
      });
  };

  const emptyCasesList = () => {
    return <div>Сообщения о кражах отсутствуют</div>;
  };

  const renderCasesList = () => {
    return (
      <div>
        <table className={css.gridTable}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>№ лицензии</th>
              <th>Дата</th>
              <th>Описание</th>
              <th>Тип</th>
              <th>Статус</th>
              <th>Заключение</th>
            </tr>
          </thead>
          <tbody>
            {casesList.map((item) => (
              <tr key={item._id}>
                <td aria-label="Имя">{item.ownerFullName}</td>
                <td aria-label="№ лицензии">{item.licenseNumber}</td>
                <td aria-label="Дата">
                  {item.date
                    ? moment(item.date).format("DD.MM.YYYY, H:mm")
                    : "-"}
                </td>
                <td aria-label="Описание">
                  {item.description ? item.description : "-"}
                </td>
                <td aria-label="Тип">
                  {bikeTypes.map((bikeType) => {
                    if (bikeType.value === item.type) {
                      return bikeType.label;
                    }
                  })}
                </td>
                <td aria-label="Статус">
                  {caseStates.map((key) => {
                    if (key.value === item.status) {
                      return key.label;
                    }
                  })}
                </td>
                <td aria-label="Заключение">
                  {item.resolution ? item.resolution : "-"}
                </td>
                <td>
                  <Button onClick={deleteCase} id_to_delete={item._id}>
                    Удалить
                  </Button>
                </td>
                <td>
                  <Link to={"/cases/" + item._id} state={item}>
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
  return (
    <div className={css.casesWrapper}>
      <h1>Список краж</h1>
      {errorMessage && <h2>{errorMessage}</h2>}
      {!errorMessage && (casesList ? renderCasesList() : emptyCasesList())}
      
    </div>
  );
};
