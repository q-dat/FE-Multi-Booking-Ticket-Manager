import axios from '../../config/axiosConfig';
import { IVehicle } from '../../types/type/vehicle/vehicle';

// Get All
export const getAllVehiclesApi = () => {
  return axios.get<{ vehicles: IVehicle[] }>('/api/vehicles');
};

// Get By ID
export const getVehicleByIdApi = (id: string) => {
  return axios.get<{ vehicle: IVehicle }>(`/api/vehicles/${id}`);
};

// Post
export const createVehicleApi = (Vehicle: IVehicle) => {
  return axios.post<{ vehicle: IVehicle }>('/api/vehicles', Vehicle);
};

// Put
export const updateVehicleApi = (id: string, Vehicle: IVehicle) => {
  return axios.put<{ vehicle: IVehicle }>(`/api/vehicles/${id}`, Vehicle);
};

// Delete
export const deleteVehicleApi = (id: string) => {
  return axios.delete(`/api/vehicles/${id}`);
};
//Search
export const searchVehicleByNameApi = (name: string) => {
  return axios.get<{ vehicle: IVehicle[] }>('api/vehicle/search', {
    params: { name }
  });
};
