import { useEffect, useState } from "react";

import getMovieById from "../../api/getMovieData";
import listCalendars from "../../api/listCalendarByMovieAndCinema";
import listCinemasData from "../../api/listCinemasData";
import useSeats from "../../api/listSeats";
import { Cinema, Movie, SeatType } from "../../api/type";
import {
  basicHover,
  basicSeat,
  douHover,
  douSeat,
  vipHover,
  vipSeat,
} from "../../asset/image/";
import CheckoutBox from "../../components/checkoutBox/CheckoutBox";
import Loading from "../../components/loading/Loading";
import SeatGroup from "../../components/selects/seatSelection/SeatSelection";
import CinemasSelection from "../../components/showtime/CinemasSelection";
import DateSelection from "../../components/showtime/DateSelection";
import TimeSelection from "../../components/showtime/TimeSelection";
import { seatsArray } from "../../mocks/seats";
import { getSeat } from "../../util/seat";
import { useParams } from "react-router-dom";
import "../../components/showtime/index.scss";
import { convertToDate } from "../admin/Dashboard";
import "./MovieDatail.scss";
export interface Seat {
  type: string;
  price: string;
  id: string;
  is_placed: boolean;
  column: number;
  number: number;
}

const MovieDetail = () => {
  const { movieId, date, cinemaId } = useParams();
  const cinemaData: Cinema[] = listCinemasData();
  const movieDetail: Movie | undefined = getMovieById(movieId ?? "");
  const [isOpenBill, setIsOpenBill] = useState(false);
  const [dateSelected, setDateSelected] = useState(date ?? "");
  const [cinemaSelected, setCinemaSelected] = useState<string>(
    cinemaId ?? cinemaData[0]?.cinemaId ?? ""
  );
  const [seatSelected, setSeatSelected] = useState<Seat[]>([]);
  const [seatsArrayData, setSeatsArrayData] = useState<Seat[]>(seatsArray);
  const { data, refetch, isLoading } = listCalendars({
    cinemaId: cinemaSelected,
    movieId,
    date: convertToDate(dateSelected),
  });
  useEffect(() => {
    if (cinemaSelected && dateSelected) {
      refetch();
    }
  }, [cinemaSelected, dateSelected]);
  useEffect(() => {
    if ([...seatSelected].length > 0) {
      setIsOpenBill(true);
    } else {
      setIsOpenBill(false);
    }
  }, [![...seatSelected].length]);
  useEffect(() => {
    if (data && data?.[0]?.time) {
      setTimeSelected(data?.[0]?.time);
    }
  }, [data]);
  const [timeSelected, setTimeSelected] = useState(data?.[0]?.time ?? "");
  const calendarSelected = data?.find((item) => item.time === timeSelected);

  const {
    data: seatPlacedData,
    refetch: refetchSeatPlaced,
    isLoading: isLoadingSeatPlaced,
  } = useSeats({
    calendarId: calendarSelected?.calendarId,
  });
  useEffect(() => {
    const calendarSelected = data?.find((item) => item.time === timeSelected);
    if (calendarSelected && timeSelected) {
      refetchSeatPlaced();
      setSeatSelected([]);
    }
  }, [timeSelected]);
  useEffect(() => {
    if (!isLoadingSeatPlaced && seatPlacedData?.length > 0) {
      setSeatsArrayData(
        seatsArrayData.map((seat) => {
          const seatPlaced = seatPlacedData.find(
            (seatPlaced: any) =>
              seatPlaced.seatNumber === seat.column &&
              getSeat(seat.type, seat.number, seat?.price)?.type ===
                seatPlaced.seatType
          );
          if (seatPlaced) {
            return {
              ...seat,
              is_placed: true,
            };
          }
          return seat;
        })
      );
    } else {
      setSeatsArrayData(seatsArray);
    }
  }, [seatPlacedData, isLoadingSeatPlaced]);
  const handleCloseBill = () => {
    setIsOpenBill(false);
  };
  const handleSelectCinema = (event: any) => {
    event.detail?.value && setCinemaSelected(event.detail?.value?.cinemaId);
  };
  const handleChangeSeat = (id: string) => {
    const seatIndex = seatSelected.findIndex((seat) => seat.id === id);
    const seat = seatsArrayData.find((seat) => seat.id === id);
    if (seatIndex === -1 && seat) {
      setSeatSelected([...seatSelected, seat]);
    } else {
      setSeatSelected(seatSelected.filter((seat) => seat.id !== id));
    }
  };
  return (
    <Loading spinning={!movieDetail || isLoading || isLoadingSeatPlaced}>
      {movieDetail && (
        <>
          <div className={"movie"}>
            <div className="movie-container">
              <div className="movie-poster">
                <img src={movieDetail?.poster} alt="poster" />
              </div>
              <div className="movie-detail">
                <div className="movie-title">
                  <h3>{movieDetail?.title}</h3>
                  <div className="line"></div>
                </div>
                <div className="movie-detail-desc">
                  <div className="movie-detail-top">
                    <div className="movie-desc-top">
                      <strong>Thể loại: </strong>
                      {movieDetail?.genres.map((genre, index) => (
                        <span key={index}>
                          {index !== 0 ? ", " : ""}
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="movie-desc-top">
                      <strong>Thời lượng: </strong>
                      <span>{movieDetail?.runtime}</span>
                    </div>
                    <div className="movie-desc-top">
                      <strong>Ngôn ngữ: </strong>
                      {movieDetail?.languages.map((lang, index) => (
                        <span key={index}>
                          {index !== 0 ? ", " : ""}
                          {lang}
                        </span>
                      ))}
                    </div>
                    <div className="movie-desc-top">
                      <strong>Rated: </strong>
                      <span>{movieDetail?.imdb?.rating}</span>
                    </div>
                  </div>
                  <h4>Mô tả chi tiết</h4>
                  <div className="movie-detail-bottom">
                    <div className="movie-desc-top">
                      <strong>Khởi chiếu: </strong>
                      <span>
                        {new Date(movieDetail?.released).toDateString()}
                      </span>
                    </div>
                    <div className="movie-desc-top">
                      <strong>Đạo diễn: </strong>
                      {movieDetail?.directors.map((director, index) => (
                        <span key={index}>{director} </span>
                      ))}
                    </div>
                    <div className="movie-desc-top">
                      <strong>Diễn viên: </strong>
                      {movieDetail?.cast.map((cast, index) => (
                        <span key={index}>
                          {index !== 0 ? `-  ${cast}` : cast}
                        </span>
                      ))}
                    </div>
                    <div className="movie-desc-top content">
                      <strong>Nội dung: </strong>
                      <span>{movieDetail?.fullplot}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="movie-wrap">
              <CinemasSelection
                value={cinemaSelected}
                cinemas={cinemaData}
                handleSelect={handleSelectCinema}
              ></CinemasSelection>
              <DateSelection
                setDateSelected={setDateSelected}
                dateSelected={dateSelected}
              ></DateSelection>
              <TimeSelection
                timeData={data?.map((item) => item.time) ?? []}
                setTimeSelected={setTimeSelected}
                timeSelected={timeSelected}
              ></TimeSelection>
            </div>
            <div className="movie-booking">
              <svg
                width="1154"
                height="79"
                viewBox="0 0 1154 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 76C1 76 333.252 3.44686 564.874 3.00207C799.162 2.55217 1153 76 1153 76"
                  stroke="#0B2447"
                  strokeWidth="5"
                />
              </svg>
              <p className="note">Màn hình</p>
              <div className="movie-booking seat">
                <div className="movie-seat-row">
                  <p>Dãy A</p>
                  <p>Dãy B</p>
                  <p>Dãy C</p>
                  <p>Dãy VIP-1</p>
                  <p>Dãy VIP-2</p>
                  <p>Dãy Đôi</p>
                </div>
                <div className="movie-seat-area">
                  <SeatGroup
                    data={seatsArrayData}
                    onChangeSeat={handleChangeSeat}
                    seatSelected={seatSelected}
                  />
                </div>
                <div className="movie-seat-row">
                  <p>Dãy A</p>
                  <p>Dãy B</p>
                  <p>Dãy C</p>
                  <p>Dãy VIP-1</p>
                  <p>Dãy VIP-2</p>
                  <p>Dãy Đôi</p>
                </div>
              </div>
              <div className="movie-seat-desc">
                <div className="movie-seat-group">
                  <div className="movie-seat-desc-item">
                    <div className="movie-seat-desc-wrap">
                      <div className="movie-seat-desc-img">
                        <img src={basicSeat} alt="basicSeat" />
                      </div>
                      <p>Ghế đơn trống</p>
                    </div>
                  </div>
                  <div className="movie-seat-desc-item">
                    <div className="movie-seat-desc-wrap">
                      <div className="movie-seat-desc-img">
                        <img src={basicHover} alt="basicSeat" />
                      </div>
                      <p>Ghế đơn đã được đặt</p>
                    </div>
                  </div>
                </div>
                <div className="movie-seat-group">
                  <div className="movie-seat-desc-item">
                    <div className="movie-seat-desc-wrap">
                      <div className="movie-seat-desc-img">
                        <img src={vipSeat} alt="basicSeat" />
                      </div>
                      <p>Ghế vip trống</p>
                    </div>
                  </div>
                  <div className="movie-seat-desc-item">
                    <div className="movie-seat-desc-wrap">
                      <div className="movie-seat-desc-img">
                        <img src={vipHover} alt="basicSeat" />
                      </div>
                      <p>Ghế vip đã được đặt</p>
                    </div>
                  </div>
                </div>
                <div className="movie-seat-group">
                  <div className="movie-seat-desc-item">
                    <div className="movie-seat-desc-wrap">
                      <div className="movie-seat-desc-img">
                        <img src={douSeat} alt="basicSeat" />
                      </div>
                      <p>Ghế đôi trống</p>
                    </div>
                  </div>
                  <div className="movie-seat-desc-item">
                    <div className="movie-seat-desc-wrap">
                      <div className="movie-seat-desc-img">
                        <img src={douHover} alt="basicSeat" />
                      </div>
                      <p>Ghế đôi đã được đặt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CheckoutBox
            open={isOpenBill}
            data={{
              showtime:
                data?.find((item) => item.time === timeSelected)?.showTime ??
                "",
              movie: movieDetail,
              seats: [...seatSelected].map((seat) => {
                return {
                  calendarId:
                    data?.find((item) => item.time === timeSelected)
                      ?.calendarId ?? "",
                  seatNumber: seat.column,
                  seatType: getSeat(seat.type, seat.number, seat?.price)
                    ?.type as SeatType,
                  price: getSeat(seat.type, seat.number, seat?.price)?.price,
                };
              }),
            }}
            handle={handleCloseBill}
          ></CheckoutBox>
        </>
      )}
    </Loading>
  );
};

export default MovieDetail;
