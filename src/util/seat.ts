import { Seat } from "../views/movieDetail/MovieDetail";
import { v4 } from "uuid";

export function generateSeats(
  type: string,
  price: string,
  count: number,
  maxColumn: number
): Seat[] {
  return Array(count)
    .fill({ type, price, is_placed: false, column: 1 })
    .map((seat, index) => ({
      ...seat,
      id: v4(),
      column: (index % maxColumn) + 1,
      number: index + 1,
    }));
}
export function getSeat(type: string, column: number, price: string) {
  let seatType = type.split("-")[0];
  if (seatType === "basic") {
    if (column <= 20) {
      seatType = "A";
    } else if (column <= 40) {
      seatType = "B";
    } else seatType = "C";
  } else if (seatType === "vip") {
    if (column <= 15) {
      seatType = "VIP_1";
    } else seatType = "VIP_2";
  } else {
    seatType = "COUPLE";
  }
  return {
    type: seatType,
    price: price.split(".")[0],
    column,
  };
}
