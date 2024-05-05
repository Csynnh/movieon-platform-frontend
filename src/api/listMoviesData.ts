import { useEffect, useState } from "react";
import api from "./axiosConfig";
import { Movie } from "./type";

const useMoviesData = (props?: { limit?: number }): Movie[] => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const listMovies = async (): Promise<void> => {
    try {
      const response = await api.get(
        `/api/v1/movies${
          props?.limit ? "?limit=" + props?.limit : "?limit=100"
        }`
      );
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listMovies();
  }, []);

  return movies;
};

export default useMoviesData;
