export interface Movie {
  title: string;
  _id: {
    timestamp: number;
    date: Date;
  };
  genres: string[];
  poster: string;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  movieId: string;
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
export interface TheaterType {
  _id: string;
  name: string;
  cinemaId: string;
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
  _id: string;
  username: string;
  password: string;
  email: string;
}
export interface User {
  _id: string;
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
  price: int;
  calendarId: string;
}

enum SeatType {
  A = "A",
  B = "B",
  C = "C",
  VIP_1 = "VIP_1",
  VIP_2 = "VIP_2",
  COUPLE = "COUPLE",
}
