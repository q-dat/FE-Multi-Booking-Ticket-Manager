import axios from '../../config/axiosConfig';
import { ISeatCatalog } from '../../types/type/seat-catalog/seat-catalog';

// Get All
export const getAllSeatCatalogsApi = () => {
  return axios.get<{ seatCatalogs: ISeatCatalog[] }>('/api/seat-catalogs');
};

// Get By ID
export const getSeatCatalogByIdApi = (id: string) => {
  return axios.get<{ seatCatalogs: ISeatCatalog }>(`/api/seat-catalogs/${id}`);
};

// Post
export const createSeatCatalogApi = (seatCatalog: ISeatCatalog) => {
  return axios.post<{ seatCatalogs: ISeatCatalog }>(
    '/api/seat-catalogs',
    seatCatalog
  );
};

// Put
export const updateSeatCatalogApi = (id: string, seatCatalog: ISeatCatalog) => {
  return axios.put<{ seatCatalogs: ISeatCatalog }>(
    `/api/seat-catalogs/${id}`,
    seatCatalog
  );
};

// Delete
export const deleteSeatCatalogApi = (id: string) => {
  return axios.delete(`/api/seat-catalogs/${id}`);
};

