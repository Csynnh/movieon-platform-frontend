import { useEffect, useState } from "react";
import api from "./axiosConfig";
import { ComboFormType } from "./type";

const useComboDetail = (id: string): ComboFormType | undefined => {
  const [combo, setCombo] = useState<ComboFormType>();
  const getCombo = async (): Promise<void> => {
    try {
      const response = await api.get(`/api/v1/combos/${id}`);
      setCombo(response.data);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
  useEffect(() => {
    getCombo();
  }, []);
  return combo;
};

export default useComboDetail;
