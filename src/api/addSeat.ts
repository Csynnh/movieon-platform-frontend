import Toastify from 'toastify-js';
import api from './axiosConfig';
import { SeatRequest } from './type';
export const addSeat = async (seats: SeatRequest[]): Promise<any> => {
  try {
    const response = await api.post('/api/v1/seats', seats);
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};
