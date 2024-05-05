import { useEffect, useState } from "react";
import api from "./axiosConfig";
import { Movie } from "./type";

const getMovieById = (id: string): Movie | undefined => {
   const [movie, setMovie] = useState<Movie>();
   const getMovie = async (): Promise<void> => {
      try {
         const response = await api.get(`/api/v1/movies/${id}`);
         setMovie(response.data);
      } catch (error) {
         console.log(error);
         return undefined;
      }
   };
   useEffect(() => {
      getMovie();
   }, []);
   return movie;
};

export default getMovieById;
