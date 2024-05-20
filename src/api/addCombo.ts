import api from "./axiosConfig";
import { ComboFormType } from "./type";

export const addCombo = async (
  combo: ComboFormType
): Promise<ComboFormType> => {
  try {
    const response = await api.post(`/api/v1/combos`, combo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return {} as ComboFormType;
};
