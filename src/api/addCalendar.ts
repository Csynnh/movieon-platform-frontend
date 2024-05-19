import api from "./axiosConfig";
import { CalendarType } from "./type";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const addCalendar = async (
  showTime: string,
  movieId: string,
  theaterId: string,
  calendarId?: string
): Promise<CalendarType | null> => {
  try {
    if (calendarId) {
      const response = await api.put(`api/v1/calendars/${calendarId}`, {
        showTime,
        movieId,
        theaterId,
      });
      return response.data;
    } else {
      const response = await api.post(
        `api/v1/calendars?date=${showTime}&movieId=${movieId}&theaterId=${theaterId}`
      );
      return response.data;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.detail;
    const errorStatus = error?.response?.data?.status_code;
    if (errorMessage && errorStatus) {
      Toastify({
        text: `${errorStatus}: ${errorMessage}`,
        duration: 6000,
        backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
      }).showToast();
    }
    throw new Error(error);
  }
};
