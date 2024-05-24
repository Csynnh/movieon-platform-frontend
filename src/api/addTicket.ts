import api from './axiosConfig';
import { RESPONSE, TicketRequestType, TicketType } from './type';

export const addTicket = async (ticket: TicketRequestType): Promise<TicketType & RESPONSE> => {
  try {
    const response: TicketType = await api.post('/api/v1/tickets', ticket);
    return response as TicketType & RESPONSE;
  } catch (error: any) {
    return error.response.data;
  }
};
