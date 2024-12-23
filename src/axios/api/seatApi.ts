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
export const createSeatApi = (seat: ISeat) => {
  return axios.post<{ seat: ISeat }>('/api/seats', seat);
};

// Put
export const updateSeatApi = (id: string, seat: ISeat) => {
  return axios.put<{ seat: ISeat }>(`/api/seats/${id}`, seat);
};

// Delete
export const deleteSeatApi = (id: string) => {
  return axios.delete(`/api/seats/${id}`);
};

// Search
export const searchSeatsByVehicleNameApi = (
  filterParams: Record<string, string>
) => {
  const query = new URLSearchParams(filterParams).toString();
  return axios.get<{ tickets: ISeat[] }>(`/api/seat/search?${query}`);
};
//Get List_ID By VehicleName
export const getListIdByVehicleNameApi = (vehicleName: string) => {
  return axios.get<{ seat: ISeat }>('/api/seat/list-id', {
    params: { vehicleName }
  });
};
// Create multiple seats
export const createMultipleSeatsApi = (data: {
  quantity: number;
  seatCatalogId: string;
  price: number;
}) => {
  return axios.post<{ savedSeats: ISeat[] }>('/api/seats/multiple', data);
};

// Delete Seats by SeatCatalogId
export const deleteSeatsByCatalogIdApi = (seatCatalogId: string) => {
  return axios.delete(`/api/seats/catalog/${seatCatalogId}`);
};
