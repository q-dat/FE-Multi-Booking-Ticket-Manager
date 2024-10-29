import axios from '../../config/axiosConfig';
import { ITicket } from '../../types/type/ticket/ticket';

// Search
export const searchTicketsApi = (searchParams: Record<string, string>) => {
  const query = new URLSearchParams(searchParams).toString();
  return axios.get<{ tickets: ITicket[] }>(`/api/ticket/search?${query}`);
};
//Filter
export const filterTicketsApi = (filterParams: Record<string, string>) => {
  const query = new URLSearchParams(filterParams).toString();
  return axios.get<{ tickets: ITicket[] }>(`/api/ticket/filter?${query}`);
};
// Get All
export const getAllTicketsApi = () => {
  return axios.get<{ tickets: ITicket[] }>('/api/tickets');
};

// Get By ID
export const getTicketByIdApi = (id: string) => {
  return axios.get<{ ticket: ITicket }>(`/api/tickets/${id}`);
};

// Post
export const createTicketApi = (ticket: ITicket) => {
  return axios.post<{ ticket: ITicket }>('/api/tickets', ticket);
};

// Put
export const updateTicketApi = (id: string, ticket: ITicket) => {
  return axios.put<{ ticket: ITicket }>(`/api/tickets/${id}`, ticket);
};

// Delete
export const deleteTicketApi = (id: string) => {
  return axios.delete(`/api/tickets/${id}`);
};
// Get Multiple Tickets by Vehicle ID
export const getTicketsByVehicleIdApi = (vehicleId: string) => {
  return axios.get<{ tickets: ITicket[] }>(`/api/tickets/vehicle/${vehicleId}`);
};
// Delete Multiple Tickets by Vehicle ID
export const deleteTicketsByVehicleIdApi = (vehicleId: string) => {
  return axios.delete(`/api/tickets/vehicle/${vehicleId}`);
};
