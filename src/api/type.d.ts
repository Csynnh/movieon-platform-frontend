export interface Movie {
  title: string;
  _id: string;
  genres: string[];
  poster: string;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  imdbId: number;
  runtime: number;
  released: Date;
  languages: string[];
  directors: string[];
  cast: string[];
  fullplot: string;
  rated: string;
}
export interface CalendarType {
  _id?: string;
  movie: Movie;
  theater: TheaterType;
  showTime: string;
  time?: string;
  calendarId: string;
}
export interface CalendarColumnType {
  key: React.Key;
  movie: Movie;
  theater: TheaterType;
  showTime: string;
  time?: string;
  calendarId: string;
}
export interface TheaterType {
  _id: string;
  name: string;
  cinemaId: string;
  theaterId: string;
}
export interface MovieDetail {
  title: string;
  genres: string[];
  poster: string;
  imdbId: number;
  runtime: number;
  released: Date;
  languages: string[];
  directors: string[];
  cast: string[];
  fullplot: string;
  rated: string;
}
export interface TenantType {
  _id?: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastname: string;
}
export interface User {
  _id?: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
export interface Cinema {
  _id: string;
  name: string;
  address: string;
  cinemaId: string;
}
export interface SeatRequest {
  seatNumber: number;
  seatType: SeatType;
  price: number;
  calendarId: string;
}

export interface ComboFormType {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  discount: number;
}

enum SeatType {
  A = "A",
  B = "B",
  C = "C",
  VIP_1 = "VIP_1",
  VIP_2 = "VIP_2",
  COUPLE = "COUPLE",
}
