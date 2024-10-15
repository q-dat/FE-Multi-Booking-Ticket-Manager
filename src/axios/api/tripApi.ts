import axios from '../../config/axiosConfig';
import { ITrip } from '../../types/type/trip/trip';

// Get All
export const getAllTripApi = () => {
  return axios.get<{ trip: ITrip[] }>('/api/trip');
};

// Get By ID
export const getTripByIdApi = (id: string) => {
  return axios.get<{ trip: ITrip }>(`/api/trip/${id}`);
};

// Post
export const createTripApi = (trip: ITrip) => {
  return axios.post<{ trip: ITrip }>('/api/trip', trip);
};

// Put
export const updateTripApi = (id: string, trip: ITrip) => {
  return axios.put<{ trip: ITrip }>(`/api/trip/${id}`, trip);
};

// Delete
export const deleteTripApi = (id: string) => {
  return axios.delete(`/api/trip/${id}`);
};
