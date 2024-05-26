import api from './axiosConfig';
import { TenantResponse } from './type';

export const useUpdateTenant = async (tenant: any): Promise<TenantResponse> => {
  try {
    const response = await api.put(`/api/v1/tenants/${tenant.user}`, tenant);
    return response.data as TenantResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
};
