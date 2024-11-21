import { ISeatCatalog } from '../../types/type/seat-catalog/seat-catalog';
import { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import {
  createSeatCatalogApi,
  deleteSeatCatalogApi,
  getAllSeatCatalogsApi,
  updateSeatCatalogApi
} from '../../axios/api/seatCatalogApi';

interface SeatCatalogContextType {
  seatCatalogs: ISeatCatalog[];
  loading: {
    getAll: boolean;
    getById: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllSeatCatalogs: () => void;
  getSeatCatalogById: (_id: string) => ISeatCatalog | undefined;
  createSeatCatalog: (seatCatalog: ISeatCatalog) => Promise<AxiosResponse<any>>;
  updateSeatCatalog: (_id: string, seatCatalog: ISeatCatalog) => Promise<AxiosResponse<any>>;
  deleteSeatCatalog: (_id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: SeatCatalogContextType = {
  seatCatalogs: [],
  loading: {
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllSeatCatalogs: () => {},
  getSeatCatalogById: () => undefined,
  createSeatCatalog: async () => ({ data: {} }) as AxiosResponse<any>,
  updateSeatCatalog: async () => ({ data: {} }) as AxiosResponse<any>,
  deleteSeatCatalog: async () => ({ data: {} }) as AxiosResponse<any>
};

export const SeatCatalogContext = createContext<SeatCatalogContextType>(defaultContextValue);

export const SeatCatalogProvider = ({ children }: { children: ReactNode }) => {
  const [seatCatalogs, setSeatCatalogs] = useState<ISeatCatalog[]>([]);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    getById: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    getAll: false,
    getById: false,
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
    requestType: keyof typeof loading // 'getAll', 'getById', 'create', 'update', 'delete'
  ) => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response; // Trả về AxiosResponse
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All
  const getAllSeatCatalogs = useCallback(() => {
    fetchData(
      getAllSeatCatalogsApi,
      data => setSeatCatalogs(data.seatCatalogs || []),
      'getAll'
    );
  }, []);

  // Get By ID
  const getSeatCatalogById = useCallback(
    (id: string) => {
      return seatCatalogs.find(seatCatalog => seatCatalog._id === id);
    },
    [seatCatalogs]
  );

  // Post
  const createSeatCatalog = useCallback(
    async (seatCatalog: ISeatCatalog): Promise<AxiosResponse<any>> => {
      return fetchData(
        () => createSeatCatalogApi(seatCatalog),
        data => {
          if (data.savedSeatCatalog) {
            setSeatCatalogs(prevCatalogs => [
              ...prevCatalogs,
              data.savedSeatCatalog
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Put
  const updateSeatCatalog = useCallback(
    async (id: string, seatCatalog: ISeatCatalog): Promise<AxiosResponse<any>> => {
      return fetchData(
        () => updateSeatCatalogApi(id, seatCatalog),
        data => {
          if (data.seatCatalog) {
            setSeatCatalogs(prevCatalogs =>
              prevCatalogs.map(catalog =>
                catalog._id === id ? data.seatCatalog : catalog
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete
  const deleteSeatCatalog = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return fetchData(
        () => deleteSeatCatalogApi(id),
        () =>
          setSeatCatalogs(prevCatalogs =>
            prevCatalogs.filter(catalog => catalog._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllSeatCatalogs();
  }, [getAllSeatCatalogs]);

  return (
    <SeatCatalogContext.Provider
      value={{
        seatCatalogs,
        loading,
        error,
        getAllSeatCatalogs,
        getSeatCatalogById,
        createSeatCatalog,
        updateSeatCatalog,
        deleteSeatCatalog
      }}
    >
      {children}
    </SeatCatalogContext.Provider>
  );
};
