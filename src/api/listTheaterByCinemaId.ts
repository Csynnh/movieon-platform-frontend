import { useQuery } from "react-query";
import api from "./axiosConfig";
import { TheaterType } from "./type";

const listTheaterByCenimaId = async (
   cinemaId?: string
): Promise<TheaterType[]> => {
   try {
      if (cinemaId) {
         const response = await api.get(`/api/v1/theaters/cinema/${cinemaId}`);
         return response.data;
      } else {
         return [];
      }
   } catch (error) {
      throw new Error("Failed to fetch theaters");
   }
};

const useTheaters = (cinemaId?: string) => {
   return useQuery(["theaters", cinemaId], () =>
      listTheaterByCenimaId(cinemaId)
   );
};

export default useTheaters;
