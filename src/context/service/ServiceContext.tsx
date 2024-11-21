import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { IService } from '../../types/type/service/service';
import {
  createServiceApi,
  deleteServiceApi,
  getAllServicesApi,
  updateServiceApi
} from '../../axios/api/serviceApi';

interface ServiceContextType {
  services: IService[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllServices: () => void;
  getServiceById: (_id: string) => IService | undefined;
  createService: (service: IService) => Promise<AxiosResponse<any>>;
  updateService: (_id: string, service: IService) => Promise<AxiosResponse<any>>;
  deleteService: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: ServiceContextType = {
  services: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllServices: () => {},
  getServiceById: () => undefined,
  createService: async () => ({ data: {} }) as AxiosResponse<any>,
  updateService: async () => ({ data: {} }) as AxiosResponse<any>,
  deleteService: async () => ({ data: {} }) as AxiosResponse<any>
};

export const ServiceContext = createContext<ServiceContextType>(defaultContextValue);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    getAll: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'create', 'update', 'delete'
  ) => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response; 
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All
  const getAllServices = useCallback(() => {
    fetchData(
      getAllServicesApi,
      data => setServices(data.services || []),
      'getAll'
    );
  }, []);

  // Get By ID
  const getServiceById = useCallback(
    (id: string) => {
      return services.find(service => service._id === id);
    },
    [services]
  );

  // Post
  const createService = useCallback(
    async (service: IService): Promise<AxiosResponse<any>> => {
      return fetchData(
        () => createServiceApi(service),
        data => {
          if (data.savedService) {
            setServices(prevServices => [...prevServices, data.savedService]);
          }
        },
        'create'
      );
    },
    []
  );

  // Put
  const updateService = useCallback(
    async (id: string, service: IService): Promise<AxiosResponse<any>> => {
      return fetchData(
        () => updateServiceApi(id, service),
        data => {
          if (data.service) {
            setServices(prevServices =>
              prevServices.map(svc => (svc._id === id ? data.service : svc))
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete
  const deleteService = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return fetchData(
        () => deleteServiceApi(id),
        () =>
          setServices(prevServices =>
            prevServices.filter(service => service._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        error,
        getAllServices,
        getServiceById,
        createService,
        updateService,
        deleteService
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
