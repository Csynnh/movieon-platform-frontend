import api from "./axiosConfig";
import { CalendarType } from "./type";

export const updateCalendar = async (
   calendarId: string,
   showTime: Date,
   movieId: string,
   theaterId: string
): Promise<CalendarType | null> => {
   try {
      const showTimeValue = new Date(showTime);
      const response = await api.post(`api/v1/calendars/${calendarId}`, {
         showTime: showTimeValue,
         movieId: movieId,
         theaterId: theaterId,
      });
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   }
};
