import { generateSeats } from "../util/seat";
import { Seat } from "../views/movieDetail/MovieDetail";

const basicSeats: Seat[] = generateSeats("basic-seat", "45.000", 60, 20);
const vipSeats: Seat[] = generateSeats("vip-seat", "60.000", 30, 15);
const douSeats: Seat[] = generateSeats("dou-seat", "100.000", 10, 20);

export const seatsArray: Seat[] = [...basicSeats, ...vipSeats, ...douSeats];
