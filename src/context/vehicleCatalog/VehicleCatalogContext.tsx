import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';
import {
  createVehicleCatalogApi,
  deleteVehicleCatalogApi,
  getAllVehicleCatalogsApi,
  updateVehicleCatalogApi
} from '../../axios/api/vehicleCatalogApi';
import { IVehicleCatalog } from '../../types/type/vehicle-catalog/vehicle-catalog';

interface VehicleCatalogContextType {
  vehicleCatalogs: IVehicleCatalog[];
  loading: {
    getAll: boolean;
    getById: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllVehicleCatalogs: () => void;
  getVehicleCatalogById: (_id: string) => IVehicleCatalog | undefined;
  createVehicleCatalog: (vehicleCatalog: IVehicleCatalog) => Promise<void>;
  updateVehicleCatalog: (
    _id: string,
    vehicleCatalog: IVehicleCatalog
  ) => Promise<void>;
  deleteVehicleCatalog: (_id: string) => Promise<void>;
}

const defaultContextValue: VehicleCatalogContextType = {
  vehicleCatalogs: [],
  loading: {
    getAll: false,
    getById: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllVehicleCatalogs: () => {},
  getVehicleCatalogById: () => undefined,
  createVehicleCatalog: async () => {},
  updateVehicleCatalog: async () => {},
  deleteVehicleCatalog: async () => {}
};

export const VehicleCatalogContext =
  createContext<VehicleCatalogContextType>(defaultContextValue);

export const VehicleCatalogProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [vehicleCatalogs, setVehicleCatalogs] = useState<IVehicleCatalog[]>([]);
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
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading // 'getAll', 'getById', 'create', 'update', 'delete'
  ) => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All
  const getAllVehicleCatalogs = useCallback(() => {
    fetchData(
      getAllVehicleCatalogsApi,
      data => setVehicleCatalogs(data.vehicleCatalogs || []),
      'getAll'
    );
  }, []);

  // Get By ID
  const getVehicleCatalogById = useCallback(
    (id: string) => {
      return vehicleCatalogs.find(vehicleCatalog => vehicleCatalog._id === id);
    },
    [vehicleCatalogs]
  );

  // Post
  const createVehicleCatalog = useCallback(
    async (vehicleCatalog: IVehicleCatalog): Promise<void> => {
      await fetchData(
        () => createVehicleCatalogApi(vehicleCatalog),
        data => {
          if (data.savedVehicleCatalog) {
            setVehicleCatalogs(prevCatalogs => [
              ...prevCatalogs,
              data.savedVehicleCatalog
            ]);
          }
        },
        'create'
      );
    },
    []
  );

  // Put
  const updateVehicleCatalog = useCallback(
    async (id: string, vehicleCatalog: IVehicleCatalog): Promise<void> => {
      await fetchData(
        () => updateVehicleCatalogApi(id, vehicleCatalog),
        data => {
          if (data.vehicleCatalog) {
            setVehicleCatalogs(prevCatalogs =>
              prevCatalogs.map(catalog =>
                catalog._id === id ? data.vehicleCatalog : catalog
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
  const deleteVehicleCatalog = useCallback(
    async (id: string): Promise<void> => {
      await fetchData(
        () => deleteVehicleCatalogApi(id),
        () =>
          setVehicleCatalogs(prevCatalogs =>
            prevCatalogs.filter(catalog => catalog._id !== id)
          ),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllVehicleCatalogs();
  }, [getAllVehicleCatalogs]);

  return (
    <VehicleCatalogContext.Provider
      value={{
        vehicleCatalogs,
        loading,
        error,
        getAllVehicleCatalogs,
        getVehicleCatalogById,
        createVehicleCatalog,
        updateVehicleCatalog,
        deleteVehicleCatalog
      }}
    >
      {children}
    </VehicleCatalogContext.Provider>
  );
};
