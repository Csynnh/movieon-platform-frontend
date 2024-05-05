import api from "./axiosConfig";
import { CalendarType } from "./type";
import Toastify from "toastify-js";

export const addCalendar = async (
  showTime: Date,
  movieId: string,
  theaterId: string,
  calendarId?: string
): Promise<CalendarType | null> => {
  try {
    const showTimeValue = new Date(showTime);
    if (calendarId) {
      const response = await api.put(`api/v1/calendars/${calendarId}`, {
        _id: calendarId,
        showTime: showTimeValue,
        movie: {
          _id: movieId,
        },
        theater: {
          _id: theaterId,
        },
      });
      return response.data;
    } else {
      const response = await api.post(
        `api/v1/calendars?movieId=${movieId}&theaterId=${theaterId}`,
        {
          showTime: showTimeValue,
        }
      );
      return response.data;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.detail;
    const errorStatus = error?.response?.data?.status_code;
    Toastify({
      text: `${errorStatus}: ${errorMessage}`,
      duration: 6000,
      backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
      type: "error",
    }).showToast();
    return null;
  }
};
