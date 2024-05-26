import { useEffect, useState } from 'react';
import api from './axiosConfig';
import { TenantType } from './type';
import { useQuery } from 'react-query';
const getTenantData = async (username?: string): Promise<TenantType | undefined> => {
  if (username === undefined) return undefined;
  const response = await api.get(`/api/v1/tenants/username/${username}`);
  return response.data;
};

const useTenantDetail = (username?: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ['tenant', username],
    () => getTenantData(username),
    {
      enabled: !!username,
    },
  );

  return { data, isLoading, isFetching, refetch };
};

export default useTenantDetail;
