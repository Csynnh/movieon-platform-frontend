import { useEffect, useState } from "react";
import api from "./axiosConfig";
import { Cinema } from "./type";
const useCinemasData = (props?: { id?: string }) => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  const listCenimas = async (): Promise<void> => {
    try {
      if (props?.id) {
        const response = await api.get(`/api/v1/cinemas/${props.id}`);
        setCinemas(response.data);
      } else {
        const response = await api.get(`/api/v1/cinemas`);
        setCinemas(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listCenimas();
  }, []);
  return cinemas;
};

export default useCinemasData;
