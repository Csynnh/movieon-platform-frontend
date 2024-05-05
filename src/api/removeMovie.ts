import api from "./axiosConfig";

export const removeMovie = async (movieId: string): Promise<void> => {
   try {
      await api.delete(`/api/v1/movies/${movieId}`);
      console.info(`Movie removed successfully !`);
   } catch (error) {
      console.log(error);
   }
};
