import axiosClient from '../../config/axiosConfig';
import { IVehicle } from '../../types/type/vehicle/vehicle';

export const getAllVehiclesApi = () => axiosClient.get('api/vehicles');

export const createVehicleApi = (vehicle: IVehicle) =>
  axiosClient.post('/vehicles', vehicle);

export const updateVehicleApi = (id: string, vehicle: IVehicle) =>
  axiosClient.put(`/vehicles/${id}`, vehicle);

export const deleteVehicleApi = (id: string) =>
  axiosClient.delete(`/vehicles/${id}`);
