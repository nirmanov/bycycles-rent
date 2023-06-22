import React from "react";
import css from "./Form.module.css";

export const Input = ({
  label,
  inputClassName,
  type,
  placeholder,
  disabled,
  required,
  onChange,
  value,
  checked,
  inputGroupClassName,
}) => {
  return (
    <div className={`${css.inputGroup} ${inputGroupClassName}`}>
      <label className={css.label}>{label}</label>
      <input
        className={`${css.input} ${inputClassName}`}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
        value={value}
        checked={checked}
      />
    </div>
  );
};

export const TextArea = ({
  label,
  inputClassName,
  type,
  placeholder,
  disabled,
  required,
  value,
  onChange,
}) => {
  return (
    <div className={css.inputGroup}>
      <label className={css.label}>{label}</label>
      <textarea
        className={`${css.input} ${inputClassName}`}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const Select = ({
  selectName,
  label,
  options,
  className,
  value,
  onChange,
  required
}) => {
  return (
    <div className={css.inputGroup}>
      <label className={css.label}>{label}</label>
      <select
        className={`${css.select} ${className}`}
        name={selectName}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Button = ({ onClick, className, children, id_to_delete }) => {
  return (
    <button
      className={`${css.button} ${className}`}
      onClick={onClick}
      id_to_delete={id_to_delete}
    >
      {children}
    </button>
  );
};
