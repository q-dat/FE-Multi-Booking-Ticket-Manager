import axios from '../../config/axiosConfig';
import { ITrip } from '../../types/type/trip/trip';

// Get All
export const getAllTripsApi = () => {
  return axios.get<{ trips: ITrip[] }>('/api/trips');
};

// Get By ID
export const getTripByIdApi = (id: string) => {
  return axios.get<{ trip: ITrip }>(`/api/trips/${id}`);
};

// Post
export const createTripApi = (trip: ITrip) => {
  return axios.post<{ trip: ITrip }>('/api/trips', trip);
};

// Put
export const updateTripApi = (id: string, trip: ITrip) => {
  return axios.put<{ trip: ITrip }>(`/api/trips/${id}`, trip);
};

// Delete
export const deleteTripApi = (id: string) => {
  return axios.delete(`/api/trips/${id}`);
};
