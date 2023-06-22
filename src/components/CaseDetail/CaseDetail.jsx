import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store";
import css from "./CaseDetail.module.css";
import { Input, TextArea, Button, Select } from "../common/Form/Form";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment/moment";

export const CaseDetail = () => {
  const { bikeTypes, caseStates, authUrl } = useContext(StoreContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state;
  const [ownerFullName, setOwnerFullName] = useState(item.ownerFullName);
  const [licenseNumber, setLicenseNumber] = useState(item.licenseNumber);
  const [clientId] = useState(item.clientId);
  const [color, setColor] = useState(item.color);
  const [date, setDate] = useState(item.date);
  const [description, setDescription] = useState(item.description);
  const [status, setStatus] = useState(item.status);
  const [type, setType] = useState(item.type);
  const [resolution, setResolution] = useState(item.resolution);
  const [officersList, setOfficersList] = useState("");
  const [officer, setOfficer] = useState(item.officer);
  const [officerOptions, setOfficerOptions] = useState("");

  const getOfficers = async () => {
    const officersUrl = "officers";
    const res = await authUrl.get(officersUrl);
    setOfficersList(res.data.officers);
  };
  useEffect(() => {
    getOfficers();
  }, []);

  useEffect(() => {
    if (officersList.length > 0) {
      getOfficerOption();
    }
  }, [officersList]);

  const getOfficerOption = () => {
    const approvedOfficersList = officersList.filter((officer) => {
      return officer.approved === true;
    });
    const officerOptions = approvedOfficersList.map((officer) => ({
      value: officer._id,
      label: officer.firstName + " " + officer.lastName,
    }));

    setOfficerOptions(officerOptions);
  };

  const ownerFullNameChange = (e) => {
    setOwnerFullName(e.target.value);
  };

  const licenseNumberChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const colorChange = (e) => {
    setColor(e.target.value);
  };

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const statusChange = (e) => {
    setStatus(e.target.value);
  };

  const bikeTypeChange = (e) => {
    setType(e.target.value);
  };

  const officerChange = (e) => {
    setOfficer(e.target.value);
  };

  const resolutionChange = (e) => {
    setResolution(e.target.value);
  };

  const updateCase = (e) => {
    e.preventDefault();
    const updateUrl = "cases/";
    const data = {
      status,
      licenseNumber,
      ownerFullName,
      type,
      color,
      date,
      officer,
      description,
      resolution,
    };
    authUrl
      .put(updateUrl + item._id, data)
      .then((res) => {
        navigate("/cases");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={css.wrapper}>
      <Link className={css.backLink} to="/cases">
        Назад
      </Link>
      <h1 className={css.title}>Детальная страница сообщения о краже</h1>
      <div className={css.timestampWrapper}>
        <div>
          <div>Создан</div>
          <div>{moment(item.createdAt).format("DD.MM.YYYY, H:mm")}</div>
        </div>
        <div>
          <div>Изменен</div>
          <div>{moment(item.updatedAt).format("DD.MM.YYYY, H:mm")}</div>
        </div>
      </div>
      <form onSubmit={updateCase} className={css.form}>
        <Input
          type="text"
          label="Ф.И.О."
          placeholder="Ф.И.О."
          required={true}
          value={ownerFullName}
          onChange={ownerFullNameChange}
        />
        <Input
          type="text"
          label="Номер лицензии"
          placeholder="Номер лицензии"
          required={true}
          value={licenseNumber}
          onChange={licenseNumberChange}
        />
        <Input
          type="text"
          label="clientID"
          placeholder="clientID"
          disabled={true}
          value={clientId}
        />
        <Select
          name="bikeType"
          label="Тип велосипеда"
          options={bikeTypes}
          value={type}
          onChange={bikeTypeChange}
        ></Select>
        <Input
          type="text"
          label="Цвет велосипеда"
          placeholder="Укажите цвет"
          value={color}
          onChange={colorChange}
        />
        <Input
          type="date"
          label="Дата кражи"
          value={moment(date).format("YYYY-MM-DD")}
          onChange={dateChange}
        />
        <TextArea
          type="text"
          label="Дополнительная информация"
          value={description}
          onChange={descriptionChange}
        />
        {officerOptions.length > 0 ? (
          <Select
            name="officer"
            label="Ответственные сотрудник"
            options={officerOptions}
            value={officer}
            onChange={officerChange}
          ></Select>
        ) : (
          <p>Загружаем список сотрудников</p>
        )}
        <Select
          name="status"
          label="Статус заявки"
          options={caseStates}
          value={status}
          onChange={statusChange}
        ></Select>
        {item.status === "done" && (
          <TextArea
            type="text"
            label="Решение"
            value={resolution}
            onChange={resolutionChange}
          />
        )}
        <Button>Сохранить</Button>
      </form>
    </div>
  );
};
