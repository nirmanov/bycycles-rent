import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/store";
import css from "./CaseForm.module.css";
import { Input, TextArea, Select, Button } from "../common/Form/Form";
import axios from "axios";

export const CaseForm = () => {
  const { apiDomain, bikeTypes, isLoggedIn, userToken } =
    useContext(StoreContext);
  const [ownerFullName, setOwnerFullName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [officersList, setOfficersList] = useState("");
  const [officer, setOfficer] = useState("");
  const [officerOptions, setOfficerOptions] = useState("");

  const getOfficers = async () => {
    const officersUrl = "officers";
    const res = await axios.get(apiDomain + officersUrl, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    setOfficersList(res.data.officers);
  };
  useEffect(() => {
    if (isLoggedIn) {
      getOfficers();
    }
  }, [isLoggedIn]);

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

  const bikeTypeChange = (e) => {
    setType(e.target.value);
  };

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const officerChange = (e) => {
    setOfficer(e.target.value);
  };

  const sendCase = (e) => {
    e.preventDefault();
    const updateUrl = `${isLoggedIn ? "cases" : "public/report"}`;
    console.log(updateUrl);

    const getRequestData = () => {
      if (isLoggedIn) {
        return {
          licenseNumber,
          date,
          color,
          type,
          ownerFullName,
          officer: officer,
          description,
        };
      } else {
        return {
          licenseNumber,
          date,
          color,
          type,
          ownerFullName,
          description,
          clientId: "b822e425-8905-489b-928a-02b290b2cda2",
        };
      }
    };

    const requestHeaders = isLoggedIn
      ? {
          headers: { Authorization: "Bearer " + userToken },
        }
      : null;
    axios
      .post(apiDomain + updateUrl, getRequestData(), requestHeaders)
      .then((res) => {
        console.log(res);
        setLicenseNumber("");
        setOwnerFullName("");
        setColor("");
        setType("");
        setDate("");
        setDescription("");
        setOfficer("");
        alert("Сообщение отправлено");
      })
      .catch((error) => {
        console.log(error);
        console.log(requestHeaders);
      });
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Сообщить о краже</h1>
      <form onSubmit={sendCase} className={css.form}>
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
        <Select
          name="bikeType"
          label="Тип велосипеда"
          options={bikeTypes}
          value={type}
          required={true}
          onChange={bikeTypeChange}
        ></Select>
        <Input
          type="text"
          label="Цвет велосипеда"
          placeholder="Укажите цвет"
          value={color}
          onChange={changeColor}
        />
        <Input
          type="date"
          label="Дата кражи"
          value={date}
          onChange={changeDate}
        />
        <TextArea
          type="text"
          label="Дополнительная информация"
          value={description}
          onChange={changeDescription}
        />
        {isLoggedIn && officerOptions.length > 0 ? (
          <Select
            name="officer"
            label="Ответственный сотрудник"
            options={officerOptions}
            value={officer}
            onChange={officerChange}
          ></Select>
        ) : (
          ""
        )}
        <Button>Отправить</Button>
      </form>
    </div>
  );
};
