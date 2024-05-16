import dayjs from "dayjs";
import api from "./axiosConfig";
import { CalendarType } from "./type";
import { useQuery } from "react-query";

export interface CalendarParams {
  cinemaId?: string;
  movieId?: string;
  date?: Date;
}

const listCalendar = async ({
  cinemaId,
  date,
}: CalendarParams): Promise<CalendarType[]> => {
  try {
    if (cinemaId && date) {
      const response = await api.get(`/api/v1/calendars/cinema/${cinemaId}`, {
        params: {
          date: date.toISOString(),
        },
      });
      return response.data.map((calendar: CalendarType) => ({
        ...calendar,
        time: dayjs(calendar.showTime).locale("vi").format("DD/MM/YYYY HH:mm"),
      }));
    }
    return [];
  } catch (error) {
    throw new Error("Failed to fetch calendars");
  }
};

const useCalendars = ({ cinemaId, date }: CalendarParams) => {
  // Use the useQuery hook with the listCalendar function
  return useQuery(["calendars", cinemaId, date], () =>
    listCalendar({ cinemaId, date })
  );
};

export default useCalendars;
