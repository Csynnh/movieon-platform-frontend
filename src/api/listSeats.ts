import { useQuery } from "react-query";
import api from "./axiosConfig";

const listSeats = async (props: { calendarId: string | undefined }) => {
  try {
    if (props.calendarId) {
      const response = await api.get(`/api/v1/seats`, {
        params: {
          calendarId: props?.calendarId,
        },
      });
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
const useSeats = (props: { calendarId: string | undefined }) => {
  return useQuery(["seats", props.calendarId], () => listSeats(props));
};
export default useSeats;
