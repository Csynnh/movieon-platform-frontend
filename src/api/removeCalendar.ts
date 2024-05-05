import { AxiosResponse } from "axios";
import api from "./axiosConfig";

export const removeCalendar = async (
   calendarId: string
): Promise<AxiosResponse<any, any> | unknown> => {
   try {
      const res = await api.delete(`/api/v1/calendars/${calendarId}`);
      return res;
   } catch (error) {
      return error;
   }
};
