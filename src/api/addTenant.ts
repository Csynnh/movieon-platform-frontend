import api from "./axiosConfig";
import { TenantType } from "./type";

export const addTenant = async (tenant: TenantType): Promise<void> => {
   try {
      const response = await api.post("/api/v1/tenants", tenant);
      console.log("response.data :>> ", response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
