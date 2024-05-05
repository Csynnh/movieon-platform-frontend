import api from "./axiosConfig";
import { Movie } from "./type";

export const addMovie = async (movie: Movie): Promise<void> => {
   try {
      const response = await api.post("/api/v1/movies", movie);
      console.log("response.data :>> ", response.data);
   } catch (error) {
      console.log(error);
   }
};
