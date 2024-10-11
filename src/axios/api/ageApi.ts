import axios from '../../config/axiosConfig';
import { IAge } from '../../types/type/age/age';


// Get All
export const getAllAgesApi = () => {
  return axios.get<{ ages: IAge[] }>('/api/ages');
};

// Get By ID
export const getAgeByIdApi = (id: string) => {
  return axios.get<{ age: IAge }>(`/api/ages/${id}`);
};

// Post
export const createAgeApi = (age: IAge) => {
  return axios.post<{ age: IAge }>('/api/ages', age);
};

// Put
export const updateAgeApi = (id: string, age: IAge) => {
  return axios.put<{ age: IAge }>(`/api/ages/${id}`, age);
};

// Delete
export const deleteAgeApi = (id: string) => {
  return axios.delete(`/api/ages/${id}`);
};
