import { Button } from "@hilla/react-components/Button.js";
import { Movie, SeatRequest } from "../../api/type";
import CloseIcon from "../../views/checkout/CloseIcon";
import { NavLink, useNavigate } from "react-router-dom";
import "./CheckoutBox.scss";
import { formatDate } from "../../util/date";
import { useCallback, useMemo } from "react";

const CheckoutBox = (props: {
  handle: any;
  open?: boolean;
  data?: { movie: Movie; seats: SeatRequest[]; showtime: string };
}) => {
  const { handle, open, data } = props;
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const priceTicket = useMemo(() => {
    if (!data?.seats) return 0;
    return (
      data?.seats?.reduce?.((acc, seat) => acc + Number(seat.price), 0) * 1000
    );
  }, [data?.seats]);
  const seatSelected = useCallback(() => {
    return data?.seats?.map((seat, index) => (
      <span key={index}>
        {index !== 0 ? ", " : ""}
        {seat?.seatType + "-" + seat?.seatNumber}
      </span>
    ));
  }, [data?.seats]);
  return (
    <div className={`bill ${open ? "isOpen" : ""}`}>
      <h4>{data?.movie?.title}</h4>
      <div className="bill-container">
        <div className="bill-content">
          <div className="bill-desc">
            <span className="title">Suất: </span>
            <span>{formatDate(data?.showtime ?? "")}</span>
          </div>
          <div
            className="bill-desc"
            style={{
              maxWidth: "60%",
            }}
          >
            <span className="bill-title">Ghế đã đặt: </span>
            {seatSelected()}
          </div>
          <div className="bill-desc">
            <span className="bill-title">Bắp nước: </span>
            <span>Không</span>
          </div>
          <div className="bill-desc">
            <span className="bill-title">Tạm tính: </span>
            <span>{priceTicket}đ</span>
          </div>
        </div>
        <div className="bill-link">
          <NavLink
            to="/popcorn"
            className={`${pathname === "/movie" ? "secondary" : ""}`}
          >
            <Button>Đặt bắp nước</Button>
          </NavLink>
          <div
            onClick={() => navigate("/checkout", { state: { data } })}
            className={`${pathname === "/popcorn" ? "secondary" : ""}`}
          >
            <Button>Thanh toán</Button>
          </div>
        </div>
        <CloseIcon handle={handle}></CloseIcon>
      </div>
    </div>
  );
};

export default CheckoutBox;
