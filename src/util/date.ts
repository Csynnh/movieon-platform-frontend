import dayjs from 'dayjs';

export const formatDate = (time: string) => {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  return `${hours}h${minutes} Ngày ${day}/${month}/${year}`;
};
export const convertToDate = (time: string) => {
  const date = dayjs(time).format('DD/MM/YYYY');
  return date;
};
export const convertToTime = (time: string) => {
  const date = dayjs(time).format('HH:mm');
  return date;
};
