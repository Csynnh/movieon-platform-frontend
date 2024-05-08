import { CalendarType, Movie } from "../../api/type";
import Loading from "../loading/Loading";
import MovieComponent from "../movieComponent/MovieComponent";
import uploadImage from "../../asset/image/uploading-calender.png";

type Prop = {
  calendarData: CalendarType[];
  dateSelected: string;
  cinemaSelected: string;
  loading: boolean;
};
const MovieContainer = ({
  calendarData,
  dateSelected,
  cinemaSelected,
  loading,
}: Prop) => {
  return (
    <Loading spinning={loading}>
      {calendarData?.length ? (
        <div className="showtime-movies ">
          {Array.from(new Set(calendarData.map((item) => item?.movie?.movieId)))
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
    </Loading>
  );
};

export default MovieContainer;
