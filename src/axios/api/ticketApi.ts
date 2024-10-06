import axios from '../../config/axiosConfig';
import { ITicket } from '../../types/type/ticket/ticket';

// Search tickets
export const searchTicketsApi = (searchParams: Record<string, string>) => {
  const query = new URLSearchParams(searchParams).toString();
  return axios.get<{ tickets: ITicket[] }>(`/api/ticket/search?${query}`);
};

// Get all tickets
export const getAllTicketsApi = () => {
  return axios.get<{ tickets: ITicket[] }>('/api/tickets');
};

// Get ticket by ID
export const getTicketByIdApi = (id: string) => {
  return axios.get<{ ticket: ITicket }>(`/api/tickets/${id}`);
};

// Create ticket
export const createTicketApi = (ticket: ITicket) => {
  return axios.post<{ ticket: ITicket }>('/api/tickets', ticket);
};

// Update ticket
export const updateTicketApi = (id: string, ticket: ITicket) => {
  return axios.put<{ ticket: ITicket }>(`/api/ticket/${id}`, ticket);
};

// Delete ticket
export const deleteTicketApi = (id: string) => {
  return axios.delete(`/api/tickets/${id}`);
};
