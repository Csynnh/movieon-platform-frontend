import { FC } from "react";

export interface Action {
  handle: () => void;
}

export const AddBtn: FC<Action> = ({ handle }) => {
  return (
    <span className="action-btn" onClick={handle}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="8" stroke="#19376D" strokeWidth="2" />
        <path d="M4.5 9H13.5" stroke="#0B2447" strokeWidth="2" />
        <path d="M9 5.5V12.5" stroke="#0B2447" strokeWidth="2" />
      </svg>
    </span>
  );
};
