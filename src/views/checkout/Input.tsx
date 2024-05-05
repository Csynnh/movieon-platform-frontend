import HidePWIcon from "../../asset/icon/HidePWIcon";
import { useState } from "react";
import ShowIcon from "../../asset/icon/ShowIcon";
import "./Input.scss";

const Input = (props: {
  register?: any;
  errors?: any;
  name: string;
  label: string;
  type?: string;
  colSpan?: any;
}) => {
  const { register, errors, name, label, type, colSpan } = props;
  const handleChange = (e: any) => {
    const spanBlock = e.target.nextElementSibling;
    if (!e.target.value) {
      spanBlock.classList.remove("ontop");
    } else if (!spanBlock.classList.contains("ontop"))
      spanBlock.classList.add("ontop");
  };
  const [inputType, setInputType] = useState(type);
  const handleShowPassWord = (e: any) => {
    const input = e.currentTarget.parentElement.firstChild;
    if (input.type === "password") setInputType("text");
    else setInputType("password");
  };
  return (
    <label className={`input colSpan-${colSpan}`}>
      <input
        onInput={handleChange}
        type={`${inputType ? inputType : "text"}`}
        {...register(name)}
        min={type === "number" ? 0 : undefined}
      />
      <span>{label}</span>
      {type === "password" && (
        <div className="showIcon" onClick={handleShowPassWord}>
          {inputType === "password" ? <ShowIcon /> : <HidePWIcon />}
        </div>
      )}
      {errors[name] && (
        <div className="input_field">
          <span className="input_field-error">{errors[name].message}</span>
          <span className="input_field-error_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
    </label>
  );
};

export default Input;
