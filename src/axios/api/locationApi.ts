import axios from '../../config/axiosConfig';
import { ILocation } from '../../types/type/location/location';

// Get All
export const getAllLocationsApi = () => {
  return axios.get<{ locations: ILocation[] }>('/api/locations');
};

// Get By ID
export const getLocationByIdApi = (id: string) => {
  return axios.get<{ location: ILocation }>(`/api/locations/${id}`);
};

// Post
export const createLocationApi = (location: ILocation) => {
  return axios.post<{ location: ILocation }>('/api/locations', location);
};

// Put
export const updateLocationApi = (id: string, location: ILocation) => {
  return axios.put<{ location: ILocation }>(`/api/locations/${id}`, location);
};

// Delete
export const deleteLocationApi = (id: string) => {
  return axios.delete(`/api/Locations/${id}`);
};
