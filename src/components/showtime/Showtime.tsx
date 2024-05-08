import { useEffect, useState } from "react";
import useCalendars from "../../api/listCalendar";
import listCinemasData from "../../api/listCinemasData";
import { Cinema } from "../../api/type";
import DetailTicket from "../../asset/image/DetailTicket";
import CinemasSelection from "../../components/showtime/CinemasSelection";
import DateSelection, {
  dateData,
} from "../../components/showtime/DateSelection";
import { convertToDate } from "../../views/admin/Dashboard";
import MovieContainer from "./MovieContainer";
import "./index.scss";
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
  const handleSelectCinema = (value: any) => {
    value && setCinemaSelected(value);
  };
  console.log(calendarData, cinemaSelected);
  return (
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
        <MovieContainer
          calendarData={calendarData ?? []}
          dateSelected={dateSelected}
          cinemaSelected={cinemaSelected ?? ""}
          loading={isLoading || !cinemaSelected}
        />
        <div className="showtime-title">
          <h2>Chi tiết giá vé</h2>
        </div>
        <div className="showtime-tickets">
          <div className="showtime-animate"></div>
          <DetailTicket />
        </div>
      </div>
    </section>
  );
};

export default Showtime;
