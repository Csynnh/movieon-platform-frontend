import api from "./axiosConfig";
import { ComboFormType } from "./type";

export const addCombo = async (
  combo: ComboFormType
): Promise<ComboFormType> => {
  try {
    const { _id, ...rest } = combo;
    let response = null;
    if (_id) {
      response = await api.put(`/api/v1/combos${_id ? "/" + _id : ""}`, rest);
    } else {
      response = await api.post(`/api/v1/combos`, rest);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return {} as ComboFormType;
};
