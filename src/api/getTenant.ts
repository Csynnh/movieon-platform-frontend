import { useEffect, useState } from "react";
import api from "./axiosConfig";
import { TenantType } from "./type";

const getTenant = (username: string): TenantType | undefined => {
   const [tenant, setTenant] = useState<TenantType>();
   const getTenantData = async (): Promise<void> => {
      try {
         const response = await api.get(`/api/v1/tenants/username/${username}`);
         setTenant(response.data);
      } catch (error) {
         console.log(error);

         return undefined;
      }
   };
   useEffect(() => {
      getTenantData();
   }, []);
   return tenant;
};

export default getTenant;
