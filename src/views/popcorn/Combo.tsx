import { useState } from "react";
import { AddBtn } from "../checkout/AddBtn";
import { MinusBtn } from "../checkout/MinusBtn";
import "./Combo.scss";
import { Button } from "antd";

const Combo = (props: {
  poster: any;
  name: string;
  price_orgin: number;
  price_discount: number;
  desc: string;
  setPopcorn: any;
}) => {
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
          <img src={props.poster} alt="comboPoster" />
          <div className="combo-content">
            <span className="combo-name"> {props.name}</span>
            <div className="combo-price">
              <p>Đơn giá: </p>
              <span className="combo-price discount">
                {props.price_discount} đồng{" "}
              </span>
              <span className="combo-price basic">
                {props.price_orgin} đồng
              </span>
            </div>
            <div className="combo-desc">
              <p>Mô tả :</p>
              <span>{props.desc}</span>
            </div>
          </div>
          <div className="combo-interact">
            <div className="combo-count">
              <span>Số lượng: </span>
              <MinusBtn handle={handleDecrease} />
              <p>{count}</p>
              <AddBtn handle={handleIncrease} />
            </div>
            <Button
              onClick={() =>
                count
                  ? props.setPopcorn((pre: any) =>
                      pre.find((item: any) => item.nameCombo === props.name)
                        ? pre.map((item: any) =>
                            item.nameCombo === props.name && item.count != count
                              ? {
                                  ...pre,
                                  count,
                                }
                              : item
                          )
                        : [
                            ...pre,
                            {
                              count,
                              nameCombo: props.name,
                              priceCombo: props.price_discount,
                            },
                          ]
                    )
                  : {}
              }
            >
              Chọn combo này
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Combo;
