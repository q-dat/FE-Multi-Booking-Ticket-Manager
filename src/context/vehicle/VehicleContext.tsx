import {
    createContext,
    useState,
    ReactNode,
    useCallback,
    useEffect
  } from 'react';
  import { IVehicle } from '../../types/type/vehicle/vehicle';
  import {
    createVehicleApi,
    deleteVehicleApi,
    getAllVehiclesApi,
    updateVehicleApi
  } from '../../axios/api/vehicleApi';
  
  interface VehicleContextType {
    vehicles: IVehicle[];
    loading: {
      getAll: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
    };
    error: string | null;
    getAllVehicles: () => void;
    getVehicleById: (_id: string) => IVehicle | undefined;
    createVehicle: (vehicle: IVehicle) => Promise<void>;
    updateVehicle: (_id: string, vehicle: IVehicle) => Promise<void>;
    deleteVehicle: (_id: string) => Promise<void>;
  }
  
  const defaultContextValue: VehicleContextType = {
    vehicles: [],
    loading: {
      getAll: false,
      create: false,
      update: false,
      delete: false
    },
    error: null,
    getAllVehicles: () => {},
    getVehicleById: () => undefined,
    createVehicle: async () => {},
    updateVehicle: async () => {},
    deleteVehicle: async () => {}
  };
  
  export const VehicleContext =
    createContext<VehicleContextType>(defaultContextValue);
  
  export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
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
      apiCall: () => Promise<any>,
      onSuccess: (data: any) => void,
      requestType: keyof typeof loading
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
    const getAllVehicles = useCallback(() => {
      fetchData(
        getAllVehiclesApi,
        data => {
          console.log('API response:', data);
          setVehicles(data.vehicles || []);
        },
        'getAll'
      ).catch(error => {
        console.error('Error fetching vehicles:', error);
      });
    }, []);
  
    // Get By Id
    const getVehicleById = useCallback(
      (id: string) => {
        return vehicles.find(vehicle => vehicle._id === id);
      },
      [vehicles]
    );
  
    // Post
    const createVehicle = useCallback(
      async (vehicle: IVehicle): Promise<void> => {
        await fetchData(
          () => createVehicleApi(vehicle),
          data => {
            if (data.savedVehicle) {
              setVehicles(prevVehicles => [...prevVehicles, data.savedVehicle]);
            }
          },
          'create'
        );
      },
      []
    );
  
    // Put
    const updateVehicle = useCallback(
      async (id: string, vehicle: IVehicle): Promise<void> => {
        await fetchData(
          () => updateVehicleApi(id, vehicle),
          data => {
            if (data.vehicle) {
              setVehicles(prevVehicles =>
                prevVehicles.map(veh => (veh._id === id ? data.vehicle : veh))
              );
            }
          },
          'update'
        );
      },
      []
    );
  
    // Delete
    const deleteVehicle = useCallback(async (id: string): Promise<void> => {
      await fetchData(
        () => deleteVehicleApi(id),
        () =>
          setVehicles(prevVehicles =>
            prevVehicles.filter(vehicle => vehicle._id !== id)
          ),
        'delete'
      );
    }, []);
  
    useEffect(() => {
      getAllVehicles();
    }, [getAllVehicles]);
  
    return (
      <VehicleContext.Provider
        value={{
          vehicles,
          loading,
          error,
          getAllVehicles,
          getVehicleById,
          createVehicle,
          updateVehicle,
          deleteVehicle
        }}
      >
        {children}
      </VehicleContext.Provider>
    );
  };