import axios from 'axios';
import { ITicket } from '../../types/type/ticket/ticket';

// Search tickets
export const searchTicketsApi = (searchParams: Record<string, string>) => {
  const query = new URLSearchParams(searchParams).toString();
  return axios.get<{ tickets: ITicket[] }>(`http://localhost:6001/api/ticket/search?${query}`);
};

// Get all tickets
export const getAllTicketsApi = () => {
  return axios.get<{ tickets: ITicket[] }>('http://localhost:6001/api/tickets');
};

// Get ticket by ID
export const getTicketByIdApi = (id: string) => {
  return axios.get<{ ticket: ITicket }>(`http://localhost:6001/api/tickets/${id}`);
};

// Create ticket
export const createTicketApi = (ticket: ITicket) => {
  return axios.post<{ ticket: ITicket }>('http://localhost:6001/api/tickets', ticket);
};

// Update ticket
export const updateTicketApi = (id: string, ticket: ITicket) => {
  return axios.put<{ ticket: ITicket }>(`http://localhost:6001/api/ticket/${id}`, ticket);
};

// Delete ticket
export const deleteTicketApi = (id: string) => {
  return axios.delete(`http://localhost:6001/api/tickets/${id}`);
};
