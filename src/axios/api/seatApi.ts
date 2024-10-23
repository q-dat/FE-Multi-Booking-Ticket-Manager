import axios from '../../config/axiosConfig';
import { ISeat } from '../../types/type/seat/seat';

// Get All
export const getSeatsApi = () => {
  return axios.get<{ seats: ISeat[] }>('/api/seats');
};

// Get By ID
export const getSeatByIdApi = (id: string) => {
  return axios.get<{ seat: ISeat }>(`/api/seats/${id}`);
};

// Post
export const createSeatApi = (location: ISeat) => {
  return axios.post<{ seat: ISeat }>('/api/seats', location);
};

// Put
export const updateSeatApi = (id: string, location: ISeat) => {
  return axios.put<{ location: ISeat }>(`/api/seats/${id}`, location);
};

// Delete
export const deleteSeatApi = (id: string) => {
  return axios.delete(`/api/seats/${id}`);
};

// Search
export const searchSeatsByVehicleNameApi = (filterParams: Record<string, string>) => {
  const query = new URLSearchParams(filterParams).toString();
  return axios.get<{ tickets: ISeat[] }>(`/api/seat/search?${query}`);
};