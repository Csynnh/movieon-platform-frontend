import combo from "../../asset/image/combo.png";

import { Button, Col, Input, Radio, Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addSeat } from "../../api/addSeat";
import { Movie, SeatRequest } from "../../api/type";
import { formatDate } from "../../util/date";
import { convertToVietnamese } from "../../util/language";
import { AddBtn } from "./AddBtn";
import "./CheckOut.scss";
import { MinusBtn } from "./MinusBtn";
import Overlay from "./Overlay";
import { Combotype } from "../popcorn/PopCorn";
const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const priceCombo = 60000;
  const [count, setCount] = useState(1); // khoi tao 1 state va 1 ham de thay doi trang thai
  const [tempCombo, setTemp] = useState(priceCombo * count);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [form] = Form.useForm();
  const data: {
    movie: Movie;
    seats: SeatRequest[];
    showtime: string;
  } = location?.state?.data;
  const priceTicket = useMemo(() => {
    if (data?.seats)
      return (
        data?.seats?.reduce?.((acc, seat) => acc + Number(seat.price), 0) * 1000
      );
    else return 0;
  }, [data?.seats]);
  const [total, setTotal] = useState(priceTicket + tempCombo);

  useEffect(() => {
    if (!location?.state?.data) {
      navigate("/");
    }
  }, [location, navigate]);
  if (!location?.state?.data) return null;

  const handleIncrease = () => {
    setCount(count + 1); // re-render
    setTemp(priceCombo * (count + 1));
    setTotal(priceTicket + priceCombo * (count + 1));
  };
  const handleDecrease = () => {
    if (count === 0) return;
    setCount(count - 1);
    setTemp(priceCombo * (count - 1));
    setTotal(priceTicket + priceCombo * (count - 1));
  };

  //Xu ly close Overlay
  const handleExit = () => {
    setIsOpenOverlay(false);
  };

  const handleSubmitForm = async (values: any) => {
    console.log(values);
    const seatsData = data?.seats?.map((seat) => {
      return {
        ...seat,
        price: Number(seat.price) * 1000,
      };
    });
    await addSeat(seatsData);
    navigate("/");
    setIsOpenOverlay(true);
  };

  return (
    <div>
      <div className="checkout">
        <div className="checkout-container">
          <div className="checkout-header">
            <span>
              <svg
                width="40"
                height="42"
                viewBox="0 0 40 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.2979 35.019C18.5106 35.019 18.5106 38.3397 18.5106 40H34C34 37.7862 33.4043 35.019 32.2128 35.019H20.2979ZM20.2979 35.019C19.5035 33.1741 18.5107 28.931 20.8936 26.7172C18.9078 23.95 15.6511 18.5262 18.5106 18.9689C21.3702 19.4117 24.8653 23.581 26.2553 25.6103M24.4681 23.3965V4.2138C24.4681 2.99115 23.4012 2 22.0851 2H8.38298C7.0669 2 6 2.99115 6 4.2138V28.0986C6 29.3213 7.0669 30.3124 8.38298 30.3124H19.4876M31.617 34.4655V22.0802C31.617 17.7723 24.4681 14.5413 24.4681 14.5413V23.1572M10.5 4.57922V26.7172"
                  stroke="#0B2447"
                  strokeWidth="3"
                />
              </svg>
            </span>
            <h2>Thanh toán</h2>
          </div>
          <div className="checkout-content">
            <div className="checkout-left">
              <div className="checkout-item">
                <div className="checkout-item-image">
                  <img src={data?.movie?.poster} alt="poster" />
                </div>
                <div className="checkout-item-content">
                  <div className="checkout-item-content-header">
                    {data?.movie?.title}
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Thể loại: </p>
                    {data?.movie?.genres.map((genre, index) => (
                      <span key={index}>
                        {index !== 0 ? ", " : ""}
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Rạp: </p>
                    <span>Movieon Lê Văn Việt</span>
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Địa chỉ: </p>
                    <span>Movieon Lê Văn Việt</span>
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Suất: </p>
                    <span>{formatDate(data?.showtime)}</span>
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Phòng: </p>
                    <span>10</span>
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Ghế: </p>
                    {data?.seats?.map((seat, index) => (
                      <span key={index}>
                        {index !== 0 ? ", " : ""}
                        {seat?.seatType + "-" + seat?.seatNumber}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="checkout-temp">
                <p>Tạm tính</p>
                <div>
                  <span className="checkout-price">{priceTicket}</span>
                  <span>
                    (
                    {convertToVietnamese(
                      data?.seats?.reduce?.(
                        (acc, seat) => acc + Number(seat.price),
                        0
                      ) * 1000
                    )}
                    )
                  </span>
                </div>
              </div>
              <div className="checkout-item combo">
                <div className="checkout-image">
                  <img src={combo} alt="combo" />
                </div>
                <div className="checkout-item-content">
                  <div className="checkout-item-content-header">
                    Combo bắp nước
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Đơn giá: </p>
                    <span>{priceCombo}</span>
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Tên: </p>
                    <span>Combo 1</span>
                  </div>
                  <div className="checkout-item-content-title">
                    <p>Số lượng</p>
                    <div className="checkout-count">
                      <MinusBtn handle={handleDecrease} />
                      <p>{count}</p>
                      <AddBtn handle={handleIncrease} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkout-temp">
                <p>Tạm tính</p>
                <div>
                  <span className="checkout-price">{tempCombo} </span>
                  <span>(Chín mươi nghìn đồng)</span>
                </div>
              </div>
              <div className="checkout-line"></div>
              <div className="checkout-temp">
                <p>Tổng</p>
                <div>
                  <span className="checkout-price">{total} </span>
                  <span>(Chín mươi nghìn đồng)</span>
                </div>
              </div>
            </div>
            <div className="checkout-right">
              <Form
                autoFocus={false}
                layout="vertical"
                form={form}
                onFinish={handleSubmitForm}
              >
                <Col>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập trường này",
                      },
                    ]}
                    label="Tên Khách hàng"
                    name="customerName"
                  >
                    <Input placeholder="Nhap Tên Khách hàng"></Input>
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập trường này",
                      },
                    ]}
                    label="Số điện thoại"
                    name="customerPhone"
                  >
                    <Input
                      maxLength={10}
                      placeholder="Nhap Số điện thoại"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập trường này",
                      },
                    ]}
                    label="Email"
                    name="customerEmail"
                  >
                    <Input placeholder="Nhap Email"></Input>
                  </Form.Item>
                </Col>
                <Col className="checkout-payment">
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập trường này",
                      },
                    ]}
                    label="Phương thức thanh toán"
                    name={"paymentMethod"}
                    className="radio"
                    initialValue={"bank"}
                    style={{
                      marginBottom: 20,
                    }}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="bank">Ngân hàng</Radio.Button>
                      <Radio.Button value="momo">Momo</Radio.Button>
                      <Radio.Button value="vnpay">VnPay</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Button
                  type="primary"
                  htmlType="submit"
                  // disabled={isSubmitting}
                >
                  Xác nhận
                </Button>
              </Form>
            </div>
          </div>
        </div>
        {isOpenOverlay && <Overlay handle={handleExit}></Overlay>}
      </div>
    </div>
  );
};

export default CheckOut;
