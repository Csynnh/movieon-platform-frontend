import { useQuery } from "react-query";
import api from "./axiosConfig";
import { ComboFormType } from "./type";

const listCombos = async (): Promise<ComboFormType[]> => {
  try {
    const response = await api.get(`/api/v1/combos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [] as ComboFormType[];
};
const useCombos = () => {
  return useQuery(["combos"], () => listCombos());
};
export default useCombos;
