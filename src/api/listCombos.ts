import { useQuery } from "react-query";
import api from "./axiosConfig";

const listCombos = async () => {
  try {
    const response = await api.get(`/api/v1/combos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const useCombos = () => {
  return useQuery(["combos"], () => listCombos());
};
export default useCombos;
