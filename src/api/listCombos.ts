import { useQuery } from 'react-query';
import api from './axiosConfig';
import { ComboFormType } from './type';

const listCombos = async (cinemaId?: string): Promise<ComboFormType[]> => {
  try {
    console.log(cinemaId);
    if (!cinemaId) {
      return [] as ComboFormType[];
    }
    const response = await api.get(`/api/v1/combos`, {
      params: {
        cinemaId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [] as ComboFormType[];
};
const useCombos = (cinemaId?: string) => {
  console.log('first');
  return useQuery(['combos', { cinemaId }], () => listCombos(cinemaId));
};
export default useCombos;
