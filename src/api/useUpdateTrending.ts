import { message } from 'antd';
import api from './axiosConfig';

const useUpdateTrending = async (itemId?: string, isTopTrending?: Boolean) => {
  if (!itemId || isTopTrending === undefined) {
    return null;
  }
  try {
    const response = await api.put(
      `/api/v1/calendars/${itemId}/trending?isTopTrending=${isTopTrending}`,
    );
    message.success('Trending updated successfully');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default useUpdateTrending;
