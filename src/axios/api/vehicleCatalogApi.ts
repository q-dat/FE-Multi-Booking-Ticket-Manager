import axios from '../../config/axiosConfig';
import { IVehicleCatalog } from '../../types/type/vehicle-catalog/vehicle-catalog';

// Get All
export const getAllVehicleCatalogsApi = () => {
  return axios.get<{ vehicleCatalogs: IVehicleCatalog[] }>(
    '/api/vehicle-catalogs'
  );
};

// Get By ID
export const getVehicleCatalogByIdApi = (id: string) => {
  return axios.get<{ vehicleCatalogs: IVehicleCatalog }>(
    `/api/vehicle-catalogs/${id}`
  );
};

// Post
export const createVehicleCatalogApi = (vehicleCatalog: IVehicleCatalog) => {
  return axios.post<{ vehicleCatalogs: IVehicleCatalog }>(
    '/api/vehicle-catalogs',
    vehicleCatalog
  );
};

// Put
export const updateVehicleCatalogApi = (
  id: string,
  VehicleCatalog: IVehicleCatalog
) => {
  return axios.put<{ vehicleCatalogs: IVehicleCatalog }>(
    `/api/vehicle-catalogs/${id}`,
    VehicleCatalog
  );
};

// Delete
export const deleteVehicleCatalogApi = (id: string) => {
  return axios.delete(`/api/vehicle-catalogs/${id}`);
};
