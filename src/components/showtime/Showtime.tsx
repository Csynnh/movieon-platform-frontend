import CinemasSelection from "../../components/showtime/CinemasSelection";
import DateSelection, {
  dateData,
} from "../../components/showtime/DateSelection";
import "./index.scss";
import MovieComponent from "../movieComponent/MovieComponent";
import DetailTicket from "../../asset/image/DetailTicket";
import { Cinema, Movie } from "../../api/type";
import { useEffect, useState } from "react";
import listCinemasData from "../../api/listCinemasData";
import useCalendars from "../../api/listCalendar";
import { convertToDate } from "../../views/admin/Dashboard";
import Loading from "../loading/Loading";
import uploadImage from "../../asset/image/uploading-calender.png";
const Showtime = () => {
  const [listCinema, setListCinema] = useState<Cinema[]>([]);
  const [cinemaSelected, setCinemaSelected] = useState<string>();
  const [dateSelected, setDateSelected] = useState(dateData[0].value);
  const cinemaData: Cinema[] = listCinemasData();
  const {
    data: calendarData,
    refetch,
    isLoading,
  } = useCalendars({
    cinemaId: cinemaSelected,
    date: convertToDate(dateSelected),
  });
  useEffect(() => {
    refetch();
  }, [cinemaSelected, dateSelected]);
  useEffect(() => {
    if (cinemaData) {
      setListCinema(cinemaData);
      setCinemaSelected(cinemaData[0]?.cinemaId);
    }
  }, [cinemaData?.length]);
  const handleSelectCinema = (event: any) => {
    event.detail?.value && setCinemaSelected(event.detail?.value?.cinemaId);
  };
  return (
    <Loading spinning={isLoading || !dateSelected || !cinemaSelected}>
      <section className={"showtime"} id="showtime">
        <div className="showtime-container">
          <div className="showtime-title">
            <h2>XEM GÌ ĐÂY</h2>
          </div>
          <CinemasSelection
            value={cinemaSelected}
            cinemas={listCinema}
            handleSelect={handleSelectCinema}
          ></CinemasSelection>
          <DateSelection
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          ></DateSelection>
          {calendarData?.length ? (
            <div className="showtime-movies ">
              {Array.from(
                new Set(calendarData.map((item) => item?.movie?.movieId))
              )
                .map((movieId) => {
                  return calendarData.find(
                    (item) => item?.movie?.movieId === movieId
                  );
                })
                ?.map(
                  (item) =>
                    item &&
                    item?.movie && (
                      <MovieComponent
                        key={item?.movie?.movieId}
                        movie={item?.movie as Movie}
                        selectedDate={dateSelected}
                        selectedCinemaId={cinemaSelected ?? ""}
                      />
                    )
                )}
            </div>
          ) : (
            <div className="showtime-uploading">
              <div className="showtime-uploading-image">
                <img src={uploadImage as string} alt="upload image" />
              </div>
              <p>Chưa có lịch chiếu</p>
            </div>
          )}
          <div className="showtime-title">
            <h2>Chi tiết giá vé</h2>
          </div>
          <div className="showtime-tickets">
            <DetailTicket />
          </div>
        </div>
      </section>
    </Loading>
  );
};

export default Showtime;
