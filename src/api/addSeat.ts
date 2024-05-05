import api from "./axiosConfig";
import { SeatRequest } from "./type";
import Toastify from "toastify-js";
export const addSeat = async (seats: SeatRequest[]): Promise<void> => {
  try {
    const response = await api.post("/api/v1/seats", seats);
    if (response.status === 200) {
      Toastify({
        text: "Seat placed successfully",
        duration: 5000,
        backgroundColor: "#0DB473",
      }).showToast();
    }
  } catch (error) {
    console.log(error);
  }
};
