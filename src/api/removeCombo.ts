import { AxiosResponse } from "axios";
import api from "./axiosConfig";

export const removeCombo = async (
  comboId: string
): Promise<AxiosResponse<any, any> | unknown> => {
  try {
    const res = await api.delete(`/api/v1/combos/${comboId}`);
    return res;
  } catch (error) {
    return error;
  }
};
