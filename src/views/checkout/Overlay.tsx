import React, { FC } from "react";
import qr from "../../asset/image/qr.png";
import { Action } from "./AddBtn";
import CloseIcon from "./CloseIcon";

const Overlay: FC<Action> = ({ handle }) => {
  return (
    <div className="checkout-overlay">
      <div className="overlay-temp" onClick={handle}></div>
      <div className="checkout-overlay-container">
        <div className="checkout-qr">
          <img src={qr} alt="ma qr" />
          <div className="checkout-info">
            <div className="checkout-item-content-title">
              <p>Tên ngân hàng nhận: </p>
              <span>Vietcombank</span>
            </div>
            <div className="checkout-item-content-title">
              <p>Số tài khoản người nhận: </p>
              <span>Movieon Lê Văn Việt</span>
            </div>
            <div className="checkout-item-content-title">
              <p>Chủ tài khoản: </p>
              <span>Movieon Lê Văn Việt</span>
            </div>
            <div className="checkout-item-content-title">
              <p>Số hóa đơn: </p>
              <span>Movieon Lê Văn Việt</span>
            </div>
          </div>
        </div>
        <CloseIcon handle={handle}></CloseIcon>
      </div>
    </div>
  );
};

export default Overlay;
