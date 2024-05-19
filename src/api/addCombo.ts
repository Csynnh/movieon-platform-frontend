import api from "./axiosConfig";
import { comboType } from "./type";

export const addCombo = async (combo: comboType): Promise<void> => {
  try {
    const response = await api.post(`/api/v1/combos`, combo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
