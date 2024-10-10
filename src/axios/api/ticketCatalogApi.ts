import axios from '../../config/axiosConfig';
import { ITicketCatalog } from '../../types/type/ticket-catalog/ticket-catalog';

// Get All
export const getAllTicketCatalogsApi = () => {
  return axios.get<{ ticketCatalogs: ITicketCatalog[] }>(
    '/api/ticket-catalogs'
  );
};

// Get By ID
export const getTicketCatalogByIdApi = (id: string) => {
  return axios.get<{ ticketCatalogs: ITicketCatalog }>(
    `/api/ticket-catalogs/${id}`
  );
};

// Post
export const createTicketCatalogApi = (ticketCatalog: ITicketCatalog) => {
  return axios.post<{ ticketCatalogs: ITicketCatalog }>(
    '/api/ticket-catalogs',
    ticketCatalog
  );
};

// Put
export const updateTicketCatalogApi = (
  id: string,
  ticketCatalog: ITicketCatalog
) => {
  return axios.put<{ ticketCatalogs: ITicketCatalog }>(
    `/api/ticket-catalogs/${id}`,
    ticketCatalog
  );
};

// Delete
export const deleteTicketCatalogApi = (id: string) => {
  return axios.delete(`/api/ticket-catalogs/${id}`);
};
