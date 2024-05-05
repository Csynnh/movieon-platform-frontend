import { FC } from "react";
import { Action } from "./AddBtn";
import "./CloseIcon.scss";

const CloseIcon: FC<Action> = ({ handle }) => {
  return (
    <span className="close-icon">
      <svg
        onClick={handle}
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.3468 10.7083L20.6042 20.2743M20.6042 20.2743L30.5 30.5M20.6042 20.2743L29.8616 10.7083M20.6042 20.2743L10.7083 30.5M40 21C40 31.4934 31.4934 40 21 40C10.5066 40 2 31.4934 2 21C2 10.5066 10.5066 2 21 2C31.4934 2 40 10.5066 40 21Z"
          stroke="black"
          strokeWidth="3"
        />
      </svg>
    </span>
  );
};

export default CloseIcon;
