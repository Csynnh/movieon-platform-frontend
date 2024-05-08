import { useState } from "react";
import comboPoster from "../../asset/image/combo-poster.png";
import { AddBtn } from "../checkout/AddBtn";
import { MinusBtn } from "../checkout/MinusBtn";
import "./Combo.scss";
import { Button } from "antd";

const Combo = () => {
  const [count, setCount] = useState(0); // khoi tao 1 state va 1 ham de thay doi trang thai

  const handleDecrease = () => {
    if (count === 0) return;
    setCount(count - 1);
  };
  const handleIncrease = () => {
    setCount(count + 1); // re-render
  };
  return (
    <>
      <div className="combo">
        <div className="combo-container">
          <img src={comboPoster} alt="comboPoster" />
          <div className="combo-content">
            <span className="combo-name">Combo 1</span>
            <div className="combo-price">
              <p>Đơn giá: </p>
              <span className="combo-price discount">80000 đồng </span>
              <span className="combo-price basic">90000 đồng</span>
            </div>
            <div className="combo-desc">
              <p>Mô tả :</p>
              <span>1 bắp caramel + 1 coca</span>
            </div>
          </div>
          <div className="combo-interact">
            <div className="combo-count">
              <span>Số lượng: </span>
              <MinusBtn handle={handleDecrease} />
              <p>{count}</p>
              <AddBtn handle={handleIncrease} />
            </div>
            <Button>Đặt combo này</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Combo;
