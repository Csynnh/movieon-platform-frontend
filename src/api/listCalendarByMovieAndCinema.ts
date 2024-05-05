import { CalendarParams } from "./listCalendar";
import { CalendarType } from "./type";
import api from "./axiosConfig";
import { useQuery } from "react-query";

const listCalendar = async ({
  cinemaId,
  movieId,
  date,
}: CalendarParams): Promise<CalendarType[]> => {
  try {
    if (cinemaId && movieId) {
      const response = await api.get(`/api/v1/calendars`, {
        params: {
          cinemaId,
          movieId,
          date,
        },
      });
      return response.data.map((calendar: CalendarType) => ({
        ...calendar,
        time: new Date(calendar.showTime).toTimeString().split(" ")[0],
      }));
    }
    return [];
  } catch (error) {
    throw new Error("Failed to fetch calendars");
  }
};
const listCalendars = ({ cinemaId, movieId, date }: CalendarParams) => {
  // Use the useQuery hook with the listCalendar function
  return useQuery(["calendars", cinemaId, movieId, date], () =>
    listCalendar({ cinemaId, movieId, date })
  );
};

export default listCalendars;
