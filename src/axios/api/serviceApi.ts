import axios from '../../config/axiosConfig';
import { IService } from '../../types/type/service/service';

// Get All
export const getAllServicesApi = () => {
  return axios.get<{ services: IService[] }>('/api/services');
};

// Get By ID
export const getServiceByIdApi = (id: string) => {
  return axios.get<{ service: IService }>(`/api/services/${id}`);
};

// Post
export const createServiceApi = (service: IService) => {
  return axios.post<{ service: IService }>('/api/services', service);
};

// Put
export const updateServiceApi = (id: string, service: IService) => {
  return axios.put<{ service: IService }>(`/api/services/${id}`, service);
};

// Delete
export const deleteServiceApi = (id: string) => {
  return axios.delete(`/api/services/${id}`);
};
