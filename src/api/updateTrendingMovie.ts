import api from './axiosConfig';
import { Movie } from './type';

export const useUpdateMovie = async (movieId: string, updatedData: Boolean) => {
  try {
    const response = await api.put(`/api/movies/${movieId}/trending`, updatedData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
