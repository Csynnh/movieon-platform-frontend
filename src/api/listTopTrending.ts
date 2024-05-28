// List calendar trending from BE
import api from './axiosConfig';
import { useEffect, useState } from 'react';
// import { Movie } from './type';
import { CalendarType } from './type';

const useTopTrending = (props?: { limit?: number }): CalendarType[] => {
  const [listTrending, setListTrending] = useState<CalendarType[]>([]);

  const listTopTrending = async (): Promise<void> => {
    try {
      const response = await api.get(`api/v1/calendars/trending`);
      setListTrending(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listTopTrending();
  }, []);

  return listTrending;
};
export default useTopTrending;
