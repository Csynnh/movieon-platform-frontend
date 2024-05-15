import { useState } from "react";
import { AddBtn } from "../checkout/AddBtn";
import { MinusBtn } from "../checkout/MinusBtn";
import "./Combo.scss";
import { Button } from "antd";
import { Combotype } from "./PopCorn";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { isHtmlElement } from "react-router-dom/dist/dom";

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
    const newPopcorn = (data: Combotype[]) => {
      if (!data) return [];
      return data
        ?.map((item) => {
          if (item.name === props.name)
            return {
              ...item,
              count: --item.count,
            };
          return item;
        })
        .filter((item) => item.count > 0);
    };
    props.setPopcorn((pre: Combotype[]) => newPopcorn(pre));
  };

  const handleIncrease = () => {
    setCount(count + 1); // re-render
    const combo: Combotype = {
      count: count + 1,
      name: props.name,
      price: props.price_discount,
    };

    // kiem tra combo da ton tai trong setpopcorn hay chua
    const isExist = (data: Combotype[], combo: Combotype) => {
      return data?.find((item) => item.name === combo.name);
    };
    // neu chua, setpopcorn af mang da co + combo
    // neu co, thay doi count cua phan tu da co
    const newPopcorn = (data: Combotype[], combo: Combotype) => {
      if (!isExist(data, combo)) {
        return [...data, combo];
      } else {
        return data?.map((item) => {
          if (item.name === combo.name) {
            return {
              ...item,
              count: combo.count,
            };
          }
          return item;
        });
      }
    };

    props.setPopcorn((pre: Combotype[]) => newPopcorn(pre, combo));
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
            {/* <Button
              onClick={() =>
                count
                  ? props.setPopcorn((pre: any) =>
                      pre.find((item: any) => item.nameCombo === props.name) // timf combo trong mang ban dau nam trong setPopcorn, neu co 
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
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Combo;
